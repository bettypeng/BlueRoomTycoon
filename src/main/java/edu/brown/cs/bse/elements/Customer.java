package edu.brown.cs.bse.elements;


public class Customer {

  private FoodItem order;
  private double happiness;
  private String station;
  private String id;

  public Customer(String id, FoodItem order, String stationName) {
    this.order = order;
    this.happiness = 1;
    this.station = stationName;
    this.id = id;
  }

  public double getHappiness() {
    return happiness;
  }

  public void setHappiness(double newHappy) {
    happiness = newHappy;
  }

  public FoodItem getOrder() {
    return order;
  }

//  public void setOrder(FoodItem newOrder) {
//    order = newOrder;
//  }

  public String getStation() {
    return station;
  }

  @Override
  public String toString() {
    return String.format("id: %s, order: %s, station: %s, happiness: %f", id, order, station, happiness);
  }
}
