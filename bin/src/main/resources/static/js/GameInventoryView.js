var inventoryViewElements = new Array();


BlueRoom.Game.prototype.createInventoryView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	inventoryViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideInventoryView, this);
	inventoryViewElements.push(backButton);

	var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Your Inventory', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	inventoryViewElements.push(title);

	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};

// BlueRoom.Game.prototype.showUpgradeView= function(){
//     upgradeViewElements.forEach(function(item){
//         item.visible = true;
//     });
// };

BlueRoom.Game.prototype.hideInventoryView= function(){
	inventoryViewElements.forEach(function(item){
		item.destroy();
	});
};