var dayEndAlertElements = new Array();


BlueRoom.Game.prototype.createDayEndAlert= function (dailyInfo) {
	this.hideSandwichView();
	this.hideCoffeeView();
	this.hideBakeryView();

	managerView = true;
    sandwichView = false;
    coffeeView = false;
    bakeryView = false;

    this.muffinEndOfDay();
    // this.sandwichEndOfDay();
    // this.coffeeEndOfDay();
 
	var alertBg = game.add.sprite(0, 0, 'alertBox');
	dayEndAlertElements.push(alertBg);

    var alertstyle = { font: "25px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var alert = this.game.add.text(this.game.width/2, 180, "Blue Room is closed!"  , alertstyle);
    alert.anchor.setTo(0.5, 0.5);

    var subtitle = { font: "23px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var today = this.game.add.text(this.game.width/2, 220, "Today's tally: ", subtitle);
    today.anchor.setTo(0.5, 0.5)

    var labelstyle = { font: "18px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var customersServed = this.game.add.text(280, 250, "Customers served: "+dailyInfo.totalPurchases, labelstyle);
    var customersLost = this.game.add.text(280, 280, "Customers lost: "+dailyInfo.customersLost, labelstyle);
    var numThefts = this.game.add.text(280, 310, "Thefts: "+dailyInfo.thefts, labelstyle);
    var itemsTrashed = this.game.add.text(280, 340, "Baked goods wasted: " + muffinsTrashed, labelstyle);


    var sandwichesMade = this.game.add.text(550, 250, "Sandwiches made: "+dailyInfo.sandwichCount, labelstyle);
    var drinksServed = this.game.add.text(550, 280, "Drinks served: "+dailyInfo.coffeeCount, labelstyle);
    var bakedGoodsSold = this.game.add.text(550, 310, "Baked goods sold: "+dailyInfo.bakeryCount, labelstyle);
    var bakedGoodsWasted = this.game.add.text(550, 340, "Other shitty items sold: " + dailyInfo.alcCount, labelstyle);


	var cont = this.add.button(this.game.width/2, 400, 'continueButton', endDayScreen, this);
	cont.anchor.setTo(0.5, 0.5);

	dayEndAlertElements.push(alert);
	dayEndAlertElements.push(today);
	dayEndAlertElements.push(customersServed);
	dayEndAlertElements.push(customersLost);
	dayEndAlertElements.push(numThefts);
	dayEndAlertElements.push(itemsTrashed);

	dayEndAlertElements.push(sandwichesMade);
	dayEndAlertElements.push(drinksServed);
	dayEndAlertElements.push(bakedGoodsSold);
	dayEndAlertElements.push(bakedGoodsWasted);

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