package edu.brown.cs.bse.elements;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.ImmutableList;

public class Sandwich extends FoodItem {

  private List<SandwichIngredient> ingreds;
  private Bread bread;
  private Map<SandwichIngredient, Double> deltas;

  public Sandwich(List<SandwichIngredient> ingredients, Bread bread) {
    this.ingreds = ingredients;
    this.bread = bread;
    this.deltas = new HashMap<>();
    for (SandwichIngredient i : ingredients) {
      deltas.put(i, 0.0);
    }
    setPrice(6.95);
  }

  public Sandwich(List<SandwichIngredient> ingredients,
      Map<SandwichIngredient, Double> deltas, Bread bread) {
    this.ingreds = ingredients;
    this.bread = bread;
    this.deltas = deltas;
    setPrice(4);
  }

  public Sandwich(Employee emp, Sandwich ordered) {

  }

  public double getOverallDistToCenter() {
    double total = 0;
    for (Double dist : deltas.values()) {
      total += dist;
    }
    return total;
  }

  @Override
  public double compareToOrder(FoodItem ordered) {
    if (!(ordered instanceof Sandwich)) {
      return 0;
    }
    double quality = 1;
    Sandwich order = (Sandwich) ordered;
    List<SandwichIngredient> otherIngredients = order.getIngredients();
    Bread otherBread = order.getBread();
    double valueOfEach = 1 / ((double) (otherIngredients.size() + 1));
    if (!(bread.getType().equals(otherBread.getType()))) {
      System.out
          .println(bread.getType() + " does not match " + otherBread.getType());
      quality -= valueOfEach;
    }
    for (int i = 0; i < otherIngredients.size(); i++) {
      SandwichIngredient one = otherIngredients.get(i);
      if (ingreds.size() <= i) {
        System.out.println("sizes do not match");
        quality -= valueOfEach;
        continue;
      }
      SandwichIngredient two = ingreds.get(i);
      if (!one.getType().equals(two.getType())) {
        System.out.println(one.getType() + " does not match " + two.getType());
        quality -= valueOfEach;
      } else {
        if (deltas.get(two) != 0) {
          System.out
              .println("ingredient location is off by " + deltas.get(two));
        }
        quality -= (valueOfEach * deltas.get(two));
      }
    }
    System.out.println(quality);

    // if quality is below a certain threshold, return 0
    if (quality < .5){
      return 0;
    }
    return quality;
  }

  public Bread getBread() {
    return bread;
  }

  public List<SandwichIngredient> getIngredients() {
    return ImmutableList.copyOf(ingreds);
  }

  @Override
  public String toString() {
    return String.format("bread: %s, ingredients: %s", bread, ingreds);
  }

}
