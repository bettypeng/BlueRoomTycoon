package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.google.common.collect.ImmutableMap;

import edu.brown.cs.bse.elements.ChipsALaCarte;
import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.DrinkALaCarte;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.FoodItem;

public class GameManager {

  private final static int UUID_LEN = 8;
  private static final double INITIAL_MONEY = 50;
  private static final double SANDWICH_TRASH_CONST = 0.3;
  private static final double BAKERY_TRASH_CONST = 0.5;
  private static final double COFFEE_TRASH_CONST = 1;
  private static final double EMPLOYEE_WAGE = 20;
  
  public static final Map<String, Double> UPGRADE_COSTS = new ImmutableMap.Builder<String, Double>()
      .put("bakery", 400.0).put("coffee", 200.0).put("drink_alc", 75.0)
      .put("chips_alc", 50.0).put("magazineRack", 100.0).build();
  private static final Map<String, Double> STATION_UPKEEPS = new ImmutableMap.Builder<String, Double>()
      .put("bakery", 15.0).put("coffee", 10.0).put("sandwich", 0.0)
      .put("drink_alc", 5.0).put("chips_alc", 5.0).put("magazineRack", 2.0).build();

  private MoneyManager manager;
  private List<Employee> employees;
  private Map<String, Customer> customerMap;
  private Map<String, Employee> employeeMap;
  private boolean[] savedGames;

  private int baselineInterval;
  // private int currTime;
  private int leftToday;

  private List<String> availableStations;
  private boolean magazineRack;

  // initialize vars
  public GameManager() {
    manager = new MoneyManager(INITIAL_MONEY);
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    customerMap = new HashMap<>();
    employeeMap = new HashMap<>();
    availableStations.add("sandwich");
    // currTime = 0;
    leftToday = 0;
    baselineInterval = 1000;
    savedGames = new boolean[3];
    magazineRack = false;
    loadConfig(".gameConfig");
    OrderFactory.setMuffinWeights();
  }

  // for when user makes sandwich
  public double purchase(FoodItem purchase, Customer cust) {
    double price = purchase.getPrice();
    price += (purchase.compareToOrder(cust.getOrder()) * cust.getHappiness()
        * purchase.getMaxTip());
    manager.handlePurchase(price, cust.getStation());
    return price;
  }

  // for when employee makes sandwich
  public double purchase(double quality, Customer cust) {
    double price = cust.getOrder().getPrice();
    price += (quality * cust.getHappiness() * cust.getOrder().getMaxTip());
    manager.handlePurchase(price, cust.getStation());
    return price;
  }

  // THEFT!
  public double steal(FoodItem stolen, Customer cust) {
    double price = stolen.getPrice();
    manager.handleLoss(price);
    manager.handleTheft();
    leftToday++;
    return price;
  }

  // when user throws out ingredients or burns muffins
  public double trash(int numIngredients, String station) {
    double loss;
    switch (station) {
    case "coffee":
      loss = COFFEE_TRASH_CONST;
      break;
    case "bakery":
      loss = BAKERY_TRASH_CONST * numIngredients;
      break;
    default:
      loss = numIngredients * SANDWICH_TRASH_CONST;
      break;
    }
    manager.handleLoss(loss);
    manager.handleTrash(numIngredients);
    return loss;
  }

  public Customer newCustomer() {
    UUID uid = UUID.randomUUID();
    String beforeid = uid.toString();
    // making the format of the id the same as the other ids in the db
    String id = "/c/" + beforeid.substring(0, UUID_LEN);

    // generate a station & an order for this customer
    int rand = (int) (Math.random() * availableStations.size());
    String station = availableStations.get(rand);
    FoodItem order;
    switch (station) {
    case "bakery":
      order = OrderFactory.getMuffinOrder();
      break;
    case "coffee":
      order = OrderFactory.getDrinkOrder();
      break;
    case "drink_alc":
      order = new DrinkALaCarte();
      break;
    case "chips_alc":
      order = new ChipsALaCarte();
      break;
    default:
      order = OrderFactory.getSandwichOrder();
      break;
    }

    // create customer and associate it with ID in map
    Customer newCustomer = new Customer(id, order, station);
    customerMap.put(id, newCustomer);
    return newCustomer;
  }

  // this needs to take into account the money spent on employee!!
  public Employee hireEmployee(String name, double cost) {
    Employee emp = new Employee(name);
    employees.add(emp);
    employeeMap.put(name, emp);
    manager.changeMoney(cost * -1);
    manager.addDailyExpenses(EMPLOYEE_WAGE);
    return emp;
  }

  // gets the data about today's profits and whatever else
  public DayData getDayData() {
    return manager.getTodayInfo();
  }

  // gets the list of available stations
  public List<String> getAvailableStations() {
    return availableStations;
  }

  // gets a list of names of all employees (not employee objects themselves)
  public List<String> getEmployeeNames() {
    List<String> result = new ArrayList<>();
    for (Employee e : employees) {
      result.add(e.getName());
    }
    return result;
  }

  // gets financial data stored over the course of the game
  public GameData getGameData() {
    return manager.getTotalInfo();
  }

  // adds a station to the blue room
  public void addStation(String stationName, double cost) {
    availableStations.add(stationName);
    manager.changeMoney(cost * -1);
    manager.addDailyExpenses(STATION_UPKEEPS.get(stationName));
  }

  public void addMagazineRack(double cost) {
    magazineRack = true;
    manager.addDailyExpenses(STATION_UPKEEPS.get("magazineRack"));
    manager.changeMoney(cost * -1);
  }

  public boolean hasMagazineRack() {
    return magazineRack;
  }

  /**
   * Gets the customer cached in the map
   * 
   * @param id
   *          The id of the cutomer to get
   */
  public Customer getCustomer(String id) {
    return customerMap.get(id);
  }

  public Employee getEmployee(String name) {
    return employeeMap.get(name);
  }

  public double calculateEmployeeInterval(String name, double energy) {
    Employee emp = getEmployee(name);
    emp.setEnergy(energy);
    double interval = emp.calcInterval();
    return interval;
  }

  public double getCurrentMoney() {
    return manager.getMoney();
  }

  // returns the DayData for the day that's ending
  public DayData endDay() {
    DayData today = manager.getTodayInfo();
    manager.endDay();
    customerMap.clear();
    OrderFactory.setMuffinWeights();
    // currTime = 0;
    leftToday = 0;
    baselineInterval -= 100;
    return today;
  }

  public void startDay() {
    manager.startDay();
  }

  public void leave(String station) {
    leftToday++;
    manager.handleAbandon(station);
  }

  public int getDayNum() {
    return manager.getDayNum();
  }

  // public void incrCurrTime() {
  // currTime++;
  // }

  public double calculateCustomerInterval() {
    double interval = baselineInterval + (leftToday * 10);
    interval -= (100 * (employees.size()));
    if (availableStations.size() == 2) {
      interval /= 1.5;
    } else if (availableStations.size() == 3) {
      interval /= 2;
    }
    if (interval < 50) {
      return 50;
    }
    return interval;
  }

  public void saveGame(String filename, int gameNum) {
    savedGames[gameNum] = true;
    rewriteConfigFile();
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {

      // save stations
      for (String station : availableStations) {
        writer.write(station, 0, station.length());
        writer.write(" ", 0, 1);
      }
      writer.newLine();
      String rackBool = String.valueOf(magazineRack);
      writer.write(rackBool, 0, rackBool.length());
      writer.newLine();

      // save employees
      for (Employee e : employees) {
        String name = e.getName();
        writer.write(name, 0, name.length());
        writer.write(" ", 0, 1);
      }
      writer.newLine();

      // save $$ info
      manager.save(writer);
      writer.flush();
    } catch (IOException e) {
      System.out.println("ERROR: problem saving game in file " + filename
          + ", GameManager.java line 291");
      System.exit(1);
    }
  }

  public void load(String file) {
    try (BufferedReader reader = new BufferedReader(new FileReader(file))) {

      String line = reader.readLine();
      String[] stationNames = line.split(" ");
      availableStations.clear();
      for (String station : stationNames) {
        addStation(station, 0);
      }
      
      boolean rack = Boolean.parseBoolean(reader.readLine());
      if (rack) {
        addMagazineRack(0);
      } else {
        magazineRack = false;
      }

      employees.clear();
      employeeMap.clear();
      line = reader.readLine();
      String[] employeeNames = line.split(" ");
      for (String eName : employeeNames) {
        if (eName.equals("")) {
          break;
        }
        hireEmployee(eName, 0);
      }

      int dayNum = manager.load(reader);
      baselineInterval = 1100 - (dayNum * 100);
      System.out.println(baselineInterval);
    } catch (IOException e) {
      System.out.println("ERROR: Problem writing to file " + file
          + ", GameManager.java line 324");
      System.exit(1);
    } catch (NumberFormatException e1) {
      System.out.println("ERROR: Improperly formatted save file " + file
          + ", GameManager.java line 328");
      System.exit(1);
    }
    startDay();
  }

  public void sellStation(String station, double price) {
    availableStations.remove(station);
    if (station.equals("magazineRack")) {
      magazineRack = false;
    }
    manager.changeMoney(price);
    // subtract daily price
    manager.addDailyExpenses(STATION_UPKEEPS.get(station) * -1);

  }

  public void fire(String employeeName) {
    employees.remove(employeeMap.get(employeeName));
    employeeMap.remove(employeeName);
    // subtract wages
    manager.addDailyExpenses(EMPLOYEE_WAGE * -1);
  }

  public void loadConfig(String filename) {
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
      int index = 0;
      String line;
      while ((line = reader.readLine()) != null) {
        if (!line.equals("empty")) {
          savedGames[index] = true;
        } else {
          savedGames[index] = false;
        }
        index++;
      }
    } catch (IOException e) {
      System.out.println("ERROR: Problem loading file" + filename
          + ", GameManager.java line 363");
      System.exit(1);
    }
  }

  public boolean[] getSavedGames() {
    return savedGames;
  }

  public void eraseGame(int number) {
    savedGames[number] = false;
    rewriteConfigFile();
    String filename = "game" + String.valueOf(number) + ".brt";
    clearFile(filename);
  }

  private void rewriteConfigFile() {
    try (BufferedWriter writer = new BufferedWriter(
        new FileWriter(".gameConfig"))) {
      for (int i = 0; i < savedGames.length; i++) {
        if (savedGames[i]) {
          writer.write("full", 0, 4);
          writer.newLine();
        } else {
          writer.write("empty", 0, 5);
          writer.newLine();
        }
      }
      writer.flush();
    } catch (IOException e) {
      System.out.println(
          "ERROR: Could not write to file .gameConfig, GameManager.java line 394");
      System.exit(1);
    }
  }

  private void clearFile(String filename) {
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
      writer.flush();
    } catch (IOException e) {
      System.out.println("ERROR: could not write to file " + filename
          + ", GameManager.java line 404");
      System.exit(1);
    }
  }

  public void clear() {
    manager = new MoneyManager(INITIAL_MONEY);
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    availableStations.add("sandwich");
    customerMap = new HashMap<>();
    employeeMap = new HashMap<>();
    // currTime = 0;
    leftToday = 0;
    baselineInterval = 1000;
    savedGames = new boolean[3];
    magazineRack = false;
    loadConfig(".gameConfig");
    OrderFactory.setMuffinWeights();
  }

}
