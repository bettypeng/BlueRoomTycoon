function getFinanaces() {
    
	var postParameters = {}
    
    $.post("/finanaces", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var profits = responseObject.profits;
    
        showFinances(profits);
    
            //parse profits (list of profits in some order) and
            //show on screen
    });
}

function getCustomer(game) {
    // if (numSandwich <= 0) {
    //     return;
    // }
	var postParameters = {}
    
    $.post("/customer", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var newCust = responseObject.customer;
        
        var cust = new Customer(newCust.id, newCust.station, newCust.order);
        
        BlueRoom.Game.prototype.newCustomerReturned(cust);
    
        //from order:
        //order.ingreds = list of ingredients - for each one do ing.type to get name of ingredient
        //order.deltas = won't need this, will be sent once we send it back
        //order.bread = can use bread.type to get name of bread
    
        // newCustomer(newCust);
        //in order to get the customer's order just do: newCust.order
        //the order will be a fooditem which you can get things from using
        //a similar method
    
        //store customer is customer queue when necessary
    });
    
} 

//possibly only call this on string of lost customers
function leaveHandler (station) {
    var postParameters = {station: station};

    $.post("/leave", postParameters, function(responseJSON) {});

}

function buy (station) {
    
	var postParameters = {name: station};
    
    $.post("/newstation", postParameters, function(responseJSON){});
    
}
    
function hire(employee) {
    
    var postParameters = {employee: employee};
    
    $.post("/newemployee", postParameters, function(responseJSON){});
    
}

function endDayStats() {

    var postParameters = {}
    
    $.post("/enddaystats", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var dailyInfo = responseObject.dailyInfo;

        game.createDayEndAlert(dailyInfo);
    
        //show these profits on the screen
    });

}
    
function endDayScreen() {
    
    var postParameters = {}
    
    $.post("/enddayscreen", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var dailyInfo = responseObject.dailyInfo;
        var totalInfo = responseObject.totalInfo;

        game.hideDayEndAlert();
        game.createDayEndView(dailyInfo, totalInfo);
    
        //show these profits on the screen
    });
    
}
    
function employeePurchase (employee, customer, happiness, paid) {

    var payment = JSON.stringify(paid);
    var happ = JSON.stringify(happiness);
    
	var postParameters = {employee: employee, customer: customer, happiness: happ, paid: payment};
    
    $.post("/employee", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        if (paid){
            //BlueRoom.Game.prototype.addMoney(moneyMade);
            game.addMoney(500, 530, "+ $"+moneyMade.toFixed(2), moneyMade);
        }
        else{
            game.loseMoney(500, 530, "- $"+moneyMade.toFixed(2), moneyMade);
        }
    
        //have the money that was made appear on screen and increment lower left money counter
    });
    
}

function trashHandler (type, numTrashed) {
    if (numTrashed == 0) {
        return;
    }

    var  postParameters = {type: type, numTrashed: numTrashed};

    $.post("/trash", postParameters, function(responseJSON) {

        var responseObject = JSON.parse(responseJSON);
        var moneyLost = responseObject.moneyLost;

        game.loseMoney(500, 530, "- $"+moneyLost.toFixed(2), moneyLost);
    });

}
    
function sandwichPurchase (ingredients, ingMap, bread, id, happiness, paid) {
    //bread will be null if the type is not sandwich
    
    
    // var id = customer.id;
    var ing = JSON.stringify(ingredients);
    var iMap = JSON.stringify(ingMap);
    var happ = JSON.stringify(happiness);
    var payment = JSON.stringify(paid);
	var postParameters = {ingredients: ing, map: iMap, id: id, bread: bread, happiness: happ, paid: payment};
    
    $.post("/sandwich", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        if (paid){
            //BlueRoom.Game.prototype.addMoney(moneyMade);
            game.addMoney(500, 530, "+ $"+moneyMade.toFixed(2), moneyMade);
        }
        else{
            game.loseMoney(500, 530, "- $"+moneyMade.toFixed(2), moneyMade);
        }
        //have money that was made appear on screen and increment lower left money counter
    
    });
    
}

function bakeryPurchase (type, id, happiness, paid) {
    //bread will be null if the type is not sandwich
    
    
    // var id = customer.id;
    var payment = JSON.stringify(paid);
    var postParameters = {type: type, id: id, happiness: happiness, paid: payment};
    
    $.post("/bakery", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        if (paid){
            //BlueRoom.Game.prototype.addMoney(moneyMade);
            game.addMoney(500, 530, "+ $"+moneyMade.toFixed(2), moneyMade);
        }
        else{
            game.loseMoney(500, 530, "- $"+moneyMade.toFixed(2), moneyMade);
        }
        //have money that was made appear on screen and increment lower left money counter
    
    });
    
}

function coffeePurchase (type, iced, size, flavor, id, happiness, paid) {
    //bread will be null if the type is not sandwich
    
    
    // var id = customer.id;
    var ice = JSON.stringify(iced);
    var payment = JSON.stringify(paid);
    var postParameters = {type: type, iced: iced, size: size, flavor: flavor, id: id, happiness: happiness, paid: payment};
    
    $.post("/coffee", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        if (paid){
            //BlueRoom.Game.prototype.addMoney(moneyMade);
            game.addMoney(500, 530, "+ $"+moneyMade.toFixed(2), moneyMade);
        }
        else{
            game.loseMoney(500, 530, "- $"+moneyMade.toFixed(2), moneyMade);
        }
        //have money that was made appear on screen and increment lower left money counter
    
    });
    
}

// window.setInterval()

function updateCustomerInterval() {
    
    $.post("/interval", function(responseJSON) {

        var responseObject = JSON.parse(responseJSON);
        CUSTOMERINTERVAL = responseObject.customerInt;
        // var employeeInts = responseObject.employeeInts;
    });
}

function getEmployeeInterval(stationName, atStation, makingProduct, line, employee) {
    var employeeName = employee.name;
    var employeeEnergy = employee.workHoursProgress/30;

    // console.log(employeeEnergy);

    var empE = JSON.stringify(employeeEnergy);

    var postParameters = {name: employeeName, energy: empE};

    $.post("/employeeInterval", postParameters, function(responseJSON) {

        var responseObject = JSON.parse(responseJSON);

        var employeeInt = responseObject.employeeInt;
        console.log("EMPLOYEE INTERVAL: "+employeeInt);
        
        BlueRoom.Game.prototype.employeeMakeProduct(stationName, atStation, makingProduct, line, employee, employeeInt);
    });


}

function saveGame() {
    var filename = "game1";
	var postParameters = { file: filename };
	
	$.post("/save", postParameters, function(responseJSON) {});
}

function loadGame(filename) {
    filename = "game1";
    var postParameters = { file: filename };
    
<<<<<<< HEAD
    $.post("/save", postParameters, function(responseJSON) {
		var responseObject = JSON.parse(responseJSON);
		var stations = responseObject.stations;
		for (var i = 0; i < stations.length; i++) {
			var station = stations[i];
			// do something to add the station to the front end
		}
		var employees = responseObject.employees;
		for (var i = 0; i < employees.length; i++) {
			// add each employee
		}
		var balance = responseObject.money;
		// check if this is actually a valid way to change the money
		statusBar.money = balance;
=======
    $.post("/load", postParameters, function(responseJSON) {

>>>>>>> 895ba887bfc9253d4325cbd54321637348a62763
    });
}