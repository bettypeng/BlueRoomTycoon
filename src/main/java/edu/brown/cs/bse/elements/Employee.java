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
    return rand;
  }

}
