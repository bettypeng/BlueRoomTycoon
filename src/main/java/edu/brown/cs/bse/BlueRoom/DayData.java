package edu.brown.cs.bse.BlueRoom;

public class DayData {

  private int sandwichCount;
  //private double sandwichRevenue;
  private int bakeryCount;
  //private double bakeryRevenue;
  private int coffeeCount;
  //private double coffeeRevenue;
  private int alcCount;
  private int totalPurchases;
  private double totalRevenue;
  private double totalLosses;
  private double customersLost;
  private double thefts;
  private double expenses;
  private int itemsTrashed;

  public DayData(double expenses) {
    this.expenses = expenses;
    customersLost = 0;
    alcCount = 0;
    thefts = 0;
    itemsTrashed = 0;
  }

  public void newPurchase(String station, double price) {
    switch (station) {
    case "sandwich":
      sandwichCount++;
      //sandwichRevenue += price;
      break;
    case "coffee":
      coffeeCount++;
      //coffeeRevenue += price;
      break;
    case "bakery":
      bakeryCount++;
      //bakeryRevenue += price;
      break;
    case "drink_alc": case "chips_alc":
      alcCount++;
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

  public void customerLost() {
    customersLost++;
  }

  public void customerTheft() {
    thefts++;
  }

  public void trash(int num) {
    itemsTrashed += num;
  }

  public double getTotalRevenue() {
    return totalRevenue;
  }

  public int getTotalPurchases() {
    return totalPurchases;
  }

  public double getLosses() {
    return totalLosses;
  }

  public double getExpenses() {
    return expenses;
  }

  @Override
  public String toString() {
    return String.format("Today's Revenue: %.2f, number of purchases: %d",
        totalRevenue, totalPurchases);
  }

}
