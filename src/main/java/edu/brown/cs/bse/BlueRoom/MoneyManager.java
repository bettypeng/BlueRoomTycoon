package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.List;

public class MoneyManager {

  private List<Double> dailyProfits;

  public MoneyManager() {
    dailyProfits = new ArrayList<>();
  }

  public List<Double> getDP() {
    return dailyProfits;
  }

}
