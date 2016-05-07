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

import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.FoodItem;

public class GameManager {

  private final static int UUID_LEN = 8;
  private static final double INITIAL_MONEY = 1000;
  private static final double SANDWICH_TRASH_CONST = 0.3;
  private static final double BAKERY_TRASH_CONST = 6;
  private static final double COFFEE_TRASH_CONST = 1;
  private static final double EMPLOYEE_WAGE = 50;
  private static final double STATION_UTIL_COST = 10;

  private MoneyManager manager;
  private List<Employee> employees;
  private Map<String, Customer> customerMap;
  private Map<String, Employee> employeeMap;

  private int baselineInterval;
  private int currTime;
  private int leftToday;

  private List<String> availableStations;

  // initialize vars
  public GameManager() {
    manager = new MoneyManager(INITIAL_MONEY);
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    customerMap = new HashMap<>();
    employeeMap = new HashMap<>();
    availableStations.add("sandwich");
    currTime = 0;
    leftToday = 0;
    baselineInterval = 10000;
    OrderFactory.setMuffinWeights();
  }

  // for when user makes sandwich
  public double purchase(FoodItem purchase, Customer cust) {
    double price = purchase.getPrice();
    price += (purchase.compareToOrder(cust.getOrder()) * cust.getHappiness() * purchase.getMaxTip());
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
    switch(station) {
    case "coffee":
      loss = COFFEE_TRASH_CONST;
      break;
    case "bakery":
      loss = BAKERY_TRASH_CONST;
      break;
    default:
      loss = numIngredients * SANDWICH_TRASH_CONST;
      break;
    }
    manager.handleLoss(loss);
    return loss;
  }

  public Customer newCustomer() {
    UUID uid = UUID.randomUUID();
    String beforeid = uid.toString();
    //making the format of the id the same as the other ids in the db
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
    assert stationName.equals("bakery") || stationName.equals("coffee") : "ERROR: station input should not exist";
    availableStations.add(stationName);
    manager.changeMoney(cost * -1);
    manager.addDailyExpenses(STATION_UTIL_COST);
  }

  /**
   * Gets the customer cached in the map
   * @param id
   * @return
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
    System.out.println(energy);
    double interval = emp.calcInterval();
    System.out.println(interval);

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
    currTime = 0;
    leftToday = 0;
    baselineInterval -= 1000;
    return today;
  }

  public void leave(String station) {
    leftToday++;
    manager.handleAbandon(station);
  }

  public int getDayNum() {
    return manager.getDayNum();
  }

  public void incrCurrTime() {
    currTime++;
  }

  public double calculateCustomerInterval() {
    double interval = baselineInterval + (leftToday * 100);
    interval -= (2 * (employees.size()));
    return interval;
  }

  public void saveGame(String filename) {
    try(BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
      
      // save stations
      for (String station : availableStations) {
        writer.write(station, 0, station.length());
        writer.write(" ", 0, 1);
      }
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
      e.printStackTrace();
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

      employees.clear();
      employeeMap.clear();
      line = reader.readLine();
      String[] employeeNames = line.split(" ");
      for (String eName : employeeNames) {
        hireEmployee(eName, 0);
      }

      int dayNum = manager.load(reader);
      baselineInterval = 11000 - (dayNum * 1000);
    } catch (IOException | NumberFormatException e) {
      e.printStackTrace();
    }
  }

  public void sellStation(String station, double price) {
    availableStations.remove(station);
    manager.changeMoney(price);
    // subtract daily price
    manager.addDailyExpenses(STATION_UTIL_COST * -1);
    
  }
  
  public void fire(String employeeName) {
    employees.remove(employeeMap.get(employeeName));
    employeeMap.remove(employeeName);
    // subtract wages
    manager.addDailyExpenses(EMPLOYEE_WAGE * -1);
  }

}
