package edu.brown.cs.bse.EconomicsSimulator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import edu.brown.cs.bse.BlueRoom.DayData;
import edu.brown.cs.bse.BlueRoom.GameManager;
import edu.brown.cs.bse.elements.ChipsALaCarte;
import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.DrinkALaCarte;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.FoodItem;

public class SimulatorMain {

  public static void main(String[] args) {
    new SimulatorMain().run();
  }

  private final int DAY_LEN = 6000;
  private final int USER_DELAY = 800;
  private GameManager manager;

  private SimulatorMain() {
    this.manager = new GameManager();
  }

  private void run() {
    for (int i = 0; i < 15; i++) {
      double interval = manager.calculateCustomerInterval();
      int numCustomers = (int) (DAY_LEN / interval) - 1;
      
      int numUserCanServe = (int) (DAY_LEN / USER_DELAY) + 3;
      if (manager.hasMagazineRack()) {
        numUserCanServe += 2;
      }
      int servedByUser = Math.min(numUserCanServe, numCustomers);
      int servedTotal = servedByUser;
      
      for (int j = 0; j < servedByUser; j++) {
        Customer newCustomer = manager.newCustomer();
        if (newCustomer.getStation().equals("drink_alc") || newCustomer.getStation().equals("chips_alc")) {
          j--;
          continue;
        }
        double happiness = getRandVal();
        newCustomer.setHappiness(happiness);
        double quality = getRandVal();
        manager.purchase(quality, newCustomer);

      }
      int servedAuto = 0;
      if (manager.getAvailableStations().contains("drink_alc")) {
        servedAuto += 5;
      }
      if (manager.getAvailableStations().contains("chips_alc")) {
        servedAuto += 5;
      }
      servedAuto = Math.min(servedAuto, numCustomers - servedTotal);
      
      for (int j = 0; j < servedAuto; j++) {
        int rand = (int)(Math.random() * 2);
        FoodItem order;
        if (rand == 0) {
          order = new DrinkALaCarte();
        } else {
          order = new ChipsALaCarte();
        }
        if (servedAuto == 5) {
          order = new ChipsALaCarte();
        }
        Customer cust = new Customer("lol", order, "drink_alc");
        cust.setHappiness(1);
        manager.purchase(1, cust);
      }
      
      servedTotal += servedAuto;
      int servedByEmps = employeeManagement(numCustomers - servedTotal);
      servedTotal += servedByEmps;
      int abandoned = numCustomers - servedTotal;
      for (int j = 0; j < abandoned; j++) {
        manager.leave();
      }
      
      System.out.println(servedByUser + " customers served by user today, " + servedByEmps + " served by employees, " + servedAuto + " auto");
      System.out.println(servedTotal + " customers served total today, " + abandoned + " abandoned");
      DayData today = manager.endDay();
      System.out.println("$" + today.getTotalRevenue() + " made today!");
      System.out.println("$" + today.getExpenses() + " in expenses today");
      System.out.println("$" + manager.getCurrentMoney() + " at the end of day "
          + (manager.getDayNum() - 1));
      makeUpgrades();
      manager.startDay();
    }
  }

  private void makeUpgrades() {
    // Map<String, Double> upgradeCosts = GameManager.UPGRADE_COSTS;
    List<String> upgradesPurchased = new ArrayList<>(
        manager.getAvailableStations());
    if (manager.hasMagazineRack()) {
      upgradesPurchased.add("magazineRack");
    }

    String bestStationToBuy = getCheapestAvailableUpgrade(upgradesPurchased);
    if (bestStationToBuy.equals("")) {
      System.out
          .println("all upgrades purchased at end of day " + (manager.getDayNum() - 1));
      if (manager.getEmployeeNames().size() < 3) {
        String toHire = pickEmployeeToHire(manager.getEmployeeNames());
        if (canHireEmployee()) {
          manager.hireEmployee(toHire, 100);
          System.out.println("hiring " + toHire);
        }
      } else {
        System.out.println("all employees hired, end of day " + (manager.getDayNum() - 1));
      }
      return;
    }
    if (bestStationToBuy.equals("coffee")
        && manager.getEmployeeNames().size() < 1) {
      String toHire = pickEmployeeToHire(manager.getEmployeeNames());
      if (canHireEmployee()) {
        manager.hireEmployee(toHire, 100);
        System.out.println("hiring " + toHire);
      }
    } else if (bestStationToBuy.equals("bakery")
        && manager.getEmployeeNames().size() < 2) {
      String toHire = pickEmployeeToHire(manager.getEmployeeNames());
      if (canHireEmployee()) {
        manager.hireEmployee(toHire, 100);
        System.out.println("hiring " + toHire);
      }
    } else {
      if (canBuyStation(bestStationToBuy)) {
        
        System.out.println("buying " + bestStationToBuy);
        
        if (bestStationToBuy.equals("magazineRack")) {
          manager.addMagazineRack(GameManager.UPGRADE_COSTS.get(bestStationToBuy));
        } else {
          manager.addStation(bestStationToBuy, GameManager.UPGRADE_COSTS.get(bestStationToBuy));
        }
      }
    }
  }

  private double getRandVal() {
    return Math.random() * 0.3 + 0.7;
  }

  private String getCheapestAvailableUpgrade(List<String> upgradesPurchased) {
    String best = "";
    double bestVal = Integer.MAX_VALUE;
    Map<String, Double> upgradeCosts = GameManager.UPGRADE_COSTS;
    Map<String, Double> upkeeps = GameManager.STATION_UPKEEPS;
    for (Entry<String, Double> entry : upgradeCosts.entrySet()) {
      String station = entry.getKey();
      double cost = entry.getValue();
      double upkeep = upkeeps.get(station);
      if (cost + upkeep < bestVal && !upgradesPurchased.contains(station)) {
        best = station;
        bestVal = cost + upkeep;
      }
    }
    return best;
  }

  private String pickEmployeeToHire(List<String> currEmployees) {
    List<String> names = new ArrayList<>(
        Arrays.asList("erik", "alex", "rachel"));
    for (String s : currEmployees) {
      names.remove(s);
    }
    int rand = (int) (Math.random() * names.size());
    return names.get(rand);
  }

  private boolean canHireEmployee() {
    return manager.getCurrentMoney() > (100 + GameManager.EMPLOYEE_WAGE
        + manager.getCurrExpenses());
  }

  private boolean canBuyStation(String station) {
    return manager.getCurrentMoney() > (GameManager.UPGRADE_COSTS.get(station)
        + GameManager.STATION_UPKEEPS.get(station) + manager.getCurrExpenses());
  }
  
  // returns number of customers served by employees
  private int employeeManagement(int toBeServed) {
    int total = 0;
    for (String name : manager.getEmployeeNames()) {
      Employee emp = manager.getEmployee(name);
      int timeLeft = DAY_LEN;
      int numServed = 0;
      
      while (timeLeft > 0 && toBeServed > 0) {
        
        double interval = emp.calcInterval();
        timeLeft -= interval * 100;
        numServed++;
        toBeServed--;
        
        Customer newCust = manager.newCustomer();
        double happiness = getRandVal();
        newCust.setHappiness(happiness);
        manager.purchase(emp.fillOrder(), newCust);
        
        emp.setEnergy(emp.getEnergy() - .1);
        
        // employee recharge when necessary
        if (emp.getEnergy() == 0) {
          emp.setEnergy(0.5);
          timeLeft -= 4000;
        }
      }
      
      System.out.println(name + " served " + numServed + " customers today!");
      total += numServed;
    }
    return total;
  }

}
