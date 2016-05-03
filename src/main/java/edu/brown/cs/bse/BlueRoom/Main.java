package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import joptsimple.OptionException;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import edu.brown.cs.bse.elements.Bread;
import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.Sandwich;
import edu.brown.cs.bse.elements.SandwichIngredient;

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
    OrderFactory.setMuffinWeights();

    if (options.has("gui")) {
      System.out.println("run spark server");
      new Server(manager);
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
            System.out.println("Type 'sandwich', 'drink', or 'bakery' to choose your order type");
            line = reader.readLine();
            switch(line) {
            case "sandwich":
              System.out.println(OrderFactory.getSandwichOrder());
              break;
            case "drink":
              System.out.println(OrderFactory.getDrinkOrder());
              break;
            case "bakery":
              System.out.println(OrderFactory.getMuffinOrder());
              break;
            default:
              System.out.println("not a valid order type");
              break;
            }
            break;

          case "p":
            Sandwich sand = OrderFactory.getSandwichOrder();
            Customer customer = new Customer("randomid", sand, "sandwich");
            customer.setHappiness(Math.random());
            System.out.println(manager.purchase(sand, customer));
            break;
            
          case "d":
            System.out.println(manager.getDailyProfits());
            break;
            
          case "m":
            System.out.println(String.format("%.2f", manager.getCurrentMoney()));
            break;
           
          case "e":
            Customer newCust = new Customer("c1", OrderFactory.getSandwichOrder(), "sandwich");
            newCust.setHappiness(Math.random());
            Employee emp = new Employee("alex");
            double quality = emp.fillOrder();
            System.out.println(manager.purchase(quality, newCust));
            break;

          default:
//            List<SandwichIngredient> testList = Arrays.asList(new SandwichIngredient("turkey"), new SandwichIngredient("cheese"));
//            Sandwich original = new Sandwich(testList, new Bread("ciabatta"));
//            Map<SandwichIngredient, Double> del = new HashMap<>();
//            del.put(new SandwichIngredient("turkey"), 0.2);
//            del.put(new SandwichIngredient("cheese"), 0.1);
//            List<SandwichIngredient> list = Arrays.asList(new SandwichIngredient("turkey"), new SandwichIngredient("cheese"));
//            Sandwich test = new Sandwich(list, del, new Bread("ciabatta"));
//            System.out.println(test.compareToOrder(original));
            System.out.println("not a valid input, please try again");
            break;
          }

        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}