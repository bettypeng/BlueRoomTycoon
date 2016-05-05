var coffeeViewElements = new Array();

var hasIce = false;
var hasFill = false;
var hasSyrup = false;

var atIce = false;
var atFill = false;
var atSyrup = false;

var drinkDropZone;
var iceMachine;
var drinkDispenser;
var syrupDispenser;
var iceX = 350;
var drinkX = 590;
var syrupX = 830;
var endX = 1000;
var lineY = 520;

var currCup = null;

var sm; 
var md;
var lg;

BlueRoom.Game.prototype.createCoffeeView= function () {
	var bg = this.add.sprite(0, 0, 'whiteBg');
	var coffeeBg = this.add.sprite(0, 0, 'coffeeBg');
    coffeeViewElements.push(bg);
    coffeeViewElements.push(coffeeBg);

    iceMachine = this.add.sprite(275, 250, 'iceMachine');
    var iceButton = this.add.button(340, 360, 'syrupButton', this.addIce, this);

    
    drinkDispenser = this.game.add.group();
    var dispenser = this.add.sprite(0, 0, 'drinkDispenser');
    var coffee = this.add.button(35, 120, 'drinkButton', this.fillCoffee, this);
    coffee.tint = 0x604020;
    var cappuccino = this.add.button(90, 120, 'drinkButton', this.fillCappuccino, this);
    cappuccino.tint = 0x994d00;
    var latte = this.add.button(140, 120, 'drinkButton', this.fillLatte, this);
    latte.tint=0xc68c53;
    var hotChocolate = this.add.button(190, 120, 'drinkButton', this.fillHotChocolate, this);
    hotChocolate.tint = 0x663300;
    var tea = this.add.button(240, 120, 'drinkButton', this.fillTea, this);
    tea.tint = 0x392613;
    drinkDispenser.add(dispenser);
    drinkDispenser.add(coffee);
    drinkDispenser.add(cappuccino);
    drinkDispenser.add(latte);
    drinkDispenser.add(hotChocolate);
    drinkDispenser.add(tea);
    drinkDispenser.x = 445;
    drinkDispenser.y = 200;

    syrupDispenser = this.game.add.group();
    var syrup = this.add.sprite(0, 0, 'syrupDispenser');
    var caramel = this.add.button(130, 15, 'syrupButton', this.caramelSyrup, this);
    caramel.tint = 0xffb84d;
    var hazelnut = this.add.button(130, 45, 'syrupButton', this.hazelnutSyrup, this);
    hazelnut.tint = 0x732626;
    var vanilla = this.add.button(130, 75, 'syrupButton', this.vanillaSyrup, this);
    vanilla.tint = 0xf9f2ec;
    var peppermint = this.add.button(130, 105, 'syrupButton', this.peppermintSyrup, this);
    peppermint.tint = 0xff6666;
    var kahlua = this.add.button(130, 135, 'syrupButton', this.kahluaSyrup, this);
    kahlua.tint = 0xb36b00;
	syrupDispenser.add(syrup);
    syrupDispenser.add(caramel);
    syrupDispenser.add(hazelnut);
    syrupDispenser.add(vanilla);
    syrupDispenser.add(peppermint);
    syrupDispenser.add(kahlua);
    syrupDispenser.x = 745;
    syrupDispenser.y = 200;

    drinkDropZone = this.add.sprite(920, 355, 'drinkDropZone');

    var smHolder = this.add.sprite(225, 525, 'smCup');
    var mdHolder = this.add.sprite(135, 510, 'mdCup');
    var lgHolder = this.add.sprite(45, 490, 'lgCup');
    smHolder.anchor.setTo(0.5, 0.5);
    mdHolder.anchor.setTo(0.5, 0.5);
    lgHolder.anchor.setTo(0.5, 0.5);

    sm = new Cup('sm', 'smCup', 'smDrink', 'smSyrup', 'smIce', 225, 525);
    md = new Cup('md', 'mdCup', 'mdDrink', 'mdSyrup', 'mdIce', 135, 510);
    lg = new Cup('lg', 'lgCup', 'lgDrink', 'lgSyrup', 'lgIce', 45, 490);

    coffeeViewElements.push(iceMachine);
    coffeeViewElements.push(iceButton);
    coffeeViewElements.push(syrupDispenser);
    coffeeViewElements.push(drinkDispenser);
    coffeeViewElements.push(drinkDropZone);

    coffeeViewElements.push(sm.group);
    coffeeViewElements.push(md.group);
    coffeeViewElements.push(lg.group);
    coffeeViewElements.push(smHolder);
    coffeeViewElements.push(mdHolder);
    coffeeViewElements.push(lgHolder);

    console.log(coffeeViewElements);

};

BlueRoom.Game.prototype.newCup = function(cupSize){
    if(cupSize === "sm"){
         sm = new Cup('sm', 'smCup', 'smDrink', 'smSyrup', 'smIce', 225, 525);
        sm.removeInteractions();
       coffeeViewElements.push(sm.group);   
    } else if (cupSize ==="md"){
         md = new Cup('md', 'mdCup', 'mdDrink', 'mdSyrup', 'mdIce', 135, 510);
        md.removeInteractions();
        coffeeViewElements.push(md.group);
    } else if(cupSize ==="lg"){
        lg = new Cup('lg', 'lgCup', 'lgDrink', 'lgSyrup', 'lgIce', 45, 490);
        lg.removeInteractions();
        coffeeViewElements.push(lg.group);
    }
};

BlueRoom.Game.prototype.disableCups = function(cupSize){
    if(cupSize === "sm"){
        md.removeInteractions();
        lg.removeInteractions();
     } else if (cupSize ==="md"){
        sm.removeInteractions();
        lg.removeInteractions();
     } else if(cupSize ==="lg"){
        sm.removeInteractions();
        md.removeInteractions();
     }
};

BlueRoom.Game.prototype.enableCups = function(){
    sm.restartInteractions();
    md.restartInteractions();
    lg.restartInteractions();

};

BlueRoom.Game.prototype.addIce = function(){
    if(currCup !==null && currCup.group.x === iceX){
        currCup.addIce();
    }
};

BlueRoom.Game.prototype.addDrink = function(num){
    if(currCup !==null && currCup.group.x === drinkX){
        currCup.addDrink();
    }
    currCup.drink.tint = num;
};

BlueRoom.Game.prototype.addSyrup = function(num){
    if(currCup !==null && currCup.group.x === syrupX){
        currCup.addSyrup();
    }
    currCup.syrup.tint = num;
};

BlueRoom.Game.prototype.fillCoffee = function(){
    this.addDrink(0x604020);
};

BlueRoom.Game.prototype.fillCappuccino = function(){
    this.addDrink(0x994d00);

};

BlueRoom.Game.prototype.fillLatte = function(){
    this.addDrink(0xc68c53);

};

BlueRoom.Game.prototype.fillHotChocolate= function(){
    this.addDrink(0x663300);

};

BlueRoom.Game.prototype.fillTea = function(){
    this.addDrink(0x392613);
};

BlueRoom.Game.prototype.caramelSyrup = function(){
    this.addSyrup(0xffb84d);
};

BlueRoom.Game.prototype.hazelnutSyrup = function(){
    this.addSyrup(0x732626);

};

BlueRoom.Game.prototype.vanillaSyrup = function(){
    this.addSyrup(0xffcccc);

};

BlueRoom.Game.prototype.peppermintSyrup = function(){
    this.addSyrup(0xff6666);

};
BlueRoom.Game.prototype.kahluaSyrup = function(){
    this.addSyrup(0xb36b00);

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