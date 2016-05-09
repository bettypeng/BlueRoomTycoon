package edu.brown.cs.bse.BlueRoom;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import edu.brown.cs.bse.elements.Bread;
import edu.brown.cs.bse.elements.Drink;
import edu.brown.cs.bse.elements.Muffin;
import edu.brown.cs.bse.elements.Sandwich;
import edu.brown.cs.bse.elements.SandwichIngredient;

/**
 * Handles semi-random order generation that happens whenever a new customer
 * enters the blue room.
 * 
 * @author emagaver
 *
 */
public class OrderFactory {

  // SANDWICH ORDERS

  private static final String[] MEAT_NAMES = { "turkey", "roast_beef", "ham" };

  private static final String[] VEGGIE_NAMES = { "lettuce", "tomato", "onion",
      "pickle", "spinach", "spring_mix" };

  // private static final String[] SAUCE_NAMES = { "mayo", "chipotle mayo",
  // "mustard", "hummus", "goat cheese", "balsamic", "honey mustard" };

  private static final String[] BREAD_NAMES = { "wheat", "ciabatta", "french" };

  private static final String[] CHEESE_NAMES = { "yellow_cheese",
      "swiss_cheese", "mozzarella" };

  /**
   * Generates a sandwich order, complete with meats, cheese, veggies, (sauces),
   * and bread.
   * 
   * @return The generated Sandwich
   */
  public static Sandwich getSandwichOrder() {
    List<SandwichIngredient> ingreds = new ArrayList<>();

    ingreds.addAll(getMeats());
    ingreds.addAll(getCheeses());
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
    case 1:
    case 2:
      numMeats = 2;
      break;
    case 3:
    case 4:
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
  private static List<SandwichIngredient> getCheeses() {
    List<SandwichIngredient> cheeses = new ArrayList<>();
    int numCheeses = (int) (Math.random() * 3);
    for (int i = 0; i < numCheeses; i++) {
      int rand = (int) (Math.random() * CHEESE_NAMES.length);
      cheeses.add(new SandwichIngredient(CHEESE_NAMES[rand]));
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
    case 1:
    case 2:
      numVeg = 1;
      break;
    case 3:
    case 4:
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

  // /*
  // * Generates up to 2 sauces for the sandwich.
  // */
  // private static List<SandwichIngredient> getSauces() {
  // int numSauce;
  // int rand = (int) (Math.random() * 10);
  // switch (rand) {
  // case 0: case 1:
  // numSauce = 2;
  // break;
  // case 2: case 3:
  // numSauce = 0;
  // break;
  // default:
  // numSauce = 1;
  // break;
  // }
  // List<SandwichIngredient> sauces = new ArrayList<>();
  // for (int i = 0; i < numSauce; i++) {
  // rand = (int) (Math.random() * SAUCE_NAMES.length);
  // String sauceType = SAUCE_NAMES[rand];
  // sauces.add(new SandwichIngredient(sauceType));
  // }
  // return sauces;
  // }

  // DRINK ORDERS
  private static final String[] DRINK_TYPES = { "latte", "cappuccino", "coffee",
      "tea", "hot_chocolate" };

  private static final String[] FLAVORS = { "vanilla", "caramel", "hazelnut",
      "peppermint", "kahlua" };

  private static final int NUM_SIZES = 3;

  public static Drink getDrinkOrder() {
    // return new Drink("latte", "small", Arrays.asList("vanilla"), true);
    String type = getType();
    String size = getSize();
    List<String> flavor = getFlavoring();
    boolean iced = getIced();
    return new Drink(type, size, flavor, iced);
  }

  private static String getType() {
    int rand = (int) (Math.random() * DRINK_TYPES.length);
    return DRINK_TYPES[rand];
  }

  private static String getSize() {
    int rand = (int) (Math.random() * NUM_SIZES);
    String size;
    switch (rand) {
    case 0:
      size = "small";
      break;
    case 1:
      size = "medium";
      break;
    default:
      size = "large";
    }
    return size;
  }

  private static List<String> getFlavoring() {
    int rand = (int) (Math.random() * 3);
    boolean flavor = false;
    switch (rand) {
    case 0:
      flavor = true;
      break;
    default:
      break;
    }
    if (flavor) {
      rand = (int) (Math.random() * FLAVORS.length);
      return Arrays.asList(FLAVORS[rand]);
    } else {
      return Collections.emptyList();
    }
  }

  private static boolean getIced() {
    int rand = (int) (Math.random() * 2);
    if (rand == 0) {
      return true;
    } else {
      return false;
    }
  }

  // MUFFIN ORDERS

  private static final String[] MUFFIN_TYPES = { "pistachio", "doubleChoc",
      "chocChip", "bananaNut", "tripleBerry", "bran" };
  private static final int[] WEIGHTS = { 3, 2, 2, 1, 1, 1 };

  private static int[] TODAY_WEIGHTS = { 3, 2, 2, 1, 1, 1 };

  public static void setMuffinWeights() {
    List<Integer> remainingIndex = new ArrayList<>();
    for (int i = 0; i < WEIGHTS.length; i++) {
      remainingIndex.add(i);
    }
    for (int i = 0; i < WEIGHTS.length; i++) {
      int rand = (int) (Math.random() * remainingIndex.size());
      int index = remainingIndex.get(rand);
      TODAY_WEIGHTS[index] = WEIGHTS[i];
      remainingIndex.remove(rand);
    }
    // System.out.println(Arrays.toString(TODAY_WEIGHTS));
  }

  public static Muffin getMuffinOrder() {
    String popularMuff = "";
    List<String> mediumMuff = new ArrayList<>();
    List<String> leastMuff = new ArrayList<>();

    for (int i = 0; i < TODAY_WEIGHTS.length; i++) {
      switch (TODAY_WEIGHTS[i]) {
      case 3:
        popularMuff = MUFFIN_TYPES[i];
        break;
      case 2:
        mediumMuff.add(MUFFIN_TYPES[i]);
        break;
      default:
        leastMuff.add(MUFFIN_TYPES[i]);
      }
    }
    int rand = (int) (Math.random() * 10);
    String type;
    switch (rand) {
    case 0:
    case 1:
    case 2:
      type = popularMuff;
      break;
    case 3:
    case 4:
      type = mediumMuff.get(0);
      break;
    case 5:
    case 6:
      type = mediumMuff.get(1);
      break;
    case 7:
      type = leastMuff.get(0);
      break;
    case 8:
      type = leastMuff.get(1);
      break;
    default:
      type = leastMuff.get(2);
      break;
    }
    return new Muffin(type);
  }

}
