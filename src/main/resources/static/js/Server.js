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
function leaveHandler () {
    var postParameters = {};

    $.post("/leave", postParameters, function(responseJSON) {});

}
    
// function getFrontCustomer(station) {
        
//     var postParameters = {type: station};
    
//     $.post("/line", postParameters, function(responseJSON) {
    
//         var responseObject = JSON.parse(responseJSON);
//         var frontCust = responseObject.customer;
        
//         if (frontCust.order.type == "sandwich") {
            
//         }
    
//         //can get the order from this customer using frontCust.order which we can
//         //then display on the screen
            
//         //call showing of first item on screen
//         //if station == sandwich: call sanwich view's method for showing
//         //thing
//     });
// }
    
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
    
function employeePurchase (employee, customer, workHoursProgress, happiness) {
    
	var postParameters = {employee: employee, customer: customer, energy: workHoursProgress, happiness: happiness};
    
    $.post("/employee", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;
    
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
    
function purchase (type, ingredients, ingMap, bread, id, happiness, paid) {
    //bread will be null if the type is not sandwich
    
    
    // var id = customer.id;
    var ing = JSON.stringify(ingredients);
    var iMap = JSON.stringify(ingMap);
    var happ = JSON.stringify(happiness);
    var payment = JSON.stringify(paid);
	var postParameters = {type: type, ingredients: ing, map: iMap, id: id, bread: bread, happiness: happ, paid: payment};
    
    $.post("/purchase", postParameters, function(responseJSON){
    
        var responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        console.log(moneyMade);
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

function updateIntervals() {
    
    $.post("/interval", function(responseJSON) {

        var responseObject = JSON.parse(responseJSON);
        var customerInterval = responseObject.customerInt;
        var employeeInts = responseObject.employeeInts;
    });
}