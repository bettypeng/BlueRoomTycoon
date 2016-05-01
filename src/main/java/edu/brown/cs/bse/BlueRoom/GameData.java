package edu.brown.cs.bse.BlueRoom;

public class GameData {

  private int totalPurchases;
  private double totalProfit;
  private double totalTips;
  private double totalExpenses;

  // i'll probably end up coming up with a better way to handle all of the different kinds of profit -
  // this is not extensible were we to add more stations (need a polymorphic way/even just a method that
  // runs a switch on station name for a getter)
  public double getTotalProfit() {
    return totalProfit;
  }

  public int getTotalPurchases() {
    return totalPurchases;
  }

  public void addDayData(DayData d) {
    totalProfit += d.getTotalProfit();
    totalTips += d.getTotalTips();
    totalPurchases += d.getTotalPurchases();
  }

  @Override
  public String toString() {
    return String.format("Today's profit: %.2f, number of purchases: %d", totalProfit, totalPurchases);
  }

}
