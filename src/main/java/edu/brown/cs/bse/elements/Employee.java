package edu.brown.cs.bse.elements;

public class Employee {
  
  private String station;
  private double qualityScore;
  
  private static final double QUALITY_RANGE = 0.2;
  
  public Employee() {
    qualityScore = 0.8;
  }
  
  public void setStation(String newStation) {
    station = newStation;
  }
  
  public String getStation() {
    return station;
  }
  
  public double fillOrder() {
    double rand = Math.random() * QUALITY_RANGE + (qualityScore - (QUALITY_RANGE / 2));
    return rand;
  }

}
