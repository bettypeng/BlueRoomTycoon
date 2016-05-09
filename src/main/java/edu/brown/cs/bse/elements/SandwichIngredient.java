package edu.brown.cs.bse.elements;

import java.util.Objects;

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

  @Override
  public boolean equals(Object o) {
    if (o == this) {
      return true;
    }
    if (!(o instanceof SandwichIngredient)) {
      return false;
    }
    SandwichIngredient other = (SandwichIngredient) o;
    return other.getType().equals(type);
  }

  @Override
  public int hashCode() {
    return Objects.hash(type);
  }

}
