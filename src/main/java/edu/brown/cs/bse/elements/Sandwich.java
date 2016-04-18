package edu.brown.cs.bse.elements;

import java.util.List;

import com.google.common.collect.ImmutableList;

public class Sandwich extends FoodItem {
  
  private List<SandwichIngredient> ingreds;
  private Bread bread;
  
  public Sandwich(List<SandwichIngredient> ingredients, Bread bread) {
    this.ingreds = ingredients;
    this.bread = bread;
  }
  
  public Sandwich(Employee emp, Sandwich ordered) {
    
  }
  
  public double findQuality() {
    return 0;
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
