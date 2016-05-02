var inventoryViewElements = new Array();
var inventoryEmployee = 0;
var inventoryUpgrade = 0;
var sellingPrice;


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

	var upEmployeeArrow = this.add.button(this.game.width/3, 170, 'inventoryUp', this.fadeInventoryEmployeeForward, this);
	upEmployeeArrow.anchor.setTo(0.5, 0);

	// var invE1 = this.add.sprite(this.game.width/3, 170 + 33, 'i_erik');
	// invE1.anchor.setTo(0.5, 0);

	this.invE1 = this.add.sprite(this.game.width/3, 170 + 33, "i_" + hireList[0]);
    this.invE1.anchor.setTo(0.5, 0);
    inventoryEmployee = 0;

    this.invE2 = this.add.sprite(this.game.width/3, 170 + 33, "i_" + hireList[1]);
    this.invE2.anchor.setTo(0.5, 0);
    this.invE2.alpha = 0;

	var downEmployeeArrow = this.add.button(this.game.width/3, 170 + 33+ 225, 'inventoryDown', this.fadeInventoryEmployeeBackward, this);
	downEmployeeArrow.anchor.setTo(0.5, 0);

	var employeePrice = this.game.add.text(this.game.width/3, 170 + 33 + 270, "Current employee wages: $" + EMPLOYEEWAGE + " / day", detailStyle);
	employeePrice.anchor.setTo(0.5, 0);

	var fireButton = this.add.button(this.game.width/3, 170 + 33 + 300, 'fireButton', this.hideInventoryView, this);
	fireButton.anchor.setTo(0.5, 0);

	var upUpgradeArrow = this.add.button(2*(this.game.width/3), 170, 'inventoryUp', this.fadeInventoryUpgradeForward, this);
	upUpgradeArrow.anchor.setTo(0.5, 0);

	// var invU1 = this.add.sprite(2*(this.game.width/3), 170 + 33, 'i_coffee station');
	// invU1.anchor.setTo(0.5, 0);

	this.invU1 = this.add.sprite(2*(this.game.width/3), 170+33, "i_" + upgradeList[0]);
    this.invU1.anchor.setTo(0.5, 0);
    inventoryUpgrade = 0;

    this.invU2 = this.add.sprite(2*(this.game.width/3), 170+33, "i_" + upgradeList[1]);
    this.invU2.anchor.setTo(0.5, 0);
    this.invU2.alpha = 0;

	var downUpgradeArrow = this.add.button(2*(this.game.width/3), 170 + 33+ 225, 'inventoryDown', this.fadeInventoryUpgradeBackward, this);
	downUpgradeArrow.anchor.setTo(0.5, 0);

	sellingPrice = this.game.add.text(2*(this.game.width/3), 170 + 33 + 270, 'Selling price: $' + upgradeCostList[upgradeList[inventoryUpgrade]], detailStyle);
	sellingPrice.anchor.setTo(0.5, 0);

	var sellButton = this.add.button(2*(this.game.width/3), 170 + 33 + 300, 'sellButton', this.hideInventoryView, this);
	sellButton.anchor.setTo(0.5, 0);

	inventoryViewElements.push(title);
	inventoryViewElements.push(employees);
	inventoryViewElements.push(upgrades);
	inventoryViewElements.push(upEmployeeArrow);
	inventoryViewElements.push(downEmployeeArrow);
	inventoryViewElements.push(this.invE1);
	inventoryViewElements.push(upUpgradeArrow);
	inventoryViewElements.push(downUpgradeArrow);
	inventoryViewElements.push(this.invU1);

	inventoryViewElements.push(employeePrice);
	inventoryViewElements.push(sellingPrice);

	inventoryViewElements.push(fireButton);
	inventoryViewElements.push(sellButton);

	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};

BlueRoom.Game.prototype.fadeInventoryEmployeeForward = function() {
    inventoryEmployee++;
 	if (inventoryEmployee >= NUMBEROFHIRES)
    {
        inventoryEmployee = 0;
    }
    this.updateNext(this.invE1, this.invE2, "i_" + hireList[inventoryEmployee]);
};

BlueRoom.Game.prototype.fadeInventoryEmployeeBackward = function() {
    inventoryEmployee--;
 	if (inventoryEmployee < 0)
    {
        inventoryEmployee = NUMBEROFHIRES-1;
    }
    this.updateNext(this.invE1, this.invE2, "i_" + hireList[inventoryEmployee]);
 };

 BlueRoom.Game.prototype.fadeInventoryUpgradeForward = function() {
    inventoryUpgrade++;
 	if (inventoryUpgrade >= NUMBEROFHIRES)
    {
        inventoryUpgrade = 0;
    }
    sellingPrice.setText('Selling price: $' + upgradeCostList[upgradeList[inventoryUpgrade]]);
    this.updateNext(this.invU1, this.invU2, "i_" + upgradeList[inventoryUpgrade]);
};

BlueRoom.Game.prototype.fadeInventoryUpgradeBackward = function() {
    inventoryUpgrade--;
 	if (inventoryUpgrade < 0)
    {
        inventoryUpgrade = NUMBEROFHIRES-1;
    }
    sellingPrice.setText('Selling price: $' + upgradeCostList[upgradeList[inventoryUpgrade]]);
    this.updateNext(this.invU1, this.invU2, "i_" + upgradeList[inventoryUpgrade]);
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