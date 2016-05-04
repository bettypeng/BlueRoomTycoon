package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedWriter;
import java.io.IOException;

public class GameData {

  private double totalRevenue;
  private double totalProfit;
  private double totalExpenses;
  private double totalLosses;

  // i'll probably end up coming up with a better way to handle all of the different kinds of profit -
  // this is not extensible were we to add more stations (need a polymorphic way/even just a method that
  // runs a switch on station name for a getter)
  public double getTotalProfit() {
    return totalProfit;
  }

  public double getTotalRevenue() {
    return totalRevenue;
  }

  public void addDayData(DayData d) {
    totalRevenue += d.getTotalRevenue();
    totalLosses += d.getLosses();
    totalExpenses += d.getExpenses();
    totalProfit += (d.getTotalRevenue() - (d.getLosses() + d.getExpenses()));
  }
  
  public void save(BufferedWriter writer) throws IOException {
    double[] nums = { totalRevenue, totalExpenses, totalLosses, totalProfit };
    for (double d : nums) {
      String str = String.valueOf(d);
      writer.write(str, 0, str.length());
      writer.newLine();
    }
  }

}
