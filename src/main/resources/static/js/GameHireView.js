var hireViewElements = new Array();
var NUMBEROFHIRES = 3;
var currentlyDisplayedHire = 0;
var hireList = ["erik", "alex", "rachel"];
var EMPLOYEEWAGE = 100;
var hireMeButton;

BlueRoom.Game.prototype.createHireView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	hireViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideHireView, this);
	hireViewElements.push(backButton);

	var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Hire Employees', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	var labelStyle = { font: "16px Roboto-Light", fill: "#000000", align: "center"};
	var currbalance = this.game.add.text(this.game.width/2, 140, 'Current Balance: $' + statusBar.money.toFixed(2), labelStyle);
	currbalance.anchor.setTo(0.5, 0,5);

	var wages = this.game.add.text(this.game.width/2, 480, "Wages: $" +EMPLOYEEWAGE + " / day", labelStyle);
	wages.anchor.setTo(0.5, 0,5);

	hireMeButton = this.add.button(this.game.width/2, 510, 'hireMeButton', this.hireNewEmployee, this);
	hireMeButton.anchor.setTo(0.5, 0,5);
	this.checkHireButton(hireMeButton);


	hireViewElements.push(title);
	hireViewElements.push(currbalance);
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

    this.hireB = game.add.sprite(hireboxX, hireboxY, hireList[1]);
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

	if(Number(statusBar.money) <= Number(EMPLOYEEWAGE) || NUMBEROFSTATIONS<=NUMBEROFEMPLOYEES){
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
	NUMBEROFHIRES--;
	NUMBEROFEMPLOYEES++;

	var emp = new Employee();
	employeeList.push(emp.employeeSprite);
	this.createPurchaseAlert("hired", capitalizeFirstLetter(hireList[currentlyDisplayedHire]), EMPLOYEEWAGE);
	hireList.splice(currentlyDisplayedHire, 1);
	this.fadeHireForward();
	console.log(hireList);
	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
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
	hireViewElements.forEach(function(item){
		item.destroy();
	});
	hireViewElements = new Array();
};