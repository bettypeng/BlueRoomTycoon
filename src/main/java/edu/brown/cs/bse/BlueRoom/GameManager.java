package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.List;

import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.FoodItem;

public class GameManager {
  
  private MoneyManager manager;
  private List<Customer> customers;
  private List<Employee> employees;
  
  private List<String> availableStations;
  
  public GameManager() {
    manager = new MoneyManager();
    customers = new ArrayList<>();
    employees = new ArrayList<>();
    availableStations = new ArrayList<>();
    availableStations.add("sandwich");
  }
  
  public double purchase(FoodItem purchase, Customer cust) {
    double price = purchase.getPrice();
    price += (purchase.compareToOrder(cust.getOrder()) * cust.getHappiness() * 3);
    return price;
  }
  
  public Customer newCustomer() {
    int rand = (int) (Math.random() * availableStations.size());
    String station = availableStations.get(rand);
    Customer newCustomer;
    switch (station) {
    default:
      newCustomer = new Customer(OrderFactory.getSandwichOrder(), station);
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

}
