package edu.brown.cs.bse.elements;

public class Employee {

  private String station;
  private double energy;
  private String name;
  private double skill;
  private double speed;

  private static final double QUALITY_RANGE = 0.2;

  public Employee(String name) {
    energy = 1;
    this.name = name;
    switch(name) {
    case "alex":
      skill = 1;
      speed = 0;
      break;
    case "rachel":
      skill = 0.5;
      speed = 0.5;
      break;
    case "erik":
      skill = 0;
      speed = 1;
      break;
    default:
      break;
    }
  }

  public String getName() {
    return name;
  }

  public void setEnergy(double energy) {
    this.energy = energy;
  }
  
  public double getEnergy() {
    return energy;
  }

  public String getStation() {
    return station;
  }

  public double fillOrder() {
    double rand = Math.random() * QUALITY_RANGE
        + (energy - (QUALITY_RANGE / 2));
    rand += (skill - 0.5) * 0.2;
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
    interval += (0.5 - speed) * 2;
    return interval;
  }

  @Override
  public String toString() {
    return name;
  }

}
