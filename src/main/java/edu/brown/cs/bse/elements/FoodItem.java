package edu.brown.cs.bse.elements;

public abstract class FoodItem {
  
  private double price;
  
  public double getPrice() {
    return price;
  }
  
  protected void setPrice(double newprice) {
    this.price = newprice;
  }
  
  public abstract double findQuality();

}
