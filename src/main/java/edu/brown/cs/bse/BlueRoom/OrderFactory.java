package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import edu.brown.cs.bse.elements.Bread;
import edu.brown.cs.bse.elements.Drink;
import edu.brown.cs.bse.elements.Sandwich;
import edu.brown.cs.bse.elements.SandwichIngredient;

/**
 * Handles semi-random order generation that happens whenever a new customer
 * enters the blue room.
 * @author emagaver
 *
 */
public class OrderFactory {

  // SANDWICH ORDERS

  private static final String[] MEAT_NAMES = { "turkey", "roast_beef", "ham",
      /*"chicken salad", "salami", "prosciutto"*/ };

  private static final String[] VEGGIE_NAMES = { "lettuce", "tomato", "onion", "cucumber", /*"spinach",
      "spring mix", "none" */};

  private static final String[] SAUCE_NAMES = { "mayo", "chipotle mayo",
      "mustard", "hummus", "goat cheese", "balsamic", "honey mustard" };

  private static final String[] BREAD_NAMES = { "wheat", /*"ciabatta", "french", "sliced"*/ };

  /**
   * Generates a sandwich order, complete with meats, cheese, veggies, (sauces),
   * and bread.
   * @return The generated Sandwich
   */
  public static Sandwich getSandwichOrder() {
    List<SandwichIngredient> ingreds = new ArrayList<>();
    //ingreds.addAll(getSauces());

    ingreds.addAll(getMeats());
    ingreds.addAll(getCheese());
    ingreds.addAll(getVeggies());

    Bread bread = getBread();
    return new Sandwich(ingreds, bread);
  }

  /*
   * Generates a random list of meat SandwichIngredients, returns it.
   */
  private static List<SandwichIngredient> getMeats() {
    int numMeats;
    int rand = (int) (Math.random() * 10);
    switch (rand) {
    case 0:
      numMeats = 3;
      break;
    case 1: case 2:
      numMeats = 2;
      break;
    case 3: case 4:
      numMeats = 0;
    default:
      numMeats = 1;
      break;
    }
    List<SandwichIngredient> meats = new ArrayList<>();
    for (int i = 0; i < numMeats; i++) {
      rand = (int) (Math.random() * MEAT_NAMES.length);
      String meatType = MEAT_NAMES[rand];
      meats.add(new SandwichIngredient(meatType));
    }
    return meats;
  }

  /*
   * Generates a list of either 0, 1, or 2 SandwichIngredient cheeses.
   */
  private static List<SandwichIngredient> getCheese() {
    List<SandwichIngredient> cheeses = new ArrayList<>();
    int rand = (int) (Math.random() * 3);
    switch (rand) {
    case 0:
      cheeses.add(new SandwichIngredient("cheese"));
      break;
    case 1:
      cheeses.add(new SandwichIngredient("cheese"));
      cheeses.add(new SandwichIngredient("cheese"));
      break;
    default:
      break;
    }
    return cheeses;
  }

  /*
   * Determines which bread to put on the sandwich.
   */
  private static Bread getBread() {
    int index = (int) (Math.random() * BREAD_NAMES.length);
    return new Bread(BREAD_NAMES[index]);
  }

  /*
   * Determines which vegetables to put on the sandwich, and how many.
   */
  private static List<SandwichIngredient> getVeggies() {
    int numVeg;
    int rand = (int) (Math.random() * 10);
    switch (rand) {
    case 0:
      numVeg = 3;
      break;
    case 1: case 2:
      numVeg = 1;
      break;
    case 3: case 4:
      numVeg = 0;
    default:
      numVeg = 2;
      break;
    }
    List<SandwichIngredient> veggies = new ArrayList<>();
    for (int i = 0; i < numVeg; i++) {
      rand = (int) (Math.random() * VEGGIE_NAMES.length);
      veggies.add(new SandwichIngredient(VEGGIE_NAMES[rand]));
    }
    return veggies;
  }

  /*
   * Generates up to 2 sauces for the sandwich.
   */
  private static List<SandwichIngredient> getSauces() {
    int numSauce;
    int rand = (int) (Math.random() * 10);
    switch (rand) {
    case 0: case 1:
      numSauce = 2;
      break;
    case 2: case 3:
      numSauce = 0;
      break;
    default:
      numSauce = 1;
      break;
    }
    List<SandwichIngredient> sauces = new ArrayList<>();
    for (int i = 0; i < numSauce; i++) {
      rand = (int) (Math.random() * SAUCE_NAMES.length);
      String sauceType = SAUCE_NAMES[rand];
      sauces.add(new SandwichIngredient(sauceType));
    }
    return sauces;
  }

  // DRINK ORDERS
  private static final String[] DRINK_TYPES = {"latte", "cappuccino", "coffee", "tea", "hot_chocolate", "tequila"};
  
  
  public static Drink getDrinkOrder() {
    return new Drink("latte", "small", Arrays.asList("vanilla"), true);
  }
  
  private static String getType() {
    return "";
  }
  
  private static String getSize() {
    return "";
  }
  
  private static List<String> getFlavoring() {
    return Collections.emptyList();
  }
  
  private static boolean getIced() {
    return false;
  }

}
