package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;

public class GameData {

  private double totalRevenue;
  private double totalProfit;
  private double totalExpenses;
  private double totalLosses;

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

  public void load(BufferedReader reader) throws IOException {
    totalRevenue = Double.valueOf(reader.readLine());
    totalExpenses = Double.valueOf(reader.readLine());
    totalLosses = Double.valueOf(reader.readLine());
    totalProfit = Double.valueOf(reader.readLine());
  }

}
