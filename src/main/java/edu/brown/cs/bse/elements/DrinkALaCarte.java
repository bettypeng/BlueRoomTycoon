package edu.brown.cs.bse.elements;

public class DrinkALaCarte extends FoodItem {

  public DrinkALaCarte() {
    setPrice(4.25);
    setMaxTip(1);
  }

  @Override
  public double compareToOrder(FoodItem ordered) {
    if (!(ordered instanceof DrinkALaCarte)) {
      return 0;
    }
    return 1;
  }
}
