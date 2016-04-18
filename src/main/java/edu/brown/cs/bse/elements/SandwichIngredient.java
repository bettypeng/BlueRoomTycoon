package edu.brown.cs.bse.elements;

public class SandwichIngredient {
  
  private String type;
  
  public SandwichIngredient(String type) {
    this.type = type;
  }
  
  public String getType() {
    return type;
  }
  
  @Override
  public String toString() {
    return type;
  }

}
