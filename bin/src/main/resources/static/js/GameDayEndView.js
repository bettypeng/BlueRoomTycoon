var dayEndViewElements = new Array();
var dayEndButtons = new Array();


BlueRoom.Game.prototype.createDayEndView= function (dailyInfo, totalInfo) {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	dayEndViewElements.push(bg);
	// var exit = this.add.button(50, 50, 'exitButton', this.destroyDayEndView, this);


    var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Financial Summary', titleStyle);
	title.anchor.setTo(0.5, 0,5);
	var labelStyle = { font: "30px Roboto-Light", fill: "#000000", align: "center"};
	var today = this.game.add.text(this.game.width/3, 150, 'TODAY', labelStyle);
	today.anchor.setTo(0.5, 0,5);

	var detailStyle = { font: "20px Roboto-Thin", fill: "#000000", align: "center"};
	// var tips = this.game.add.text(200, 210, 'Tips: $'+dailyInfo.totalTips.toFixed(2), detailStyle);
	// var revenue = this.game.add.text(200, 250, 'Revenue: $'+(dailyInfo.totalProfit - dailyInfo.totalTips).toFixed(2), detailStyle);
	var revenue = this.game.add.text(280, 210, 'Revenue: $'+(dailyInfo.totalRevenue).toFixed(2), detailStyle);
	var losses = this.game.add.text(280, 250, 'Thefts & Losses: $'+(dailyInfo.totalLosses).toFixed(2), detailStyle);
	var expenses = this.game.add.text(280, 290, 'Utilities & Wages: $'+(dailyInfo.expenses).toFixed(2), detailStyle);
	var profit = this.game.add.text(280, 330, 'Today\'s Net: $'+(dailyInfo.totalRevenue-(dailyInfo.totalLosses+dailyInfo.expenses)).toFixed(2), detailStyle);

	var total = this.game.add.text(2*(this.game.width/3), 150, 'TOTAL', labelStyle);
	total.anchor.setTo(0.5, 0,5);
	// var ttips = this.game.add.text(720, 210, 'Tips: $'+ totalInfo.totalTips.toFixed(2), detailStyle);
	// var trevenue = this.game.add.text(720, 250, 'Revenue: $'+(totalInfo.totalProfit - totalInfo.totalTips).toFixed(2), detailStyle);
	var trevenue = this.game.add.text(620, 210, 'Revenue: $'+(totalInfo.totalRevenue).toFixed(2), detailStyle);
	var tlosses = this.game.add.text(620, 250, 'Thefts & Losses: $'+(totalInfo.totalLosses).toFixed(2), detailStyle);
	var texpenses = this.game.add.text(620, 290, 'Utilities & Wages: $'+(totalInfo.totalExpenses).toFixed(2), detailStyle);
	var tprofit = this.game.add.text(620, 330, 'Total Net: $'+(totalInfo.totalProfit).toFixed(2), detailStyle);

	var viewInventory = this.add.button(150, 420, 'viewInventoryButton', this.createInventoryView, this);
	viewInventory.anchor.setTo(0.5, 0);
	var hire = this.add.button(380, 420, 'hireButton', this.createHireView, this);
	hire.anchor.setTo(0.5, 0);
	var upgrade = this.add.button(600, 420, 'upgradeButton', this.createUpgradeView, this);
	upgrade.anchor.setTo(0.5, 0);
	var close = this.add.button(890, 370, 'exitViewButton', this.destroyDayEndView, this);
	close.anchor.setTo(0.5, 0);
	var save = this.add.button(870, 30, 'saveButton', saveGame, this)

	dayEndButtons.push(viewInventory);
	dayEndButtons.push(hire);
	dayEndButtons.push(upgrade);
	dayEndButtons.push(close);
	dayEndButtons.push(save);


	dayEndViewElements.push(title);
	dayEndViewElements.push(today);
	dayEndViewElements.push(revenue);
	dayEndViewElements.push(losses);
	dayEndViewElements.push(expenses);
	dayEndViewElements.push(profit);
	dayEndViewElements.push(total);
	dayEndViewElements.push(trevenue);
	dayEndViewElements.push(tlosses);
	dayEndViewElements.push(texpenses);
	dayEndViewElements.push(tprofit);
	dayEndViewElements.push(viewInventory);
	dayEndViewElements.push(upgrade);
	dayEndViewElements.push(hire);
	dayEndViewElements.push(close);
	dayEndViewElements.push(save);

	managerView = false;
    sandwichView = false;
    coffeeView = false;
    bakeryView = false;
    dayEndView = true;

    

	game.loseMoney(500, 530, "- $"+(dailyInfo.expenses).toFixed(2), dailyInfo.expenses);
};

BlueRoom.Game.prototype.disableDayEndButtons = function(){
	dayEndButtons.forEach(function(item){
		item.visible = false;
	});
};

BlueRoom.Game.prototype.enableDayEndButtons = function(){
	dayEndButtons.forEach(function(item){
		item.visible = true;
	});
};

// BlueRoom.Game.prototype.showDayEndView= function(){
//     sandwichViewElements.forEach(function(item){
//         item.visible = true;
//     });
// };

BlueRoom.Game.prototype.destroyDayEndView= function(){
	this.managerButton.visible = true;
	this.sandwichButton.visible = true;
	if(coffeeButtonOn){
		this.coffeeButton.visible = true;
	} else{
		this.coffeeButton.visible = false;
	}
	if(bakeryButtonOn){
		this.bakeryButton.visible = true;
	} else{
		this.bakeryButton.visible = false;
	}
	dayEndViewElements.forEach(function(item){
		item.destroy();
	});
	dayEndViewElements = new Array();

    managerView = true;
    sandwichView = false;
    coffeeView = false;
    bakeryView = false;
    dayEndView = false;
	this.hideSandwichView();
    this.hideCoffeeView();
    this.hideBakeryView();
    this.disableButton(this.managerButton);
    if (!sandwichStationFilled ) {
        this.enableButton(this.sandwichButton);
    }
    if (!coffeeStationFilled) {
        this.enableButton(this.coffeeButton);
    }
    if (!bakeryStationFilled) {
        this.enableButton(this.bakeryButton);
    }

	startDay();
	this.resetGameDay();
};