package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.List;

public class MoneyManager {

  private List<Double> profitsOverTime;
  private DayData currDay;
  private double money;
  
  // this will change
  private static final double DAILY_EXPENSES = 200;

  public MoneyManager(double startMoney) {
    profitsOverTime = new ArrayList<>();
    money = startMoney;
    currDay = new DayData();
  }

  public List<Double> getProfits() {
    return profitsOverTime;
  }
  
  public DayData getTodayInfo() {
    return currDay;
  }
  
  public void handlePurchase(double incr, String station) {
    money += incr;
    currDay.newPurchase(station, incr);
  }
  
  public double getMoney() {
    return money;
  }
  
  public void endDay() {
    profitsOverTime.add(currDay.getTotalProfit());
  }
  
  public void startDay() {
    currDay = new DayData();
    money -= DAILY_EXPENSES;
  }

}
