var dayEndAlertElements = new Array();


BlueRoom.Game.prototype.createDayEndAlert= function (dailyInfo) {
	this.hideSandwichView();
	this.hideCoffeeView();
	this.hideBakeryView();

	managerView = true;
    sandwichView = false;
    coffeeView = false;
    bakeryView = false;
 
	var alertBg = game.add.sprite(0, 0, 'alertBox');
	dayEndAlertElements.push(alertBg);

    var alertstyle = { font: "25px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var alert = this.game.add.text(this.game.width/2, 180, "Blue Room is closed!"  , alertstyle);
    alert.anchor.setTo(0.5, 0.5);

    var subtitle = { font: "23px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var today = this.game.add.text(this.game.width/2, 220, "Today's tally: ", subtitle);
    today.anchor.setTo(0.5, 0.5)

    var labelstyle = { font: "20px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var customersServed = this.game.add.text(280, 260, "Customers served: "+dailyInfo.totalPurchases, labelstyle);
    var customersLost = this.game.add.text(280, 290, "Customers lost: "+dailyInfo.customersLost, labelstyle);
    var numThefts = this.game.add.text(280, 320, "Thefts: "+dailyInfo.thefts, labelstyle);

    var sandwichesMade = this.game.add.text(550, 260, "Sandwiches made: "+dailyInfo.sandwichCount, labelstyle);
    var drinksServed = this.game.add.text(550, 290, "Drinks served: "+dailyInfo.coffeeCount, labelstyle);
    var bakedGoodsSold = this.game.add.text(550, 320, "Baked goods sold: "+dailyInfo.bakeryCount, labelstyle);

	var cont = this.add.button(this.game.width/2, 400, 'continueButton', endDayScreen, this);
	cont.anchor.setTo(0.5, 0.5);

	dayEndAlertElements.push(alert);
	dayEndAlertElements.push(today);
	dayEndAlertElements.push(customersServed);
	dayEndAlertElements.push(customersLost);
	dayEndAlertElements.push(numThefts);
	dayEndAlertElements.push(sandwichesMade);
	dayEndAlertElements.push(drinksServed);
	dayEndAlertElements.push(bakedGoodsSold);
	dayEndAlertElements.push(cont);

	managerView = false;
	sandwichView = false;
	bakeryView = false;
	coffeeView = false;
	dayEndView = true;

	this.managerButton.visible = false;
	this.sandwichButton.visible = false;
	this.coffeeButton.visible = false;
	this.bakeryButton.visible = false;
}

BlueRoom.Game.prototype.hideDayEndAlert= function(){
	dayEndAlertElements.forEach(function(item){
		item.destroy();
	});
}