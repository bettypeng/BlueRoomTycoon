package edu.brown.cs.bse.elements;

public class Muffin extends FoodItem {
  
  private String type;
  
  public Muffin(String type) {
    this.type = type;
    setPrice(3);
    setMaxTip(1);
  }
  
  @Override
  public double compareToOrder(FoodItem other) {
    if (!(other instanceof Muffin)) {
      return 0;
    }
    Muffin order = (Muffin) other;
    if (!type.equals(order.type)) {
      return 0;
    }
    return 1;
  }
  
  @Override
  public String toString() {
    return type + " muffin";
  }

}
