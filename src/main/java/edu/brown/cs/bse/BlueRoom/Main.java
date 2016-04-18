package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.brown.cs.bse.elements.Bread;
import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.Sandwich;
import edu.brown.cs.bse.elements.SandwichIngredient;
import joptsimple.OptionException;
import joptsimple.OptionParser;
import joptsimple.OptionSet;

public class Main {
  
  public static void main(String[] args) {
    new Main(args).run();
  }
  
  private String[] args;
  
  private Main(String[] args) {
    this.args = args;
  }
  
  private void run() {
    
    OptionParser parser = new OptionParser();
    parser.accepts("gui");
    OptionSet options;
    try {
      options = parser.parse(args);
    } catch (OptionException e) {
      System.out.println("ERROR: Usage: ./run [--gui]");
      return;
    }
    
    GameManager manager = new GameManager();
    
    if (options.has("gui")) {
      new Server();
    } else {
      
      try (BufferedReader reader = new BufferedReader(
          new InputStreamReader(System.in, StandardCharsets.UTF_8))) {
        String line;
        while ((line = reader.readLine()) != null) {
          if (line.equals("")) {
            break;
          }
          switch(line) {
          
          case "c":
            System.out.println(manager.newCustomer());
            break;
            
          case "o":
            System.out.println(OrderFactory.getSandwichOrder());
            break;
            
          case "p":
            Sandwich sand = OrderFactory.getSandwichOrder();
            Customer customer = new Customer(sand, "sandwich");
            customer.setHappiness(Math.random());
            System.out.println(manager.purchase(OrderFactory.getSandwichOrder(), customer));
            break;
            
          default:
            List<SandwichIngredient> testList = Arrays.asList(new SandwichIngredient("turkey"), new SandwichIngredient("cheese"));
            Sandwich original = new Sandwich(testList, new Bread("ciabatta"));
            Map<SandwichIngredient, Double> del = new HashMap<>();
            del.put(new SandwichIngredient("turkey"), 0.2);
            del.put(new SandwichIngredient("cheese"), 0.1);
            List<SandwichIngredient> list = Arrays.asList(new SandwichIngredient("turkey"), new SandwichIngredient("cheese"));
            Sandwich test = new Sandwich(list, del, new Bread("ciabatta"));
            test.compareToOrder(original);
            break;
          }
          
        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}