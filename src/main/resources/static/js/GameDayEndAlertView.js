var dayEndAlertElements = new Array();


BlueRoom.Game.prototype.createDayEndAlert= function () {
	var alertBg = game.add.sprite(0, 0, 'alertBox');
	dayEndAlertElements.push(alertBg);

    var alertstyle = { font: "25px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var alert = this.game.add.text(this.game.width/2, 180, "Blue Room is closed!"  , alertstyle);
    alert.anchor.setTo(0.5, 0.5);

    var subtitle = { font: "23px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var today = this.game.add.text(this.game.width/2, 220, "Today's tally: ", subtitle);
    today.anchor.setTo(0.5, 0.5)

    var labelstyle = { font: "20px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var customersServed = this.game.add.text(280, 260, "Customers served: ", labelstyle);
    var customersLost = this.game.add.text(280, 290, "Customers lost: ", labelstyle);
    var numThefts = this.game.add.text(280, 320, "Thefts: ", labelstyle);

    var sandwichesMade = this.game.add.text(550, 260, "Sandwiches made: ", labelstyle);
    var drinksServed = this.game.add.text(550, 290, "Drinks served: ", labelstyle);
    var bakedGoodsSold = this.game.add.text(550, 320, "Baked goods sold: ", labelstyle);

	var cont = this.add.button(this.game.width/2, 400, 'continueButton', endDay, this);
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
}

BlueRoom.Game.prototype.hideDayEndAlert= function(){
	dayEndAlertElements.forEach(function(item){
		item.destroy();
	});
}