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
    setPrice(2);
    setMaxTip(3);
  }

  @Override
  public double compareToOrder(FoodItem ordered) {
    if (!(ordered instanceof Drink)) {
      return 0;
    }
    double quality = 1;
    Drink order = (Drink) ordered;
    double valueOfEach = quality / 4;
    if (!type.equals(order.type)) {
      quality -= valueOfEach;
      System.out.println(type + " does not match " + order.type);
    }
    if (!size.equals(order.size)) {
      quality -= valueOfEach;
      System.out.println(size + " does not match " + order.size);
    }
    if (iced != order.iced) {
      quality -= valueOfEach;
      System.out.println("icing does not match");
    }
    List<String> otherFlavor = order.flavoring;
    if (!flavoring.equals(otherFlavor)) {
      quality -= valueOfEach;
      System.out.println(flavoring + " does not match " + order.flavoring);
    }
    System.out.println("quality: " + quality);
    if (quality <= 0.25) {
      return 0;
    }
    return quality;
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
