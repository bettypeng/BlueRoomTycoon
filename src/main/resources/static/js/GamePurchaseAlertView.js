var purchaseAlertElements = new Array();


BlueRoom.Game.prototype.createPurchaseAlert= function (type, purchase, cost) {
	var alertBg = game.add.sprite(0, 0, 'alertBox');
	purchaseAlertElements.push(alertBg);

    var alertstyle = { font: "18px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    if(purchase ==="bakery"){
    	purchase = "bakery station";
    } else if(purchase ==="coffee"){
    	purchase = "coffee station";
    } else if(purchase === "drink_alc"){
    	purchase = "drink fridge";
    } else if(purchase === "chips_alc"){
    	purchase = "chips stand";
    } 
    var alert = this.game.add.text(this.game.width/2, 230, "Congratulations, you have just " + type +" " + purchase + "! $" + cost + " has been subtracted from your balance. Make sure you keep an eye out for the rise in daily expenses!"  , alertstyle);
    alert.anchor.setTo(0.5, 0.5);
    purchaseAlertElements.push(alert);

    game.loseMoney(500, 330, "- $"+cost, cost);

    var back = this.add.button(330, 300, 'continueShopping', this.returnFromPurchaseAlert, this);
	back.anchor.setTo(0.5, 0);
	purchaseAlertElements.push(back);

	var close = this.add.button(690, 300, 'exitViewSmallButton', this.closeFromPurchaseAlert, this);
	close.anchor.setTo(0.5, 0);
	purchaseAlertElements.push(close);

	this.disableDayEndButtons();
}

BlueRoom.Game.prototype.createGeneralAlert= function(message){
	var alertBg = game.add.sprite(0, 0, 'alertBox');
	purchaseAlertElements.push(alertBg);

    var alertstyle = { font: "18px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var alert = this.game.add.text(this.game.width/2, 230, message, alertstyle);
    alert.anchor.setTo(0.5, 0.5);
    purchaseAlertElements.push(alert);

    var back = this.add.button(330, 300, 'continueShopping', this.returnFromPurchaseAlert, this);
	back.anchor.setTo(0.5, 0);
	purchaseAlertElements.push(back);

	var close = this.add.button(690, 300, 'exitViewSmallButton', this.closeFromPurchaseAlert, this);
	close.anchor.setTo(0.5, 0);
	purchaseAlertElements.push(close);

	this.disableDayEndButtons();
}

BlueRoom.Game.prototype.returnFromPurchaseAlert= function(){
	purchaseAlertElements.forEach(function(item){
		item.destroy();
	});
	this.enableDayEndButtons();
}

BlueRoom.Game.prototype.closeFromPurchaseAlert= function(){
	purchaseAlertElements.forEach(function(item){
		item.destroy();
	});
	game.hideInventoryView();
	game.hideUpgradeView();
	game.hideHireView();
	game.destroyDayEndView();
}