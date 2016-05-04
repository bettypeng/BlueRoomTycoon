package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedWriter;
import java.io.IOException;
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
    currDay = new DayData(DAILY_EXPENSES);
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
    currDay = new DayData(DAILY_EXPENSES);
    money -= DAILY_EXPENSES;
  }
  
  public void save(BufferedWriter writer) throws IOException {
    String mon = String.valueOf(money);
    writer.write(mon, 0, mon.length());
    writer.newLine();
    gameData.save(writer);
    String numDays = String.valueOf(dataOverTime.size());
    writer.write(numDays, 0, numDays.length());
    writer.newLine();
  }

}
