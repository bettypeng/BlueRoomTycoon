//author: srw

function getFinanaces() {

	var postParameters = {}

    $.post("/finanaces", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var profits = responseObject.profits;

        showFinances(profits);

        //parse profits (list of profits in some order) and
        //show on screen
    });
}

window.setTimeout(getCustomer, 1000);
var customer;

function getCustomer() {

	var postParameters = {}

    $.post("/customer", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var newCust = responseObject.customer;
        customer = newCust;

        var order = newCust.order;
        console.log(order);

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

function getFrontCustomer() {
    var postParameters = {};

    $.post("/line", postParameters, function(responseJSON) {

        responseObject = JSON.parse(responseJSON);
        var frontCust = responseObject.customer;

        //can get the order from this customer using frontCust.order which we can
        //then display on the screen
    });
}

function buy(station) {

	var postParameters = {name: station};

    $.post("/newstation", postParameters, function(responseJSON){});

}

function hire(worker) {

	var postParameters = {employee: worker};

    $.post("/newemployee", postParameters, function(responseJSON){});

}

function endDay() {

	var postParameters = {}

    $.post("/endday", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var dailyProfits = responseObject.dailyProfits;
        var totalProfits = responseObject.totalProfits;

        //show these profits on the screen
    });

}

function employeePurchase(type, employee, customer) {

	var postParameters = {employee: employee, type: type, customer: customer};

    $.post("/employee", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        //have the money that was made appear on screen and increment lower left money counter
    });

}


window.setTimeout(purchase, 5000);


function purchase() {
    //bread will be null if the type is not sandwich
    var type = "sandwich";
    var ingredients = ["tomato", "mustard", "ham"];
    var ingMap = {tomato: 0.1, mustard: 0.1, ham: 0.1};
    var bread = "ciabatta";


    var cust = JSON.stringify(customer);
	var postParameters = {type: type, ingredients: ingredients, map: ingMap, customer: cust, bread: bread};
    console.log(postParameters["customer"]);

    $.post("/purchase", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        //have money that was made appear on screen and increment lower left money counter

    });

}