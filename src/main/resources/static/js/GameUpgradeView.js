var upgradeViewElements = new Array();


BlueRoom.Game.prototype.createUpgradeView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	upgradeViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideUpgradeView, this);
	upgradeViewElements.push(backButton);

	var titleStyle = { font: "60px Verdana", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Blue Room Expansions', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	upgradeViewElements.push(title);

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

BlueRoom.Game.prototype.hideUpgradeView= function(){
	upgradeViewElements.forEach(function(item){
		item.destroy();
	});
};