//author: srw

function showFinanaces() {

	var postParameters = {}

    $.post("/finanaces", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        profits = responseObject.profits;

        //parse profits (list of profits in some order) and
        //show on screen
    }
}

function getCustomer() {

	var postParameters = {}

    $.post("/customer", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var newCust = responseObject.customer;

        //store customer is customer queue when necessary
    }

}

function buy(station) {

	var postParameters = {name: station};

    $.post("/newstation", postParameters, function(responseJSON){}

}

function hire(worker) {

	var postParameters = {employee: worker};

    $.post("/newemployee", postParameters, function(responseJSON){}

}

function endDay() {

	var postParameters = {}

    $.post("/endday", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var dailyProfits = responseObject.dailyProfits;
        var totalProfits = responseObject.totalProfits;

        //show these profits on the screen

}

function employeeSandwich(employee, order, happiness) {

	var postParameters = {employee: employee, order: order, happiness: happiness};

    $.post("/employee", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        var moneyMade = responseObject.moneyMade;

        //have the money that was made appear on screen and increment lower left money counter

}

function purchase() {

	var postParameters = {}

    $.post("/customer", postParameters, function(responseJSON){

        responseObject = JSON.parse(responseJSON);
        newCust = responseObject.customer;

}