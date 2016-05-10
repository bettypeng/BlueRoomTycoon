package EconomicsSimulator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import edu.brown.cs.bse.BlueRoom.DayData;
import edu.brown.cs.bse.BlueRoom.GameManager;
import edu.brown.cs.bse.elements.Customer;

public class SimulatorMain {

  public static void main(String[] args) {
    new SimulatorMain(args).run();
  }

  private String[] args;
  private final int DAY_LEN = 6000;
  private GameManager manager;

  private SimulatorMain(String[] args) {
    this.args = args;
    this.manager = new GameManager();
  }

  private void run() {
    for (int i = 0; i < 10; i++) {
      double interval = manager.calculateCustomerInterval();
      int numCustomers = (int) (DAY_LEN / interval) - 1;
      for (int j = 0; j < numCustomers; j++) {
        Customer newCustomer = manager.newCustomer();
        double happiness = getRandVal();
        newCustomer.setHappiness(happiness);
        double quality = getRandVal();
//        System.out.println("Happiness: " + happiness);
        double moneyMade = manager.purchase(quality, newCustomer);
//        System.out.println("made $" + moneyMade);

      }
      System.out.println(numCustomers + " customers served today!");
      DayData today = manager.endDay();
      System.out.println("$" + today.getTotalRevenue() + " made today!");
      System.out.println("$" + manager.getCurrentMoney() + " at the end of day " + (manager.getDayNum() - 1));
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
          .println("all upgrades purchased by day " + manager.getDayNum());
      return;
    }
    if (bestStationToBuy.equals("coffee") || manager.getEmployeeNames().size() < 1) {
      
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
    List<String> names = new ArrayList<>(Arrays.asList("erik", "alex", "rachel"));
    for (String s : currEmployees) {
      names.remove(s);
    }
    int rand = (int)(Math.random() * names.size());
    return names.get(rand);
  }

}
