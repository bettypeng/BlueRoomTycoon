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
  
  public GameManager() {
    manager = new MoneyManager();
    customers = new ArrayList<>();
    employees = new ArrayList<>();
  }
  
  public double purchase(FoodItem purchase, double happiness) {
    return 0;
  }
  
  public Customer newCustomer() {
    Customer newCustomer = new Customer(OrderFactory.getSandwichOrder(), "sandwich");
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
