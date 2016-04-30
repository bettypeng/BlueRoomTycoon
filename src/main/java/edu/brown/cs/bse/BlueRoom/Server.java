package edu.brown.cs.bse.BlueRoom;


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
//    Spark.post("/finance", new FinanceHandler());
//    Spark.post("/endday", new EndDayHandler());
    Spark.post("/customer", new CustomerHandler());
    //Spark.post("/newemployee", new NewEmployeeHandler());
    Spark.post("/employee", new EmployeeHandler());
    Spark.post("/newstation", new NewStationHandler());
    Spark.post("/line", new LineHandler());
    Spark.post("/interval", new IntervalHandler());

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

      //this is the order that was made to compare the actual received item to
      String id = qm.value("id");
      System.out.println(id);

      String type = qm.value("type");
      double happiness = Double.parseDouble(qm.value("happiness"));

      System.out.println(qm.value("ingredients"));

      List<String> lingredients = GSON.fromJson(qm.value("ingredients"), List.class);
//      lingredients = lingredients.subList(1, lingredients.size()-1);

      Bread b = null;
    //recieves what makes up the purchase in the form of a map which maps
      //each part of the purchase to how far it was from the center (sandwiches)
      //how far from well cooked it is (bakery good)
      Map<Integer, Double> ingMap = GSON.fromJson(qm.value("map"), Map.class);
//      ingMap.remove("top_bun");
//      ingMap.remove("bottom_bun");

      FoodItem purchase;

      //handling if the type is sandwich
      if (type.equals("sandwich")) {
        List<SandwichIngredient> sWichIng = new ArrayList<>();
        Map<SandwichIngredient, Double> sWichMap = new HashMap<>();

        for (Entry<Integer, Double> e: ingMap.entrySet()) {
          int index = e.getKey();
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

      } else {
        purchase = null;
        System.out.println("Not a sandwich - no other foods implemented yet");
      }
      Customer customer = gameManager.getCustomer(id);

//      Sandwich oldOrder = (Sandwich) customer.getOrder();

//      List<SandwichIngredient> old = oldOrder.getIngredients();
//      List<SandwichIngredient> updated = new ArrayList<>(old);
//      updated.remove(0);
//      updated.remove(updated.size() - 1);
//      Sandwich newSandwich = new Sandwich(updated, b);
//      customer.setOrder(newSandwich);
//      System.out.println(customer.getOrder());

      // SHANNON: make sure you set the customer's happiness to the right level before passing in
      // or maybe the javascript side will have already given the right happiness?
      customer.setHappiness(happiness);
      System.out.println(customer.getHappiness());
      double moneyMade = gameManager.purchase(purchase, customer);

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
//  private class FinanceHandler implements Route {
//    @Override
//    public Object handle(final Request req, final Response res) {
//      QueryParamsMap qm = req.queryMap();
//
//      List<Double> profits = gameManager.getDailyProfits();
//
//
//      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
//          .put("profits", profits).build();
//
//      return GSON.toJson(variables);
//    }
//  }

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

      DayData dailyInfo = gameManager.endDay();
      List<Double> totalProfits = gameManager.getTotalProfits();


      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
          .put("dailyProfits", dailyInfo)
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
//  private class NewEmployeeHandler implements Route {
//    @Override
//    public Object handle(final Request req, final Response res) {
//      QueryParamsMap qm = req.queryMap();
//
//      //this can be if we ever want different employees to have different traits
////      String employeeName = qm.value("employee");
//
//      //sends the knowledge of the new employee to the game manager
//      gameManager.addEmployee();
//
//      List<String> results = new ArrayList<>();
//
//
//      Map<String, Object> variables = new ImmutableMap.Builder<String, Object>()
//          .put("results", results).build();
//
//      return GSON.toJson(variables);
//    }
//  }

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

  private class IntervalHandler implements Route {

    @Override
    public Object handle(Request req, Response res) {
      gameManager.incrCurrTime();
      double interval = gameManager.calculateCustomerInterval();
      Map<String, Object> variables = ImmutableMap.of("interval", interval);
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
