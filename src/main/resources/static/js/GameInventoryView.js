var inventoryViewElements = new Array();


BlueRoom.Game.prototype.createInventoryView= function () {
	this.disableDayEndButtons();
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	inventoryViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideInventoryView, this);
	inventoryViewElements.push(backButton);

	var titleStyle = { font: "60px Roboto", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Your Inventory', titleStyle);
	title.anchor.setTo(0.5, 0);

	var labelStyle = { font: "22px Roboto-Light", fill: "#000000", align: "center"};
	var detailStyle = { font: "15px Roboto-Thin", fill: "#000000", align: "center"};

	var employees = this.game.add.text(this.game.width/3, 130, 'EMPLOYEES', labelStyle);
	employees.anchor.setTo(0.5, 0);

	var upgrades = this.game.add.text(2*(this.game.width/3), 130, 'UPDATES', labelStyle);
	upgrades.anchor.setTo(0.5, 0);

	var upEmployeeArrow = this.add.button(this.game.width/3, 170, 'inventoryUp', this.hideInventoryView, this);
	upEmployeeArrow.anchor.setTo(0.5, 0);

	var invE1 = this.add.sprite(this.game.width/3, 170 + 33, 'i_erik');
	invE1.anchor.setTo(0.5, 0);

	var downEmployeeArrow = this.add.button(this.game.width/3, 170 + 33+ 225, 'inventoryDown', this.hideInventoryView, this);
	downEmployeeArrow.anchor.setTo(0.5, 0);

	var employeePrice = this.game.add.text(this.game.width/3, 170 + 33 + 270, "Current employee wages: $" + EMPLOYEEWAGE + " / day", detailStyle);
	employeePrice.anchor.setTo(0.5, 0);

	var fireButton = this.add.button(this.game.width/3, 170 + 33 + 300, 'fireButton', this.hideInventoryView, this);
	fireButton.anchor.setTo(0.5, 0);

	var upUpgradeArrow = this.add.button(2*(this.game.width/3), 170, 'inventoryUp', this.hideInventoryView, this);
	upUpgradeArrow.anchor.setTo(0.5, 0);

	var invU1 = this.add.sprite(2*(this.game.width/3), 170 + 33, 'i_coffee station');
	invU1.anchor.setTo(0.5, 0);

	var downUpgradeArrow = this.add.button(2*(this.game.width/3), 170 + 33+ 225, 'inventoryDown', this.hideInventoryView, this);
	downUpgradeArrow.anchor.setTo(0.5, 0);

	var sellingPrice = this.game.add.text(2*(this.game.width/3), 170 + 33 + 270, 'Selling price: ' , detailStyle);
	sellingPrice.anchor.setTo(0.5, 0);

	var sellButton = this.add.button(2*(this.game.width/3), 170 + 33 + 300, 'sellButton', this.hideInventoryView, this);
	sellButton.anchor.setTo(0.5, 0);

	inventoryViewElements.push(title);
	inventoryViewElements.push(employees);
	inventoryViewElements.push(upgrades);
	inventoryViewElements.push(upEmployeeArrow);
	inventoryViewElements.push(downEmployeeArrow);
	inventoryViewElements.push(invE1);
	inventoryViewElements.push(upUpgradeArrow);
	inventoryViewElements.push(downUpgradeArrow);
	inventoryViewElements.push(invU1);

	inventoryViewElements.push(employeePrice);
	inventoryViewElements.push(sellingPrice);
	
	inventoryViewElements.push(fireButton);
	inventoryViewElements.push(sellButton);

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
	this.enableDayEndButtons();
	inventoryViewElements.forEach(function(item){
		item.destroy();
	});
};