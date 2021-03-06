var upgradeViewElements = new Array();
var currentlyDisplayedUpgrade = 0;
var NUMBEROFUPGRADES = 5;
var upgradeList = ["coffee", "bakery", "drink_alc", "chips_alc", "magazine rack"];
var upgradeCostList = [];
var upgradeUpkeepList = [];
upgradeCostList["coffee"] = 200;
upgradeCostList["bakery"] = 300;
upgradeCostList["magazine rack"] = 100;
upgradeCostList["drink_alc"] = 75;
upgradeCostList["chips_alc"] = 50;
upgradeUpkeepList["coffee"] = 10;
upgradeUpkeepList["bakery"] = 15;
upgradeUpkeepList["magazine rack"] = 2;
upgradeUpkeepList["drink_alc"] = 5;
upgradeUpkeepList["chips_alc"] = 5;
var basecosttext;
var upkeepcosttext;
var buyUpgradeButton;



BlueRoom.Game.prototype.createUpgradeView= function () {
	this.disableDayEndButtons();

	var bg = this.add.sprite(0, 0, 'dayEndBg');
	upgradeViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideUpgradeView, this);
	upgradeViewElements.push(backButton);

    var titleStyle = { font: "70px Roboto", fill: "#ffffff", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'BUY UPGRADES', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	upgradeViewElements.push(title);

	var labelStyle = { font: "16px Roboto-Light", fill: "#000000", align: "center"};
	var currbalance = this.game.add.text(this.game.width/2, 140, 'Current Balance: $' + statusBar.money.toFixed(2), labelStyle);
	currbalance.anchor.setTo(0.5, 0,5);


	basecosttext = this.game.add.text(this.game.width/3, 480, 'Base Cost: $' + upgradeCostList[upgradeList[0]], labelStyle);
	basecosttext.anchor.setTo(0.5, 0,5);

	upkeepcosttext = this.game.add.text(2* this.game.width/3, 480, 'Daily Upkeep Cost: $' + upgradeUpkeepList[upgradeList[0]], labelStyle);
	upkeepcosttext.anchor.setTo(0.5, 0,5);

	if(NUMBEROFUPGRADES<=0){
		basecosttext.setText('');
		upkeepcosttext.setText('');
	}


	buyUpgradeButton = this.add.button(this.game.width/2, 510, 'buyButton', this.buyUpgrade, this);
	buyUpgradeButton.anchor.setTo(0.5, 0,5);
	this.checkBuyUpgradeButton(buyUpgradeButton);

	upgradeViewElements.push(title);
	upgradeViewElements.push(currbalance);
	upgradeViewElements.push(basecosttext);
	upgradeViewElements.push(upkeepcosttext);
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

	if(Number(statusBar.money) <= Number(upgradeCostList[upgradeList[currentlyDisplayedUpgrade]]) || NUMBEROFUPGRADES <= 0){
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
	if(NUMBEROFUPGRADES>0){
		basecosttext.setText('Base Cost: $' + upgradeCostList[upgradeList[currentlyDisplayedUpgrade]]);
		upkeepcosttext.setText('Daily Upkeep Cost: $' + upgradeUpkeepList[upgradeList[currentlyDisplayedUpgrade]]);

	} else{
		basecosttext.setText('');
		upkeepcosttext.setText('');
	}
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
 	console.log(upgradeList[currentlyDisplayedUpgrade]);
 	if(upgradeList[currentlyDisplayedUpgrade] === "coffee"){
 		NUMBEROFSTATIONS++;
 		this.coffeeStation.visible = true;
		coffeeButtonOn = true;
		buy(upgradeList[currentlyDisplayedUpgrade]);
 	}
 	else if(upgradeList[currentlyDisplayedUpgrade] ==="bakery"){
 		NUMBEROFSTATIONS++;
 		this.bakeryStation.visible = true;
 		bakeryButtonOn = true;
 		buy(upgradeList[currentlyDisplayedUpgrade]);
 	}
 	else if (upgradeList[currentlyDisplayedUpgrade] === "magazine rack") {
 		console.log("BUYING MAGAZINE RACK");
 		buy(upgradeList[currentlyDisplayedUpgrade]);
 		CUSTOMERHAPPINESSINTERVAL += 40;
 		this.magazineRack.visible = true;
 	} else if (upgradeList[currentlyDisplayedUpgrade] == "drink_alc") {
 		this.drinkStand.visible = true;
 		buy(upgradeList[currentlyDisplayedUpgrade]);
 	} else if (upgradeList[currentlyDisplayedUpgrade] == "chips_alc") {
 		this.chipStand.visible = true;
 		buy(upgradeList[currentlyDisplayedUpgrade]);
 	}
 	console.log("BUYING: " + upgradeList[currentlyDisplayedUpgrade]);
 	this.addToUpgradeInventory(upgradeList[currentlyDisplayedUpgrade]);
 	this.createPurchaseAlert("bought a new", upgradeList[currentlyDisplayedUpgrade], upgradeCostList[upgradeList[currentlyDisplayedUpgrade]]);
	upgradeList.splice(currentlyDisplayedUpgrade, 1);
	NUMBEROFUPGRADES--;
	this.fadeUpgradeForward();
	this.updateCurrUpgrade();
	console.log(upgradeList);
 };


 BlueRoom.Game.prototype.sellUpgrade = function(upgrade){
 	if(upgrade === "coffee"){
 		NUMBEROFSTATIONS--;
 		this.coffeeStation.visible = false;
  		 this.coffeeButton.visible = false;

		coffeeButtonOn = false;
 	}
 	else if(upgrade ==="bakery"){
 		NUMBEROFSTATIONS--;
 		this.bakeryStation.visible = false;
  		 this.bakeryButton.visible = false;

 		bakeryButtonOn = false;
 	} else if (upgrade == "magazineRack") {
 		this.magazineRack.visible = false;
 	} else if (upgrade == "drink_alc") {
 		this.drinkStand.visible = false;
 	} else if (upgrade == "chips_alc") {
 		this.chipStand.visible = false;
 	}
 	console.log("SELLING: " + upgrade);
	upgradeList.push(upgrade);
	NUMBEROFUPGRADES++;
	console.log(upgradeList);
	sellHandler(upgrade);
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