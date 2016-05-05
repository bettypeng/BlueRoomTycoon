package edu.brown.cs.bse.elements;

public class Muffin extends FoodItem {
  
  private String type;
  
  public Muffin(String type) {
    this.type = type;
    setPrice(3);
    setMaxTip(3);
  }
  
  public String getType() {
    return type;
  }
  
  @Override
  public double compareToOrder(FoodItem other) {
    return 0;
  }
  
  @Override
  public String toString() {
    return type + " muffin";
  }

}
