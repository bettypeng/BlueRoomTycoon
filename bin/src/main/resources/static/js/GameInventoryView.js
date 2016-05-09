var inventoryViewElements = new Array();
var inventoryEmployeeElements = new Array();
var inventoryUpgradeElements = new Array();
var inventoryEmployee = 0;
var inventoryUpgrade = 0;
var inventoryEmployeeList = new Array();
var inventoryUpgradeList = new Array();
var sellingPrice;


BlueRoom.Game.prototype.createInventoryView= function () {
	this.disableDayEndButtons();
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	inventoryViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideInventoryView, this);
	inventoryViewElements.push(backButton);

    var titleStyle = { font: "70px Roboto", fill: "#ffffff", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'YOUR INVENTORY', titleStyle);
	title.anchor.setTo(0.5, 0);

	var labelStyle = {font: "25px Roboto", fill: "#000000", align: "center"};
	var detailStyle = {font: "15px Roboto-Thin", fill: "#000000", align: "center"};

	var employees = this.game.add.text(this.game.width/3, 150, 'EMPLOYEES', labelStyle);
	employees.anchor.setTo(0.5, 0);

	var upgrades = this.game.add.text(2*(this.game.width/3), 150, 'UPGRADES', labelStyle);
	upgrades.anchor.setTo(0.5, 0);

	var noEmployees = this.game.add.text(this.game.width/3, 170 + 120, "No employees!", detailStyle);
	noEmployees.anchor.setTo(0.5, 0);

	var noUpgrades = this.game.add.text(2*(this.game.width/3), 170 + 120, "No upgrades!", detailStyle);
	noUpgrades.anchor.setTo(0.5, 0);

	inventoryViewElements.push(title);
	inventoryViewElements.push(employees);
	inventoryViewElements.push(upgrades);
	inventoryViewElements.push(noEmployees);
	inventoryViewElements.push(noUpgrades);

	if(inventoryEmployeeList.length > 0){
		this.setUpEmployeeInventory();
	}

	if(inventoryUpgradeList.length > 0){
		this.setUpUpgradeInventory();
	}

	managerView = false;
	sandwichView = false;
	bakeryView = false;
	coffeeView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;
};

BlueRoom.Game.prototype.addToEmployeeInventory = function(employee){
	console.log("reached add to e inv");
	inventoryEmployeeList.push(employee);
};

BlueRoom.Game.prototype.removeFromEmployeeInventory = function(){
	var name = inventoryEmployeeList[inventoryEmployee];
	this.firedEmployeeBackOnMarket(name);
	inventoryEmployeeList.splice(inventoryEmployee, 1);
	if(inventoryEmployeeList.length <1){
		inventoryEmployeeElements.forEach(function(item){
			item.destroy();
		});
	}
	else{
		this.fadeInventoryEmployeeForward();
	}

	this.createGeneralAlert("You have successfully fired " + name + ". Sorry, " + name + "!");

};

BlueRoom.Game.prototype.setUpEmployeeInventory = function(){
	console.log("setting up e inv");

	var upEmployeeArrow = this.add.button(this.game.width/3, 190, 'inventoryUp', this.fadeInventoryEmployeeForward, this);
	upEmployeeArrow.anchor.setTo(0.5, 0);

	this.invE1 = this.add.sprite(this.game.width/3, 190 + 33, "i_" + inventoryEmployeeList[0]);
    this.invE1.anchor.setTo(0.5, 0);
    inventoryEmployee = 0;

    this.invE2 = this.add.sprite(this.game.width/3, 190 + 33, "i_" + inventoryEmployeeList[0]);
    this.invE2.anchor.setTo(0.5, 0);
    this.invE2.alpha = 0;

	var downEmployeeArrow = this.add.button(this.game.width/3, 190 + 33+ 225, 'inventoryDown', this.fadeInventoryEmployeeBackward, this);
	downEmployeeArrow.anchor.setTo(0.5, 0);

	var detailStyle = {font: "15px Roboto-Thin", fill: "#000000", align: "center"};
	var employeePrice = this.game.add.text(this.game.width/3, 190 + 33 + 270, "Current employee wages: $" + EMPLOYEEWAGE + " / day", detailStyle);
	employeePrice.anchor.setTo(0.5, 0);

	var fireButton = this.add.button(this.game.width/3, 190 + 33 + 300, 'fireButton', this.removeFromEmployeeInventory, this);
	fireButton.anchor.setTo(0.5, 0);

	inventoryEmployeeElements.push(upEmployeeArrow);
	inventoryEmployeeElements.push(downEmployeeArrow);
	inventoryEmployeeElements.push(this.invE1);
	inventoryEmployeeElements.push(this.invE2);
	inventoryEmployeeElements.push(employeePrice);
	inventoryEmployeeElements.push(fireButton);
};

BlueRoom.Game.prototype.fadeInventoryEmployeeForward = function() {
    inventoryEmployee++;
 	if (inventoryEmployee >= inventoryEmployeeList.length)
    {
        inventoryEmployee = 0;
    }
    this.updateNext(this.invE1, this.invE2, "i_" + inventoryEmployeeList[inventoryEmployee]);
};

BlueRoom.Game.prototype.fadeInventoryEmployeeBackward = function() {
    inventoryEmployee--;
 	if (inventoryEmployee < 0)
    {
        inventoryEmployee = inventoryEmployeeList.length-1;
    }
    this.updateNext(this.invE1, this.invE2, "i_" + inventoryEmployeeList[inventoryEmployee]);
};

BlueRoom.Game.prototype.addToUpgradeInventory = function(upgrade){
	inventoryUpgradeList.push(upgrade);
};

BlueRoom.Game.prototype.removeFromUpgradeInventory = function(){
	var name = inventoryUpgradeList[inventoryUpgrade];
	this.sellUpgrade(name);

	inventoryUpgradeList.splice(inventoryUpgrade, 1);
	if(inventoryUpgradeList.length <1){
		inventoryUpgradeElements.forEach(function(item){
			item.destroy();
		});
	}
	else{
		this.fadeInventoryUpgradeForward();
	}

	this.createGeneralAlert("You have just sold your " + name +  " station.");


		
	
};

BlueRoom.Game.prototype.setUpUpgradeInventory = function(){
	var upUpgradeArrow = this.add.button(2*(this.game.width/3), 190, 'inventoryUp', this.fadeInventoryUpgradeForward, this);
	upUpgradeArrow.anchor.setTo(0.5, 0);

	this.invU1 = this.add.sprite(2*(this.game.width/3), 190+33, "i_" + inventoryUpgradeList[0]);
    this.invU1.anchor.setTo(0.5, 0);
    inventoryUpgrade = 0;

    this.invU2 = this.add.sprite(2*(this.game.width/3), 190+33, "i_" + inventoryUpgradeList[0]);
    this.invU2.anchor.setTo(0.5, 0);
    this.invU2.alpha = 0;

	var downUpgradeArrow = this.add.button(2*(this.game.width/3), 190 + 33+ 225, 'inventoryDown', this.fadeInventoryUpgradeBackward, this);
	downUpgradeArrow.anchor.setTo(0.5, 0);

	var detailStyle = {font: "15px Roboto-Thin", fill: "#000000", align: "center"};
	sellingPrice = this.game.add.text(2*(this.game.width/3), 190 + 33 + 270, 'Selling price: $' + upgradeCostList[inventoryUpgradeList[inventoryUpgrade]], detailStyle);
	sellingPrice.anchor.setTo(0.5, 0);

	var sellButton = this.add.button(2*(this.game.width/3), 190 + 33 + 300, 'sellButton', this.removeFromUpgradeInventory, this);
	sellButton.anchor.setTo(0.5, 0);

	inventoryUpgradeElements.push(upUpgradeArrow);
	inventoryUpgradeElements.push(downUpgradeArrow);
	inventoryUpgradeElements.push(this.invU1);
	inventoryUpgradeElements.push(this.invU2);
	inventoryUpgradeElements.push(sellingPrice);
	inventoryUpgradeElements.push(sellButton);
};


BlueRoom.Game.prototype.fadeInventoryUpgradeForward = function() {
    inventoryUpgrade++;
 	if (inventoryUpgrade >= inventoryUpgradeList.length)
    {
        inventoryUpgrade = 0;
    }
    sellingPrice.setText('Selling price: $' + upgradeCostList[inventoryUpgradeList[inventoryUpgrade]]);
    this.updateNext(this.invU1, this.invU2, "i_" + inventoryUpgradeList[inventoryUpgrade]);
};

BlueRoom.Game.prototype.fadeInventoryUpgradeBackward = function() {
    inventoryUpgrade--;
 	if (inventoryUpgrade < 0)
    {
        inventoryUpgrade = inventoryUpgradeList.length-1;
    }
    sellingPrice.setText('Selling price: $' + upgradeCostList[inventoryUpgradeList[inventoryUpgrade]]);
    this.updateNext(this.invU1, this.invU2, "i_" + inventoryUpgradeList[inventoryUpgrade]);
};

BlueRoom.Game.prototype.hideInventoryView= function(){
	this.enableDayEndButtons();
	inventoryViewElements.forEach(function(item){
		item.destroy();
	});
	inventoryEmployeeElements.forEach(function(item){
		item.destroy();
	});
	inventoryUpgradeElements.forEach(function(item){
		item.destroy();
	});
};