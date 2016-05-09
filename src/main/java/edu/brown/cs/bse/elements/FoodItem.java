package edu.brown.cs.bse.elements;

public abstract class FoodItem {

  private double price;
  private double maxTip;

  public double getPrice() {
    return price;
  }

  public double getMaxTip() {
    return maxTip;
  }

  public void setMaxTip(double tip) {
    maxTip = tip;
  }

  protected void setPrice(double newprice) {
    this.price = newprice;
  }

  /**
   * Compares this food item to the one that was ordered.
   * 
   * @param ordered
   * @return A measure of the quality of the food item that was prepared,
   *         between 0 and 1.
   */
  public abstract double compareToOrder(FoodItem ordered);

}
