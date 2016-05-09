var dayEndViewElements = new Array();
var dayEndButtons = new Array();


BlueRoom.Game.prototype.createDayEndView= function (dailyInfo, totalInfo) {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	dayEndViewElements.push(bg);
	// var exit = this.add.button(50, 50, 'exitButton', this.destroyDayEndView, this);


    var titleStyle = { font: "70px Roboto-Light", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 87, 'DAY #: FINANCIAL SUMMARY', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	var dailySumm = game.add.sprite(50, 200, 'summaryBox');
	var totalSumm = game.add.sprite(400, 200, 'summaryBox');
	dayEndViewElements.push(dailySumm);
	dayEndViewElements.push(totalSumm);


	var labelStyle = { font: "42px Roboto", fill: "#000000", align: "center"};
	var today = this.game.add.text(100, 230, 'TODAY', labelStyle);

	var detailStyle = { font: "20px Roboto-Thin", fill: "#000000", align: "center"};
	// var tips = this.game.add.text(200, 210, 'Tips: $'+dailyInfo.totalTips.toFixed(2), detailStyle);
	// var revenue = this.game.add.text(200, 250, 'Revenue: $'+(dailyInfo.totalProfit - dailyInfo.totalTips).toFixed(2), detailStyle);
	var revenue = this.game.add.text(100, 300, 'Revenue: $'+(dailyInfo.totalRevenue).toFixed(2), detailStyle);
	var losses = this.game.add.text(100, 350, 'Thefts & Losses: $'+(dailyInfo.totalLosses).toFixed(2), detailStyle);
	var expenses = this.game.add.text(100, 400, 'Utilities & Wages: $'+(dailyInfo.expenses).toFixed(2), detailStyle);
	var profit = this.game.add.text(100, 450, 'Today\'s Net: $'+(dailyInfo.totalRevenue-(dailyInfo.totalLosses+dailyInfo.expenses)).toFixed(2), detailStyle);

	var total = this.game.add.text(445, 230, 'TOTAL', labelStyle);
	// var ttips = this.game.add.text(720, 210, 'Tips: $'+ totalInfo.totalTips.toFixed(2), detailStyle);
	// var trevenue = this.game.add.text(720, 250, 'Revenue: $'+(totalInfo.totalProfit - totalInfo.totalTips).toFixed(2), detailStyle);
	var trevenue = this.game.add.text(445, 300, 'Revenue: $'+(totalInfo.totalRevenue).toFixed(2), detailStyle);
	var tlosses = this.game.add.text(445, 350, 'Thefts & Losses: $'+(totalInfo.totalLosses).toFixed(2), detailStyle);
	var texpenses = this.game.add.text(445, 400, 'Utilities & Wages: $'+(totalInfo.totalExpenses).toFixed(2), detailStyle);
	var tprofit = this.game.add.text(445, 450, 'Total Net: $'+(totalInfo.totalProfit).toFixed(2), detailStyle);

	var viewInventory = this.add.button(900, 200, 'viewInventoryButton', this.createInventoryView, this);
	viewInventory.anchor.setTo(0.5, 0);
	var hire = this.add.button(900, 290, 'hireButton', this.createHireView, this);
	hire.anchor.setTo(0.5, 0);
	var upgrade = this.add.button(900, 380, 'upgradeButton', this.createUpgradeView, this);
	upgrade.anchor.setTo(0.5, 0);
	var close = this.add.button(900, 460, 'exitViewButton', this.destroyDayEndView, this);
	close.anchor.setTo(0.5, 0);
	var save = this.add.button(850, 20, 'saveButton', saveGame, this);
	save.tint = 0xcccccc;
	var quitBtn = this.add.button(20, 20, 'quitButton', this.quitGame, this);
	quitBtn.tint = 0xcccccc;

	viewInventory.tint = 0xf2f2f2;
	hire.tint = 0xf2f2f2;
	upgrade.tint = 0xf2f2f2;

	dayEndButtons.push(viewInventory);
	dayEndButtons.push(hire);
	dayEndButtons.push(upgrade);
	dayEndButtons.push(close);
	dayEndButtons.push(save);
	dayEndButtons.push(quitBtn);


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
	dayEndViewElements.push(quitBtn);


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