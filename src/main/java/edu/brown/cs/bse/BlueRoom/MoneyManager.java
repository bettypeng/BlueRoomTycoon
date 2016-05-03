package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.List;

public class MoneyManager {

  private List<DayData> dataOverTime;
  private DayData currDay;
  private GameData gameData;
  private double money;

  // this will change
  private static final double DAILY_EXPENSES = 200;

  public MoneyManager(double startMoney) {
    dataOverTime = new ArrayList<>();
    gameData = new GameData();
    money = startMoney;
    currDay = new DayData();
  }

  public List<DayData> getTotalData() {
    return dataOverTime;
  }

  public GameData getTotalInfo() {
    return gameData;
  }

  public DayData getTodayInfo() {
    return currDay;
  }

  public void handlePurchase(double incr, String station) {
    money += incr;
    currDay.newPurchase(station, incr);
  }

  public void handleLoss(double amt) {
    money -= amt;
    currDay.newLoss(amt);
  }

  public double getMoney() {
    return money;
  }

  public void endDay() {
    dataOverTime.add(currDay);
    gameData.addDayData(currDay);
  }

  public void startDay() {
    currDay = new DayData();
    money -= DAILY_EXPENSES;
  }

}
