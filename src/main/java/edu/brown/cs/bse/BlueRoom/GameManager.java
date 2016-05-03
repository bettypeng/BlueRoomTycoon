package edu.brown.cs.bse.BlueRoom;

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
  private static final double TRASH_CONST = 0.3;
  
  private MoneyManager manager;
  private List<Customer> customers;
  private List<Employee> employees;
  private Map<String, Customer> customerMap;
  private Map<String, Employee> employeeMap;

  private int baselineInterval;
  private int currTime;

  private List<String> availableStations;

  public GameManager() {
    manager = new MoneyManager(INITIAL_MONEY);
    customers = new ArrayList<>();
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    customerMap = new HashMap<>();
    availableStations.add("sandwich");
    currTime = 0;
    baselineInterval = 10;
  }

  // for when user makes sandwich
  public double purchase(FoodItem purchase, Customer cust) {
    double price = purchase.getPrice();
    price += (purchase.compareToOrder(cust.getOrder()) * cust.getHappiness() * 6);
    manager.handlePurchase(price, cust.getStation());
    return price;
  }
  
  // for when employee makes sandwich
  public double purchase(double quality, Customer cust) {
    double price = cust.getOrder().getPrice();
    price += (quality * cust.getHappiness() * 6);
    manager.handlePurchase(price, cust.getStation());
    return price;
  }
  
  public double steal(FoodItem stolen, Customer cust) {
    double price = stolen.getPrice();
    manager.handleLoss(price);
    return price;
  }
  
  public double trash(int numIngredients) {
    double loss = numIngredients * TRASH_CONST;
    manager.handleLoss(loss);
    return loss;
  }

  public Customer newCustomer() {
    UUID uid = UUID.randomUUID();
    String beforeid = uid.toString();
    //making the format of the id the same as the other ids in the db
    String id = "/c/" + beforeid.substring(0, UUID_LEN);
    //associate id with customer

    int rand = (int) (Math.random() * availableStations.size());
    String station = availableStations.get(rand);
    Customer newCustomer;
    switch (station) {
    default:
      newCustomer = new Customer(id, OrderFactory.getSandwichOrder(), station);
      break;
    }
    customers.add(newCustomer);
    customerMap.put(id, newCustomer);
    return newCustomer;
  }
  
  public Employee hireEmployee(String name) {
   Employee emp = new Employee(name);
   employees.add(emp);
   employeeMap.put(name, emp);
   return emp;
  }

  public Customer getFrontCustomer() {
    if (customers.isEmpty()) {
      return null;
    }
    return customers.remove(0);
  }

  // gets the data about today's profits and whatever else
  public DayData getDailyProfits() {
    return manager.getTodayInfo();
  }

  // gets data about total profits over time. could make this a list of DayData?
  public List<DayData> getTotalStats() {
    return manager.getTotalData();
  }

  public GameData getGameData() {
    return manager.getTotalInfo();
  }

  public void addStation(String stationName) {
    availableStations.add(stationName);
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

  public double getCurrentMoney() {
    return manager.getMoney();
  }

  public void startDay() {
    manager.startDay();
    currTime = 0;
    baselineInterval--;
  }

  // returns the DayData for the day that's ending
  public DayData endDay() {
    DayData today = manager.getTodayInfo();
    manager.endDay();
    customerMap.clear();
    return today;
  }

  public int getDayNum() {
    return manager.getTotalData().size() + 1;
  }

  public void incrCurrTime() {
    currTime++;
  }

  public double calculateCustomerInterval() {
    // between 150 and 180 seconds is currently "4 pm rush"
    if (currTime >= 150 && currTime <= 180) {
      return baselineInterval / (double)2;
    }
    return baselineInterval;
  }

}
