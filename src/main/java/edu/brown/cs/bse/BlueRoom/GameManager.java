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
  private MoneyManager manager;
  private List<Customer> customers;
  private List<Employee> employees;
  private Map<String, Customer> customerMap;

  private List<String> availableStations;

  public GameManager() {
    manager = new MoneyManager(INITIAL_MONEY);
    customers = new ArrayList<>();
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    customerMap = new HashMap<>();
    availableStations.add("sandwich");
  }

  public double purchase(FoodItem purchase, Customer cust) {
    System.out.println("purchase method called");
    double price = purchase.getPrice();
    price += (purchase.compareToOrder(cust.getOrder()) * cust.getHappiness() * 6);
    manager.handlePurchase(price, cust.getStation());
    return price;
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
  public List<Double> getTotalProfits() {
    return manager.getProfits();
  }

  public void addEmployee(Employee emp) {
    employees.add(emp);
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
  
  public double getCurrentMoney() {
    return manager.getMoney();
  }
  
  public void startDay() {
    manager.startDay();
  }
  
  // returns the DayData for the day that's ending
  public DayData endDay() {
    DayData today = manager.getTodayInfo();
    manager.endDay();
    customers.clear();
    customerMap.clear();
    return today;
  }

}
