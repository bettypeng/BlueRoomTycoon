var upgradeViewElements = new Array();
var currentlyDisplayedUpgrade = 0;
var NUMBEROFUPGRADES = 3;
var upgradeList = ["coffeeBar", "bakery", "magazineRack"];
var upgradeCostList = [];
var costtext;


BlueRoom.Game.prototype.createUpgradeView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	upgradeViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideUpgradeView, this);
	upgradeViewElements.push(backButton);

	var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Blue Room Expansions', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	upgradeViewElements.push(title);

	upgradeCostList["coffeeBar"] = 500;
	upgradeCostList["bakery"] = 1000;
	upgradeCostList["magazineRack"] = 50;

	var labelStyle = { font: "16px Roboto Light", fill: "#000000", align: "center"};
	var currbalance = this.game.add.text(this.game.width/2, 140, 'Current Balance: $' + statusBar.money.toFixed(2), labelStyle);
	currbalance.anchor.setTo(0.5, 0,5);

	costtext = this.game.add.text(this.game.width/2, 480, 'Cost: $' + upgradeCostList[upgradeList[0]], labelStyle);
	costtext.anchor.setTo(0.5, 0,5);

	var buyButton = this.add.button(this.game.width/2, 510, 'buyButton', this.hideUpgradeView, this);
	buyButton.anchor.setTo(0.5, 0,5);

	upgradeViewElements.push(title);
	upgradeViewElements.push(currbalance);
	upgradeViewElements.push(costtext);
	upgradeViewElements.push(buyButton);

	var upgradeboxX = this.game.width/2;
	var upgradeboxY = 325;

	this.upgradeA = game.add.sprite(upgradeboxX, upgradeboxY, upgradeList[0]);
    this.upgradeA.anchor.setTo(0.5, 0.5);

    this.upgradeB = game.add.sprite(upgradeboxX, upgradeboxY, upgradeList[1]);
    this.upgradeB.anchor.setTo(0.5, 0.5);
    this.upgradeB.alpha = 0;

    upgradeViewElements.push(this.upgradeA);
    upgradeViewElements.push(this.upgradeB);

	var prev = this.add.button(230, 275, 'prev', this.fadeUpgradeBackward, this);
	prev.anchor.setTo(0.5, 0,5);
	upgradeViewElements.push(prev);
	var next = this.add.button(825, 275, 'next', this.fadeUpgradeForward, this);
	next.anchor.setTo(0.5, 0,5);
	upgradeViewElements.push(next);

	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};


BlueRoom.Game.prototype.fadeUpgradeForward = function() {
    currentlyDisplayedUpgrade++;
 	if (currentlyDisplayedUpgrade >= NUMBEROFUPGRADES)
    {
        currentlyDisplayedUpgrade = 0;
    }
    this.updateNext(this.upgradeA, this.upgradeB, upgradeList[currentlyDisplayedUpgrade]);
};

BlueRoom.Game.prototype.fadeUpgradeBackward = function() {
    currentlyDisplayedUpgrade--;

 	if (currentlyDisplayedUpgrade < 0)
    {
        currentlyDisplayedUpgrade = NUMBEROFUPGRADES-1;
    }
    this.updateNext(this.upgradeA, this.upgradeB, upgradeList[currentlyDisplayedUpgrade]);
 };


// // BlueRoom.Game.prototype.showUpgradeView= function(){
// //     upgradeViewElements.forEach(function(item){
// //         item.visible = true;
// //     });
// // };

BlueRoom.Game.prototype.hideUpgradeView= function(){
	upgradeViewElements.forEach(function(item){
		item.destroy();
	});
};