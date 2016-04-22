package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.FoodItem;


public class GameManager {

  private final static int UUID_LEN = 8;
  private MoneyManager manager;
  private List<Customer> customers;
  private List<Employee> employees;
  private Map<String, Customer> customerMap;

  private List<String> availableStations;

  public GameManager() {
    manager = new MoneyManager();
    customers = new ArrayList<>();
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    customerMap = new HashMap<>();
    availableStations.add("sandwich");
  }

  public double purchase(FoodItem purchase, Customer cust) {
    double price = purchase.getPrice();
    price += (purchase.compareToOrder(cust.getOrder()) * cust.getHappiness() * 3);
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
    return newCustomer;
  }

  public Customer getFrontCustomer() {
    if (customers.isEmpty()) {
      return null;
    }
    return customers.remove(0);
  }

  public List<Double> getDailyProfits() {
    return manager.getDP();
  }

  public List<Double> getTotalProfits() {
    return Collections.emptyList();
  }

  public void addEmployee() {

  }

  public void addStation(String stationName) {

  }

  /**
   * Gets the customer cached in the map
   * @param id
   * @return
   */
  public Customer getCustomer(String id) {
    if (customerMap.containsKey(id)) {
      return customerMap.get(id);
    }
    return null;
  }

}
