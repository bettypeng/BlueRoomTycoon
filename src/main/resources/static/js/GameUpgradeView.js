var upgradeViewElements = new Array();
var currentlyDisplayedUpgrade = 0;
var NUMBEROFUPGRADES = 3;
var upgradeList = ["coffee", "bakery", "magazine rack"];
var upgradeCostList = [];
upgradeCostList["coffee"] = 500;
upgradeCostList["bakery"] = 1000;
upgradeCostList["magazine rack"] = 50;
var costtext;
var buyUpgradeButton;


BlueRoom.Game.prototype.createUpgradeView= function () {
	this.disableDayEndButtons();

	var bg = this.add.sprite(0, 0, 'dayEndBg');
	upgradeViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideUpgradeView, this);
	upgradeViewElements.push(backButton);

	var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Blue Room Expansions', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	upgradeViewElements.push(title);

	var labelStyle = { font: "16px Roboto-Light", fill: "#000000", align: "center"};
	var currbalance = this.game.add.text(this.game.width/2, 140, 'Current Balance: $' + statusBar.money.toFixed(2), labelStyle);
	currbalance.anchor.setTo(0.5, 0,5);

	costtext = this.game.add.text(this.game.width/2, 480, 'Cost: $' + upgradeCostList[upgradeList[0]], labelStyle);
	costtext.anchor.setTo(0.5, 0,5);

	buyUpgradeButton = this.add.button(this.game.width/2, 510, 'buyButton', this.buyUpgrade, this);
	buyUpgradeButton.anchor.setTo(0.5, 0,5);
	this.checkBuyUpgradeButton(buyUpgradeButton);

	upgradeViewElements.push(title);
	upgradeViewElements.push(currbalance);
	upgradeViewElements.push(costtext);
	upgradeViewElements.push(buyUpgradeButton);

	var upgradeboxX = this.game.width/2;
	var upgradeboxY = 325;

	this.upgradeA = game.add.sprite(upgradeboxX, upgradeboxY, upgradeList[0]);
    this.upgradeA.anchor.setTo(0.5, 0.5);
    currentlyDisplayedUpgrade = 0;

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

BlueRoom.Game.prototype.checkBuyUpgradeButton = function(currButton){
	console.log("checking button");

	if(Number(statusBar.money) <= Number(upgradeCostList[upgradeList[currentlyDisplayedUpgrade]])){
		this.disableButton(currButton);
	}
	else{
		this.enableButton(currButton);
	}
};

BlueRoom.Game.prototype.disableButton = function(currButton) {
	currButton.input.enabled = false;
	currButton.alpha = 0.3;
};

BlueRoom.Game.prototype.enableButton = function(currButton) {
	currButton.input.enabled = true;
	currButton.alpha = 1;
};

BlueRoom.Game.prototype.updateCurrUpgrade = function(){
	console.log("upgrade");
	this.checkBuyUpgradeButton(buyUpgradeButton);
	costtext.setText('Cost: $' + upgradeCostList[upgradeList[currentlyDisplayedUpgrade]]);

};


BlueRoom.Game.prototype.fadeUpgradeForward = function() {
    currentlyDisplayedUpgrade++;
 	if (currentlyDisplayedUpgrade >= NUMBEROFUPGRADES)
    {
        currentlyDisplayedUpgrade = 0;
    }
    this.updateNext(this.upgradeA, this.upgradeB, upgradeList[currentlyDisplayedUpgrade]);
    this.updateCurrUpgrade();
};

BlueRoom.Game.prototype.fadeUpgradeBackward = function() {
    currentlyDisplayedUpgrade--;

 	if (currentlyDisplayedUpgrade < 0)
    {
        currentlyDisplayedUpgrade = NUMBEROFUPGRADES-1;
    }
    this.updateNext(this.upgradeA, this.upgradeB, upgradeList[currentlyDisplayedUpgrade]);
     this.updateCurrUpgrade();
 };

 BlueRoom.Game.prototype.buyUpgrade = function() {
 	if(upgradeList[currentlyDisplayedUpgrade] == "coffee"){
 		NUMBEROFSTATIONS++;
 		this.coffeeStation.visible = true;
		activeButtons.push(this.coffeeButton);
		buy(upgradeList[currentlyDisplayedUpgrade]);
 	}
 	else if(upgradeList[currentlyDisplayedUpgrade] =="bakery"){
 		NUMBEROFSTATIONS++;
 		this.bakeryStation.visible = true;
 		activeButtons.push(this.bakeryButton);
 		buy(upgradeList[currentlyDisplayedUpgrade]);
 	}
 	console.log("BUYING: " + upgradeList[currentlyDisplayedUpgrade]);
 	this.addToUpgradeInventory(upgradeList[currentlyDisplayedUpgrade]);
 	this.createPurchaseAlert("bought a new", upgradeList[currentlyDisplayedUpgrade]+" station", upgradeCostList[upgradeList[currentlyDisplayedUpgrade]]);
	upgradeList.splice(currentlyDisplayedUpgrade, 1);
	NUMBEROFUPGRADES--;
	this.fadeUpgradeForward();
	console.log(upgradeList);
 };




// // BlueRoom.Game.prototype.showUpgradeView= function(){
// //     upgradeViewElements.forEach(function(item){
// //         item.visible = true;
// //     });
// // };

BlueRoom.Game.prototype.hideUpgradeView= function(){
	this.enableDayEndButtons();
	upgradeViewElements.forEach(function(item){
		item.destroy();
	});
	upgradeViewElements = new Array();
};