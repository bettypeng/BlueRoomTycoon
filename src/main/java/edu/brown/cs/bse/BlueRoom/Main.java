package edu.brown.cs.bse.BlueRoom;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

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
      System.out.println("run spark server");
    } else {
      
      try (BufferedReader reader = new BufferedReader(
          new InputStreamReader(System.in, StandardCharsets.UTF_8))) {
        while (reader.readLine() != null) {
          System.out.println(manager.newCustomer());
        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}