package edu.brown.cs.bse.BlueRoom;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import spark.ExceptionHandler;
import spark.ModelAndView;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;
import spark.TemplateViewRoute;
import spark.template.freemarker.FreeMarkerEngine;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;

import edu.brown.cs.bse.elements.Bread;
import edu.brown.cs.bse.elements.Customer;
import edu.brown.cs.bse.elements.Employee;
import edu.brown.cs.bse.elements.FoodItem;
import edu.brown.cs.bse.elements.Sandwich;
import edu.brown.cs.bse.elements.SandwichIngredient;
import freemarker.template.Configuration;

/**
 * Models the server that allows the user to interact with the gui. Sets up
 * and interacts with what the user inputs using several private classes.
 * @author srw
 *
 */
public class Server {

  private final static Gson GSON = new Gson();
  private final static int EXCEPTION_NUM = 500;
  private GameManager gameManager;
  /**
   * Constructor for Server. Starts the spark server and stores the command
   * processor to be user later.
   * @param cp Command Processor to user to parse user commands
   */
  public Server(GameManager gm) {
    gameManager = gm;
    runSparkServer();
  }

  private static FreeMarkerEngine createEngine() {
    Configuration config = new Configuration();
    File templates = new File("src/main/resources/spark/template/freemarker");
    try {
      config.setDirectoryForTemplateLoading(templates);
    } catch (IOException ioe) {
      System.out.printf("ERROR: Unable use %s for template loading.\n",
          templates);
      System.exit(1);
    }
    return new FreeMarkerEngine(config);
  }

  /**
   * Starts the Spark server which will allow the user to interact
   * with the gui.
   */
  private void runSparkServer() {
    Spark.externalStaticFileLocation("src/main/resources/static");
    Spark.exception(Exception.class, new ExceptionPrinter());

    FreeMarkerEngine freeMarker = createEngine();

    // Setup Spark Routes
    Spark.get("/blueroom", new FrontHandler(), freeMarker);
    Spark.post("/purchase", new PurchaseHandler());
    Spark.post("/finance", new FinanceHandler());
    Spark.post("/endday", new EndDayHandler());
    Spark.post("/customer", new CustomerHandler());
    Spark.post("/newemployee", new NewEmployeeHandler());
    Spark.post("/employee", new EmployeeHandler());
    Spark.post("/newstation", new NewStationHandler());
    Spark.post("/line", new LineHandler());

  }

  /**
   * Displays the initial gui that the user can interact with.
   * @author srw
   *
   */
  private class FrontHandler implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
      Map<String, Object> variables =
          ImmutableMap.of("title", "Blue Room Tycoon");
      return new ModelAndView(variables, "index.html");
    }
  }

  /**
   * Triggered when a purchase is made in the front end - returns the details
   * of the purchase through this handler
   * @author srw
   *
   */
  private class PurchaseHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();
      System.out.println("purchasing");

      //this is the order that was made to compare the actual received item to
      String id = qm.value("id");
      System.out.println(id);
//      System.out.println(qm.value("customer"));
//      try {
//        System.out.println(GSON.fromJson(qm.value("customer"), Customer.class));
//        customer = GSON.fromJson(qm.value("customer"), Customer.class);
//      } catch (Exception e) {
//        e.printStackTrace();
//      }
//      System.out.println("got customer");
//      System.out.println(customer);
//
      String type = qm.value("type");
//      System.out.println(type);
//
      System.out.println(qm.value("ingredients"));
//      System.out.println(qm.value("map"));

      List<String> ingredients = GSON.fromJson(qm.value("ingredients"), List.class);

      System.out.println(ingredients.get(0));

    //recieves what makes up the purchase in the form of a map which maps
      //each part of the purchase to how far it was from the center (sandwiches)
      //how far from well cooked it is (bakery good)
      Map<String, Double> ingMap = GSON.fromJson(qm.value("map"), Map.class);

      System.out.println(ingMap.get("tomato"));

      FoodItem purchase;

      //handling if the type is sandwich
      if (type.equals("sandwich")) {
        List<SandwichIngredient> sWichIng = new ArrayList<>();
        Map<SandwichIngredient, Double> sWichMap = new HashMap<>();

        for (Entry<String, Double> e: ingMap.entrySet()) {
          String itemName = e.getKey();
          System.out.println(itemName);
          Double val = e.getValue();
          SandwichIngredient ing = new SandwichIngredient(itemName);
          sWichIng.add(ing);
          sWichMap.put(ing, val);
        }
        String bread = qm.value("bread");

        Bread b = new Bread(bread);
        //get the bread out of this and do something with it
        purchase = new Sandwich(sWichIng, sWichMap, b);
      } else {
        purchase = null;
        System.out.println("Not a sandwich - no other foods implemented yet");
      }
      Customer customer = gameManager.getCustomer(id);

      // SHANNON: make sure you set the customer's happiness to the right level before passing in
      // or maybe the javascript side will have already given the right happiness?
      Double moneyMade = gameManager.purchase(purchase, customer);


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("moneyMade", moneyMade).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered when user requests finance information (clicks on cashier or
   * money count on lower left of screen)
   * @author srw
   *
   */
  private class FinanceHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();

      List<Double> profits = gameManager.getDailyProfits();


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("profits", profits).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered at the end of the day in the game - returns to the front end
   * the profits of the day and for the total game-play so far
   * @author srw
   *
   */
  private class EndDayHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();

      List<Double> dailyProfits = gameManager.getDailyProfits();
      List<Double> totalProfits = gameManager.getTotalProfits();


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("dailyProfits", dailyProfits)
          .put("totalProfits", totalProfits).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered on interval from front end to generate a customer with a unique
   * order
   * @author srw
   *
   */
  private class CustomerHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      Customer newCust = gameManager.newCustomer();
      System.out.println("sending up customer");

      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("customer", newCust).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered in upgrade screen when user wants to add a new employee, stores
   * knowledge of this employee in backend
   * @author srw
   *
   */
  private class NewEmployeeHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();

      //this can be if we ever want different employees to have different traits
//      String employeeName = qm.value("employee");

      //sends the knowledge of the new employee to the game manager
      gameManager.addEmployee();

      List<String> results = new ArrayList<>();


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("results", results).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered when new customer gets to front of line
   * @author srw
   *
   */
  private class LineHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();

      //this can be if we ever want different employees to have different traits
//      String employeeName = qm.value("employee");

      //sends the knowledge of the new employee to the game manager
      Customer front = gameManager.getFrontCustomer();

      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("customer", front).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered when a sandwich is made by just an employee, no user interaction
   * @author srw
   *
   */
  private class EmployeeHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();
      //GSON.fromJson(value, String.class)

      Employee employee = GSON.fromJson(qm.value("employee"), Employee.class);

      Customer customer = GSON.fromJson(qm.value("customer"), Customer.class);

      String type = qm.value("type");

      FoodItem fi;

      if (type.equals("sandwich")) {
        fi = new Sandwich(employee, (Sandwich)customer.getOrder());
      } else {
        fi = null;
        System.out.println("Nothing other than sandwiches should be ordered");
      }

      Double moneyMade = gameManager.purchase(fi, customer);


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("moneyMade", moneyMade).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered when user buys a new station
   * @author srw
   *
   */
  private class NewStationHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {
      QueryParamsMap qm = req.queryMap();

      String stationName = qm.value("name");

      gameManager.addStation(stationName);

      List<String> results = new ArrayList<>();

      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("results", results).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Handle's printing exceptions.
   * @author srw
   *
   */
  private static class ExceptionPrinter implements ExceptionHandler {
    @Override
    public void handle(Exception e, Request req, Response res) {
      res.status(EXCEPTION_NUM);
      StringWriter stacktrace = new StringWriter();
      try (PrintWriter pw = new PrintWriter(stacktrace)) {
        pw.println("<pre>");
        e.printStackTrace(pw);
        pw.println("</pre>");
      }
      res.body(stacktrace.toString());
    }
  }

}
