package edu.brown.cs.bse.elements;

public class ChipsALaCarte extends FoodItem {

  public ChipsALaCarte() {
    setPrice(2.30);
    setMaxTip(1);
  }

  @Override
  public double compareToOrder(FoodItem ordered) {
    if (!(ordered instanceof ChipsALaCarte)) {
      return 0;
    }
    return 1;
  }

}
