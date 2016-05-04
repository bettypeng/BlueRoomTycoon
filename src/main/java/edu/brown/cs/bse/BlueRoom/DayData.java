package edu.brown.cs.bse.BlueRoom;

public class DayData {

  private int sandwichCount;
  private double sandwichRevenue;
  private int bakeryCount;
  private double bakeryRevenue;
  private int coffeeCount;
  private double coffeeRevenue;
  private int totalPurchases;
  private double totalRevenue;
  private double totalLosses;
  private double expenses;
  
  public DayData(double expenses) {
    this.expenses = expenses;
  }

  public void newPurchase(String station, double price) {
    switch(station) {
    case "sandwich":
      sandwichCount++;
      sandwichRevenue += price;
      break;
    case "coffee":
      coffeeCount++;
      coffeeRevenue += price;
      break;
    case "bakery":
      bakeryCount++;
      bakeryRevenue += price;
      break;
    default:
      break;
    }
    totalPurchases++;
    totalRevenue += price;
  }
  
  public void newLoss(double amt) {
    totalLosses += amt;
  }

  // i'll probably end up coming up with a better way to handle all of the different kinds of Revenue -
  // this is not extensible were we to add more stations (need a polymorphic way/even just a method that
  // runs a switch on station name for a getter)
  public double getTotalRevenue() {
    return totalRevenue;
  }

  public int getTotalPurchases() {
    return totalPurchases;
  }

  public double getCoffeeRevenue() {
    return coffeeRevenue;
  }

  public int getSandwichCount() {
    return sandwichCount;
  }

  public double getSandwichRevenue() {
    return sandwichRevenue;
  }

  public int getBakeryCount() {
    return bakeryCount;
  }

  public double getBakeryRevenue() {
    return bakeryRevenue;
  }

  public int getCoffeeCount() {
    return coffeeCount;
  }
  
  public double getLosses() {
    return totalLosses;
  }
  
  public double getExpenses() {
    return expenses;
  }

  @Override
  public String toString() {
    return String.format("Today's Revenue: %.2f, number of purchases: %d", totalRevenue, totalPurchases);
  }

}
