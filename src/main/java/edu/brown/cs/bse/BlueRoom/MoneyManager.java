package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MoneyManager {

  private List<Double> dailyNetProfits;
  private DayData currDay;
  private int dayNum;
  private GameData gameData;
  private double money;

  // this will change
  private double dailyExpenses;

  public MoneyManager(double startMoney) {
    dailyNetProfits = new ArrayList<>();
    gameData = new GameData();
    money = startMoney;
    dailyExpenses = 15;
    currDay = new DayData(dailyExpenses);
    dayNum = 1;
  }

  // public List<DayData> getTotalData() {
  // return dataOverTime;
  // }

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

  public int getDayNum() {
    return dayNum;
  }

  public void changeMoney(double delta) {
    money += delta;
  }

  public void endDay() {
    dailyNetProfits.add(currDay.getTotalRevenue()
        - (currDay.getExpenses() + currDay.getLosses()));
    gameData.addDayData(currDay);
    money -= dailyExpenses;
    dayNum++;
  }

  public void startDay() {
    currDay = new DayData(dailyExpenses);
  }

  public void handleAbandon() {
    currDay.customerLost();
  }

  public void handleTheft() {
    currDay.customerTheft();
  }

  public void handleTrash(int numTrashed) {
    currDay.trash(numTrashed);
  }

  public void addDailyExpenses(double amt) {
    dailyExpenses += amt;
  }
  
  public double getDailyExpenses() {
    return dailyExpenses;
  }

  public void save(BufferedWriter writer) throws IOException {
    String mon = String.valueOf(money);
    writer.write(mon, 0, mon.length());
    writer.newLine();
    gameData.save(writer);
    String numDays = String.valueOf(dayNum);
    writer.write(numDays, 0, numDays.length());
    writer.newLine();
    for (Double profit : dailyNetProfits) {
      String str = String.valueOf(profit);
      writer.write(str, 0, str.length());
      writer.newLine();
    }
  }

  public int load(BufferedReader reader)
      throws IOException, NumberFormatException {
    money = Double.parseDouble(reader.readLine());
    gameData.load(reader);
    dayNum = Integer.parseInt(reader.readLine());
    dailyNetProfits = new ArrayList<>();
    for (int i = 1; i < dayNum; i++) {
      dailyNetProfits.add(Double.parseDouble(reader.readLine()));
    }
    currDay = new DayData(dailyExpenses);
    return dayNum;
  }

}
