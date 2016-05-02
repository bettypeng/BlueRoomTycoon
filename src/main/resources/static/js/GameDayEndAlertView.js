var dayEndAlertElements = new Array();


BlueRoom.Game.prototype.createDayEndAlert= function (type, purchase, cost) {
	var alertBg = game.add.sprite(0, 0, 'alertBox');
	dayEndAlertElements.push(alertBg);

    var alertstyle = { font: "20px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var alert = this.game.add.text(this.game.width/2, 230, "Blue Room is closed!"  , alertstyle);
    alert.anchor.setTo(0.5, 0.5);
    purchaseAlertElements.push(alert);

	var cont = this.add.button(690, 270, 'continueButton', this.hidePurchaseAlert, this);
	cont.anchor.setTo(0.5, 0);
	purchaseAlertElements.push(cont);
}

BlueRoom.Game.prototype.hideDayEndAlert= function(){
	dayEndAlertElements.forEach(function(item){
		item.destroy();
	});
}