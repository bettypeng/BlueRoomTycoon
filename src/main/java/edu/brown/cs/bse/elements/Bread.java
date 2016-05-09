package edu.brown.cs.bse.elements;

public class Bread extends SandwichIngredient {

  public Bread(String type) {
    super(type);
  }

  @Override
  public boolean equals(Object o) {
    if (o == this) {
      return true;
    }
    if (!(o instanceof Bread)) {
      return false;
    }
    Bread other = (Bread) o;
    return other.getType().equals(getType());
  }

}
