var coffeeViewElements = new Array();


BlueRoom.Game.prototype.createCoffeeView= function () {
	var bg = this.add.sprite(0, 0, 'whiteBg');
	var coffeeBg = this.add.sprite(0, 0, 'coffeeBg');
    coffeeViewElements.push(bg);
    coffeeViewElements.push(coffeeBg);

    var iceMachine = this.add.sprite(275, 250, 'iceMachine');
    
    var drinkDispenser = this.game.add.group();
    var dispenser = this.add.sprite(0, 0, 'drinkDispenser');
    var coffee = this.add.button(35, 120, 'drinkButton', this.fillCoffee, this);
    var cappuccino = this.add.button(90, 120, 'drinkButton', this.fillCappuccino, this);
    var latte = this.add.button(140, 120, 'drinkButton', this.fillLatte, this);
    var hotChocolate = this.add.button(190, 120, 'drinkButton', this.fillHotChocolate, this);
    var tea = this.add.button(240, 120, 'drinkButton', this.fillTea, this);
    drinkDispenser.add(dispenser);
    drinkDispenser.add(coffee);
    drinkDispenser.add(cappuccino);
    drinkDispenser.add(latte);
    drinkDispenser.add(hotChocolate);
    drinkDispenser.add(tea);
    drinkDispenser.x = 445;
    drinkDispenser.y = 200;

    var syrupDispenser = this.game.add.group();
    var syrup = this.add.sprite(0, 0, 'syrupDispenser');
    var caramel = this.add.button(130, 15, 'syrupButton', this.caramelSyrup, this);
    var hazelnut = this.add.button(130, 45, 'syrupButton', this.caramelSyrup, this);
    var vanilla = this.add.button(130, 75, 'syrupButton', this.caramelSyrup, this);
    var peppermint = this.add.button(130, 105, 'syrupButton', this.caramelSyrup, this);
    var blueberry = this.add.button(130, 135, 'syrupButton', this.caramelSyrup, this);
	syrupDispenser.add(syrup);
    syrupDispenser.add(caramel);
    syrupDispenser.add(hazelnut);
    syrupDispenser.add(vanilla);
    syrupDispenser.add(peppermint);
    syrupDispenser.add(blueberry);
    syrupDispenser.x = 745;
    syrupDispenser.y = 200;


    var drinkDropZone = this.add.sprite(920, 355, 'drinkDropZone');

	var sm = this.add.sprite(180, 470, 'smallCup');
	var md = this.add.sprite(90, 448, 'mediumCup');
	var lg = this.add.sprite(20, 435, 'largeCup');
    coffeeViewElements.push(iceMachine);
    coffeeViewElements.push(syrupDispenser);
    coffeeViewElements.push(drinkDispenser);
    coffeeViewElements.push(drinkDropZone);

    coffeeViewElements.push(sm);
    coffeeViewElements.push(md);
    coffeeViewElements.push(lg);

};

BlueRoom.Game.prototype.fillCoffee = function(){

};

BlueRoom.Game.prototype.fillCappuccino = function(){

};

BlueRoom.Game.prototype.fillLatte = function(){

};

BlueRoom.Game.prototype.fillHotChocolate= function(){

};

BlueRoom.Game.prototype.fillTea = function(){

};

BlueRoom.Game.prototype.caramelSyrup = function(){

};

BlueRoom.Game.prototype.showCoffeeView= function(){
    coffeeViewElements.forEach(function(item){
        item.visible = true;
    });
};

BlueRoom.Game.prototype.hideCoffeeView= function(){
    coffeeViewElements.forEach(function(item){
        item.visible = false;
    });
};

BlueRoom.Game.prototype.coffeeUpdate= function () {
};