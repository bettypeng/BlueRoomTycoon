package edu.brown.cs.bse.elements;

public class Employee {
  
  private String station;
  private double energy;
  private String name;
  
  private static final double QUALITY_RANGE = 0.2;
  
  public Employee(String name) {
    energy = 1;
    this.name = name;
  }
  
  public String getName() {
    return name;
  }
  
  public void setStation(String newStation) {
    station = newStation;
  }
  
  public void setEnergy(double energy) {
    this.energy = energy;
  }
  
  public String getStation() {
    return station;
  }
  
  public double fillOrder() {
    double rand = Math.random() * QUALITY_RANGE + (energy - (QUALITY_RANGE / 2));
    if (rand > 1) {
      return 1;
    }
    if (rand < 0) {
      return 0;
    }
    return rand;
  }
  
  public double calcInterval() {
    int range = 7;
    double interval = 3 + range * (1 - energy);
    return interval;
  }
  
  @Override
  public String toString() {
    return name;
  }

}
