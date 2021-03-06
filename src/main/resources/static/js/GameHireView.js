var hireViewElements = new Array();
var NUMBEROFHIRES = 3;
var currentlyDisplayedHire = 0;
var hireList = ["erik", "alex", "rachel"];
var HIRECOST = 100;
var EMPLOYEEWAGE = 20;
var hireMeButton;

BlueRoom.Game.prototype.createHireView= function () {
	this.disableDayEndButtons();
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	hireViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideHireView, this);
	hireViewElements.push(backButton);

    var titleStyle = { font: "70px Roboto", fill: "#ffffff", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'HIRE EMPLOYEES', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	var labelStyle = { font: "16px Roboto-Light", fill: "#000000", align: "center"};
	var currbalance = this.game.add.text(this.game.width/2, 140, 'Current Balance: $' + statusBar.money.toFixed(2), labelStyle);
	currbalance.anchor.setTo(0.5, 0,5);

	var cost = this.game.add.text(this.game.width/3, 480, "Hire Cost: $" +HIRECOST, labelStyle);
	cost.anchor.setTo(0.5, 0,5);

	var wages = this.game.add.text(2* this.game.width/3, 480, "Daily Wages: $" +EMPLOYEEWAGE + " / day", labelStyle);
	wages.anchor.setTo(0.5, 0,5);

	hireMeButton = this.add.button(this.game.width/2, 510, 'hireMeButton', this.hireNewEmployee, this);
	hireMeButton.anchor.setTo(0.5, 0,5);
	this.checkHireButton(hireMeButton);


	hireViewElements.push(title);
	hireViewElements.push(currbalance);
	hireViewElements.push(cost);
	hireViewElements.push(wages);
	hireViewElements.push(hireMeButton);

	var hireboxX = this.game.width/2;
	var hireboxY = 325;

	// var hireList = new Array();
	// var e1 = this.add.sprite(this.game.width/2, 325, 'e3');
	// e1.anchor.setTo(0.5, 0.5)
	// hireViewElements.push(e1);

	this.hireA = game.add.sprite(hireboxX, hireboxY, hireList[0]);
    this.hireA.anchor.setTo(0.5, 0.5);
    currentlyDisplayedHire = 0;

    this.hireB = game.add.sprite(hireboxX, hireboxY, hireList[0]);
    this.hireB.anchor.setTo(0.5, 0.5);
    this.hireB.alpha = 0;

    hireViewElements.push(this.hireA);
    hireViewElements.push(this.hireB);


	var prev = this.add.button(230, 275, 'prev', this.fadeHireBackward, this);
	prev.anchor.setTo(0.5, 0,5);
	hireViewElements.push(prev);
	var next = this.add.button(825, 275, 'next', this.fadeHireForward, this);
	next.anchor.setTo(0.5, 0,5);
	hireViewElements.push(next);
 

	// var starList = new Array();
	// var stars = ['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar'];

	// for (var i = 0; i < 5; i++){
		// var st = this.add.sprite(0, 0, stars[i]);
		// hireViewElements.push(st);
	// 	starList.push(st);
	// }
	
	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};

BlueRoom.Game.prototype.checkHireButton = function(currButton){
	console.log("checking button");

	if(Number(statusBar.money) <= Number(HIRECOST) || NUMBEROFSTATIONS<=NUMBEROFEMPLOYEES || hireList.length <= 0){
		this.disableButton(currButton);
	}
	else{
		this.enableButton(currButton);
	}
};

BlueRoom.Game.prototype.updateCurrHire = function(){
	console.log("updating curent hire");
	this.checkHireButton(hireMeButton);
};

BlueRoom.Game.prototype.hireNewEmployee = function(){
	console.log("Hiring: " + hireList[currentlyDisplayedHire]);

	hire(hireList[currentlyDisplayedHire]);

	NUMBEROFHIRES--;
	NUMBEROFEMPLOYEES++;

	var emp = new Employee(hireList[currentlyDisplayedHire]);
	employeeGroup.add(emp.employeeSprite);
	employeeMap[hireList[currentlyDisplayedHire]] = emp;
	this.createPurchaseAlert("hired", capitalizeFirstLetter(hireList[currentlyDisplayedHire]), EMPLOYEEWAGE);
	this.addToEmployeeInventory(hireList[currentlyDisplayedHire]);
	hireList.splice(currentlyDisplayedHire, 1);
	this.fadeHireForward();
	this.checkHireButton(hireMeButton);
	console.log(hireList);
	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
};

BlueRoom.Game.prototype.firedEmployeeBackOnMarket = function(name){
	NUMBEROFHIRES++;
	NUMBEROFEMPLOYEES--;

	fireHandler(name);

	console.log(name);
	console.log(employeeMap[name]);
	var emp = employeeMap[name];
	if(emp.station === "sandwich"){
		sandwichStationFilled = false;
        atSandwichStation = null;
        game.enableButton(currThis.sandwichButton);
	} else if (emp.station === "bakery"){
		bakeryStationFilled = false;
        atBakeryStation = null;
        game.enableButton(currThis.bakeryButton);
	} else if (emp.station ==="coffee"){
		coffeeStationFilled = false;
        atCoffeeStation = null;
        game.enableButton(currThis.coffeeButton);
	}
		employeeGroup.remove(emp.employeeSprite);

		employeeMap[name].discard();

	employeeMap[name].employeeSprite.destroy();
	employeeMap[name] = null;
	hireList.push(name);
	// this.checkHireButton(hireMeButton);
	delete employeeMap[name];

};

BlueRoom.Game.prototype.fadeHireForward = function() {
    currentlyDisplayedHire++;
 	if (currentlyDisplayedHire >= NUMBEROFHIRES)
    {
        currentlyDisplayedHire = 0;
    }
    this.updateNext(this.hireA, this.hireB, hireList[currentlyDisplayedHire]);
};

BlueRoom.Game.prototype.fadeHireBackward = function() {
    currentlyDisplayedHire--;
 	if (currentlyDisplayedHire < 0)
    {
        currentlyDisplayedHire = NUMBEROFHIRES-1;
    }
    this.updateNext(this.hireA, this.hireB, hireList[currentlyDisplayedHire]);
 };

BlueRoom.Game.prototype.updateNext = function(thingA, thingB, newImg) {
	if (thingA.alpha === 0)
    {
        thingA.loadTexture(newImg);
        game.add.tween(thingA).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(thingB).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
    }
    else
    {
        thingB.loadTexture(newImg);
        tween = game.add.tween(thingA).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        game.add.tween(thingB).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
    }
};

BlueRoom.Game.prototype.hideHireView= function(){
	this.enableDayEndButtons();

	hireViewElements.forEach(function(item){
		item.destroy();
	});
	hireViewElements = new Array();
};