package edu.brown.cs.bse.BlueRoom;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
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
    
    Spark.setPort(6789);

    // Setup Spark Routes
    Spark.get("/blueroom", new FrontHandler(), freeMarker);
    Spark.post("/purchase", new PurchaseHandler());
    Spark.post("/enddaystats", new EndDayStatsHandler());
    Spark.post("/enddayscreen", new EndDayScreenHandler());
    Spark.post("/customer", new CustomerHandler());
    Spark.post("/newemployee", new NewEmployeeHandler());
    Spark.post("/employee", new EmployeeHandler());
    Spark.post("/newstation", new NewStationHandler());
    Spark.post("/interval", new IntervalHandler());
    Spark.post("/trash", new TrashHandler());
    Spark.post("/leave", new LeaveHandler());
    Spark.post("/save",  new SaveHandler());
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
      return new ModelAndView(variables, "index.ftl");
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

      String id = qm.value("id");
      //System.out.println(id);

      String type = qm.value("type");
      double happiness = Double.parseDouble(qm.value("happiness"));

      System.out.println("sandwich made: " + qm.value("ingredients"));

      FoodItem purchase;

      List<String> lingredients = GSON.fromJson(qm.value("ingredients"), List.class);
      
      boolean paid = Boolean.parseBoolean(qm.value("paid"));

      Bread b = null;
      //recieves what makes up the purchase in the form of a map which maps
      //each part of the purchase to how far it was from the center (sandwiches)
      //how far from well cooked it is (bakery good)
      Map<String, Double> ingMap = GSON.fromJson(qm.value("map"), Map.class);

      //handling if the type is sandwich
      if (type.equals("sandwich")) {
        List<SandwichIngredient> sWichIng = new ArrayList<>();
        Map<SandwichIngredient, Double> sWichMap = new HashMap<>();

        for (Entry<String, Double> e: ingMap.entrySet()) {
          int index = Integer.parseInt(e.getKey());
          Double val = e.getValue();
          if (lingredients.get(index).equals("top_bun") || lingredients.get(index).equals("bottom_bun")) {
            continue;
          }
          SandwichIngredient ing = new SandwichIngredient(lingredients.get(index));
          sWichMap.put(ing, val);
        }
        for (String s : lingredients) {
          if (s.equals("top_bun") || s.equals("bottom_bun")) {
            continue;
          }
          sWichIng.add(new SandwichIngredient(s));
        }
        String bread = qm.value("bread");

        b = new Bread(bread);
        //get the bread out of this and do something with it
        purchase = new Sandwich(sWichIng, sWichMap, b);
        System.out.println("parsed purchase: " + purchase);

      } else {
        purchase = null;
        System.out.println("Not a sandwich - no other foods implemented yet");
      }

      Customer customer = gameManager.getCustomer(id);
      System.out.println("ordered: " + customer.getOrder());

      customer.setHappiness(happiness);
      //System.out.println(customer.getHappiness());
      double moneyMade;
      if (paid) {
        moneyMade = gameManager.purchase(purchase, customer);
      } else {
        moneyMade = gameManager.steal(purchase, customer);
      }
      System.out.println("total money made: " + moneyMade);

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
  private class EndDayScreenHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {

      DayData dailyInfo = gameManager.endDay();
      //List<DayData> dataOverTime = gameManager.getTotalStats();
      List<DayData> dataOverTime = Collections.emptyList();
      GameData totalInfo = gameManager.getGameData();


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("dailyInfo", dailyInfo)
          .put("dataOverTime", dataOverTime)
          .put("totalInfo", totalInfo).build();

      return GSON.toJson(variables);
    }
  }

  /**
   * Triggered at the end of the day in the game - returns to the front end
   * the profits of the day and for the total game-play so far
   * @author srw
   *
   */
  private class EndDayStatsHandler implements Route {
    @Override
    public Object handle(final Request req, final Response res) {

      DayData dailyInfo = gameManager.getDayData();

      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("dailyInfo", dailyInfo).build();

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

      System.out.println(newCust.getOrder());

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
      Map<String, Object> variables = null;
//      try {
      QueryParamsMap qm = req.queryMap();

      //this can be if we ever want different employees to have different traits
      String employeeName = qm.value("employee");

      //sends the knowledge of the new employee to the game manager
      gameManager.hireEmployee(employeeName);

      List<String> results = new ArrayList<>();

      variables = new ImmutableMap.Builder<String, Object>()
          .put("results", results).build();
      
//      } catch(Exception e) {
//        e.printStackTrace();
//      }

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

      Employee employee = gameManager.getEmployee(qm.value("employee"));

      Customer customer = gameManager.getCustomer(qm.value("customer"));
      
      double energy = Double.parseDouble(qm.value("energy"));
      double happiness = Double.parseDouble(qm.value("happiness"));
      
      employee.setEnergy(energy);
      customer.setHappiness(happiness);
      
      double quality = 0;

      if (customer.getStation().equals("sandwich")) {
        quality = employee.fillOrder();
      } else {
        System.out.println("Nothing other than sandwiches should be ordered");
      }

      Double moneyMade = gameManager.purchase(quality, customer);

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

  private class IntervalHandler implements Route {

    @Override
    public Object handle(Request req, Response res) {
      gameManager.incrCurrTime();
      double interval = gameManager.calculateCustomerInterval();
      Map<String, Double> employeeIntMap = gameManager.calculateEmployeeIntervals();
      Map<String, Object> variables = ImmutableMap.of("customerInt", interval, "employeeInts", employeeIntMap);
      return GSON.toJson(variables);
    }
  }
  
  private class TrashHandler implements Route {
    
    @Override
    public Object handle(Request req, Response res) {
      QueryParamsMap qm = req.queryMap();
      int numTrashed = Integer.parseInt(qm.value("numTrashed"));
      double moneyLost = gameManager.trash(numTrashed);
      
      Map<String, Object> variables = ImmutableMap.of("moneyLost", moneyLost);
      return GSON.toJson(variables);
    }
  }
  
  private class LeaveHandler implements Route {
    
    @Override
    public Object handle(Request req, Response res) {
      
      gameManager.leave();
      
      List<String> results = new ArrayList<>();
      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("results", results).build();
      return GSON.toJson(variables);
    }
  }
  
  private class SaveHandler implements Route {
    
    @Override
    public Object handle(Request req, Response res) {
      QueryParamsMap qm = req.queryMap();
      String filename = qm.value("file");
      gameManager.saveGame(filename);
      
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
