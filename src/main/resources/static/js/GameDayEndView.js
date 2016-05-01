var dayEndViewElements = new Array();


BlueRoom.Game.prototype.createDayEndView= function (dailyInfo, totalInfo) {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	dayEndViewElements.push(bg);
	// var exit = this.add.button(50, 50, 'exitButton', this.destroyDayEndView, this);


    var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'End of Day Summary:', titleStyle);
	title.anchor.setTo(0.5, 0,5);
	var labelStyle = { font: "30px Roboto-Light", fill: "#000000", align: "center"};
	var today = this.game.add.text(this.game.width/4, 150, 'Today', labelStyle);
	today.anchor.setTo(0.5, 0,5);
	var tips = this.game.add.text(40, 180, 'Tips: $'+dailyInfo.totalTips.toFixed(2), labelStyle);
	var revenue = this.game.add.text(40, 230, 'Revenue: $'+(dailyInfo.totalProfit - dailyInfo.totalTips).toFixed(2), labelStyle);
	var expenses = this.game.add.text(40, 280, 'Expenses:', labelStyle);
	var profit = this.game.add.text(40, 330, 'Profit: $'+dailyInfo.totalProfit.toFixed(2), labelStyle);

	var total = this.game.add.text(3*(this.game.width/4), 150, 'Total', labelStyle);
	total.anchor.setTo(0.5, 0,5);
	var ttips = this.game.add.text(540, 180, 'Tips: $'+ totalInfo.totalTips.toFixed(2), labelStyle);
	var trevenue = this.game.add.text(540, 230, 'Revenue: $'+(totalInfo.totalProfit - totalInfo.totalTips).toFixed(2), labelStyle);
	var texpenses = this.game.add.text(540, 280, 'Expenses:', labelStyle);
	var tprofit = this.game.add.text(540, 330, 'Profit: $'+totalInfo.totalProfit.toFixed(2), labelStyle);

	var viewInventory = this.add.button(150, 420, 'viewInventoryButton', this.createInventoryView, this);
	viewInventory.anchor.setTo(0.5, 0);
	var hire = this.add.button(380, 420, 'hireButton', this.createHireView, this);
	hire.anchor.setTo(0.5, 0);
	var upgrade = this.add.button(600, 420, 'upgradeButton', this.createUpgradeView, this);
	upgrade.anchor.setTo(0.5, 0);
	var close = this.add.button(890, 370, 'exitViewButton', this.destroyDayEndView, this);
	close.anchor.setTo(0.5, 0);

	dayEndViewElements.push(title);
	dayEndViewElements.push(today);
	dayEndViewElements.push(tips);
	dayEndViewElements.push(revenue);
	dayEndViewElements.push(expenses);
	dayEndViewElements.push(profit);
	dayEndViewElements.push(total);
	dayEndViewElements.push(ttips);
	dayEndViewElements.push(trevenue);
	dayEndViewElements.push(texpenses);
	dayEndViewElements.push(tprofit);
	dayEndViewElements.push(viewInventory);
	dayEndViewElements.push(upgrade);
	dayEndViewElements.push(hire);
	dayEndViewElements.push(close);

		

	managerView = false;
	sandwichView = false;
	dayEndView = true;


};

// BlueRoom.Game.prototype.showDayEndView= function(){
//     sandwichViewElements.forEach(function(item){
//         item.visible = true;
//     });
// };

BlueRoom.Game.prototype.destroyDayEndView= function(){
	this.managerButton.visible = true;
	this.sandwichButton.visible = true;
	dayEndViewElements.forEach(function(item){
		item.destroy();
	});
	dayEndViewElements = new Array();
	managerView = true;
	sandwichView = false;
	dayEndView = false;
	this.resetGameDay();
};