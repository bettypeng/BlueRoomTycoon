package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import edu.brown.cs.bse.elements.Bread;
import edu.brown.cs.bse.elements.Sandwich;
import edu.brown.cs.bse.elements.SandwichIngredient;

public class OrderFactory {

  private static final String[] MEAT_NAMES = { "turkey", "roast beef", "ham",
      "chicken salad", "salami", "prosciutto", "none" };

  private static final String[] VEGGIE_NAMES = { "lettuce", "tomato", "spinach",
      "spring mix", "onions", "none" };

  private static final String[] SAUCE_NAMES = { "mayo", "chipotle mayo",
      "mustard", "hummus", "goat cheese", "balsamic", "honey mustard", "none" };

  private static final String[] BREAD_NAMES = { "ciabatta", "french", "wheat",
      "wrap" };

  public static Sandwich getSandwichOrder() {
    List<SandwichIngredient> ingreds = new ArrayList<>();
    ingreds.addAll(getSauces());
    ingreds.addAll(getMeats());
    ingreds.addAll(getCheese());
    ingreds.addAll(getVeggies());
    Bread bread = getBread();
    return new Sandwich(ingreds, bread);
  }

  private static List<SandwichIngredient> getMeats() {
    List<SandwichIngredient> meats = new ArrayList<>();
    int rand = (int) (Math.random() * MEAT_NAMES.length);
    String meatType = MEAT_NAMES[rand];
    if (!meatType.equals("none")) {
      meats.add(new SandwichIngredient(meatType));
    }
    return meats;
  }

  private static List<SandwichIngredient> getCheese() {
    List<SandwichIngredient> cheeses = new ArrayList<>();
    int rand = (int) (Math.random() * 2);
    if (rand == 0) {
      cheeses.add(new SandwichIngredient("cheese"));
    }
    return cheeses;
  }

  private static Bread getBread() {
    int index = (int) (Math.random() * BREAD_NAMES.length);
    return new Bread(BREAD_NAMES[index]);
  }

  private static List<SandwichIngredient> getVeggies() {
    List<SandwichIngredient> vegs = new ArrayList<>();
    int rand = (int) (Math.random() * VEGGIE_NAMES.length);
    String vegType = VEGGIE_NAMES[rand];
    if (!vegType.equals("none")) {
      vegs.add(new SandwichIngredient(vegType));
    }
    rand = (int) (Math.random() * VEGGIE_NAMES.length);
    vegType = VEGGIE_NAMES[rand];
    if (!vegType.equals("none")) {
      vegs.add(new SandwichIngredient(vegType));
    }
    return vegs;
  }

  private static List<SandwichIngredient> getSauces() {
    List<SandwichIngredient> sauces = new ArrayList<>();
    int rand = (int) (Math.random() * SAUCE_NAMES.length);
    String sauceType = SAUCE_NAMES[rand];
    if (!sauceType.equals("none")) {
      sauces.add(new SandwichIngredient(sauceType));
    }
    return sauces;
  }

}
