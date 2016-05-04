package edu.brown.cs.bse.elements;

import java.util.List;

public class Drink extends FoodItem {
  
  private String size;
  private List<String> flavoring;
  private String type;
  private boolean iced;
  
  public Drink(String type, String size, List<String> flavors, boolean iced) {
    this.size = size;
    this.type = type;
    this.flavoring = flavors;
    this.iced = iced;
    setPrice(1);
    setMaxTip(2);
  }
  
  @Override
  public double compareToOrder(FoodItem other) {
    return 0;
  }
  
  @Override
  public String toString() {
    String drink = size + ' ';
    if (iced) {
      drink = drink.concat("iced ");
    }
    for (String f : flavoring) {
      drink = drink.concat(f + " ");
    }
    drink = drink.concat(type);
    return drink;
  }

}
