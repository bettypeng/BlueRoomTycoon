var purchaseAlertElements = new Array();


BlueRoom.Game.prototype.createPurchaseAlert= function (type, purchase, cost) {
	var alertBg = game.add.sprite(0, 0, 'purchaseAlert');
	purchaseAlertElements.push(alertBg);

    var alertstyle = { font: "18px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var alert = this.game.add.text(this.game.width/2, 230, "Congratulations, you have just " + type +" " + purchase + "! $" + cost + " has been subtracted from your balance. Make sure you keep an eye out for the rise in daily expenses!"  , alertstyle);
    alert.anchor.setTo(0.5, 0.5);
    purchaseAlertElements.push(alert);

	var close = this.add.button(690, 270, 'exitViewButton', this.hidePurchaseAlert, this);
	close.anchor.setTo(0.5, 0);
	purchaseAlertElements.push(close);
}

BlueRoom.Game.prototype.hidePurchaseAlert= function(){
	purchaseAlertElements.forEach(function(item){
		item.destroy();
	});
	game.hideUpgradeView();
	game.hideHireView();
	game.destroyDayEndView();
}