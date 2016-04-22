package edu.brown.cs.bse.BlueRoom;

public class DayData {
  
  private int sandwichCount;
  private double sandwichProfit;
  private int bakeryCount;
  private double bakeryProfit;
  private int coffeeCount;
  private double coffeeProfit;
  private int totalPurchases;
  private double totalProfit;

  public void newPurchase(String station, double price) {
    switch(station) {
    case "sandwich":
      sandwichCount++;
      sandwichProfit += price;
      break;
    case "coffee":
      coffeeCount++;
      coffeeProfit += price;
      break;
    case "bakery":
      bakeryCount++;
      bakeryProfit += price;
      break;
    default:
      break;
    }
    totalPurchases++;
    totalProfit += price;
  }
  
  // i'll probably end up coming up with a better way to handle all of the different kinds of profit -
  // this is not extensible were we to add more stations (need a polymorphic way/even just a method that
  // runs a switch on station name for a getter)
  public double getTotalProfit() {
    return totalProfit;
  }
  
  public int getTotalPurchases() {
    return totalPurchases;
  }

  public double getCoffeeProfit() {
    return coffeeProfit;
  }

  public int getSandwichCount() {
    return sandwichCount;
  }

  public double getSandwichProfit() {
    return sandwichProfit;
  }

  public int getBakeryCount() {
    return bakeryCount;
  }

  public double getBakeryProfit() {
    return bakeryProfit;
  }

  public int getCoffeeCount() {
    return coffeeCount;
  }

}
