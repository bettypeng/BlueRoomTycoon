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

	var titleStyle = { font: "60px Verdana", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Blue Room Expansions', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	upgradeViewElements.push(title);

	upgradeCostList["coffeeBar"] = 500;
	upgradeCostList["bakery"] = 1000;
	upgradeCostList["magazineRack"] = 50;


	var labelStyle = { font: "16px Verdana", fill: "#000000", align: "center"};
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

	// var hireList = new Array();
	// var e1 = this.add.sprite(this.game.width/2, 325, 'e3');
	// e1.anchor.setTo(0.5, 0.5)
	// upgradeViewElements.push(e1);

	this.upgradeA = game.add.sprite(upgradeboxX, upgradeboxY, upgradeList[0]);
    this.upgradeA.anchor.setTo(0.5, 0.5);

    this.upgradeB = game.add.sprite(upgradeboxX, upgradeboxY, upgradeList[1]);
    this.upgradeB.anchor.setTo(0.5, 0.5);
    this.upgradeB.alpha = 0;

    upgradeViewElements.push(this.upgradeA);
    upgradeViewElements.push(this.upgradeB);


	var next = this.add.button(230, 275, 'next', this.fadeUpgrades, this);
	next.anchor.setTo(0.5, 0,5);
	upgradeViewElements.push(next);
	var prev = this.add.button(825, 275, 'prev', this.fadeUpgrades, this);
	prev.anchor.setTo(0.5, 0,5);
	upgradeViewElements.push(prev);


	// var starList = new Array();
	// var stars = ['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar'];

	// for (var i = 0; i < 5; i++){
		// var st = this.add.sprite(0, 0, stars[i]);
		// upgradeViewElements.push(st);
	// 	starList.push(st);
	// }
	
	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};



BlueRoom.Game.prototype.fadeUpgrades = function() {

    //  Cross-fade the two pictures
    var tween;

    if (this.upgradeA.alpha === 1)
    {
        tween = game.add.tween(this.upgradeA).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        game.add.tween(this.upgradeB).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
        costtext.setText("Cost: $" + upgradeCostList[this.upgradeB.key]);
    }
    else
    {
        game.add.tween(this.upgradeA).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(this.upgradeB).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        costtext.setText("Cost: $" + upgradeCostList[this.upgradeA.key]);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(this.changeUpgradeToNext, this);

};

BlueRoom.Game.prototype.changeUpgradeToNext= function() {
    if (this.upgradeA.alpha === 0)
    {
        this.upgradeA.loadTexture(upgradeList[currentlyDisplayedUpgrade]);
    }
    else
    {
        this.upgradeB.loadTexture(upgradeList[currentlyDisplayedUpgrade]);
    }

    currentlyDisplayedUpgrade++;
    console.log(currentlyDisplayedUpgrade);

    if (currentlyDisplayedUpgrade >= NUMBEROFUPGRADES)
    {
        currentlyDisplayedUpgrade = 0;
    }
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