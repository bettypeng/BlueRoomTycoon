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

var smallCup = [];
var mediumCup = [];
var largeCup = [];

var coffeeSpeechBubble;
var coffeeCustomerFace;
var coffeeExclamation;

var coffeeTransitioning = false;

var currCoffeeCustomer = null;
var currCoffeeOrderSprites = [];

var currThis = this;

var sm; 
var md;
var lg;

BlueRoom.Game.prototype.createCoffeeView= function () {
	var bg = this.add.sprite(0, 0, 'whiteBg');

    coffeeCustomerFace = this.add.sprite(200, 20, "neutral");
    coffeeSpeechBubble = this.add.sprite(350, -30, "speechBubble");
    
    coffeeExclamation = this.add.sprite(400, 40, 'exclamation');
    coffeeExclamation.visible = false;



    smallCup.push(this.add.sprite(400, 40, 'smCup'));
    smallCup.push(this.add.sprite(400, 40, 'smDrink'));
    smallCup.push(this.add.sprite(400, 40, 'smSyrup'));
    smallCup.push(this.add.sprite(400, 40, 'smIce'));

    mediumCup.push(this.add.sprite(400, 40, 'mdCup'));
    mediumCup.push(this.add.sprite(400, 40, 'mdDrink'));
    mediumCup.push(this.add.sprite(400, 40, 'mdSyrup'));
    mediumCup.push(this.add.sprite(400, 40, 'mdIce'));

    largeCup.push(this.add.sprite(400, 40, 'lgCup'));
    largeCup.push(this.add.sprite(400, 40, 'lgDrink'));
    largeCup.push(this.add.sprite(400, 40, 'lgSyrup'));
    largeCup.push(this.add.sprite(400, 40, 'lgIce'));

	var coffeeBg = this.add.sprite(0, 0, 'coffeeBg');
    coffeeViewElements.push(bg);
    coffeeViewElements.push(coffeeBg);

    var coffeeGarbageCan = this.add.button(950, 240, 'trash', this.coffeeTrashButton, this);
    coffeeViewElements.push(coffeeGarbageCan);

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

    for (var i=0; i<smallCup.length; i++) {
        smallCup[i].visible = false;
        smallCup[0].tint = 0xe6f2ff;
        smallCup[3].tint = 0x80d4ff;
        mediumCup[i].visible = false;
        mediumCup[0].tint = 0xe6f2ff;
        mediumCup[3].tint = 0x80d4ff;
        largeCup[i].visible = false;
        largeCup[0].tint = 0xe6f2ff;
        largeCup[3].tint = 0x80d4ff;
    }

    this.noCoffeeCustomer();

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

BlueRoom.Game.prototype.noCoffeeCustomer = function() {
    coffeeSpeechBubble.visible = false;
    coffeeCustomerFace.visible = false;
};

BlueRoom.Game.prototype.coffeeTrashButton = function() {
    if (!coffeeTransitioning) {
        trashHandler("coffee", 1);
        currCup.group.destroy();
        currThis.enableCups();
        currCup= null;
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
        currCup.drink.tint = num;
    }
    
};

BlueRoom.Game.prototype.addSyrup = function(num){
    if(currCup !==null && currCup.group.x === syrupX){
        currCup.addSyrup();
        currCup.syrup.tint = num;
    }
    
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

BlueRoom.Game.prototype.checkIceCorrect = function(iced) {
    return (currCoffeeCustomer.order.iced === iced);
};

BlueRoom.Game.prototype.checkDrinkCorrect = function(added) {
    return (currCoffeeCustomer.order.type === added);
};

BlueRoom.Game.prototype.checkSyrupCorrect = function(added) {
    if (currCoffeeCustomer.order.flavoring.length == 0) {
        if (added == "none") {
            return true;
        }
        return false;
    }
    return currCoffeeCustomer.order.flavoring[0] === added;
};

BlueRoom.Game.prototype.checkSizeCorrect = function(added) {
    return (currCoffeeCustomer.order.size === added);
};

BlueRoom.Game.prototype.showCoffeeView= function(){
    coffeeViewElements.forEach(function(item){
        item.visible = true;
    });
    if (currCoffeeCustomer != null) {
        coffeeCustomerFace.visible = true;
        coffeeSpeechBubble.visible = true;
        this.showCurrOrder();
    }
};

BlueRoom.Game.prototype.showCurrOrder= function(){
    currCoffeeOrderSprites[0].visible = true;
    if (currCoffeeCustomer.order.flavoring.length != 0) {
        currCoffeeOrderSprites[2].visible = true;
    }
    currCoffeeOrderSprites[1].visible = true;
    if (currCoffeeCustomer.order.iced) {
        currCoffeeOrderSprites[3].visible = true;
    }
};

BlueRoom.Game.prototype.hideCoffeeView= function(){
    coffeeViewElements.forEach(function(item){
        item.visible = false;
    });
    this.noCoffeeCustomer();
    if (currCoffeeOrderSprites.length != 0) {
        for (var i=0; i<4; i++) {
            currCoffeeOrderSprites[i].visible = false;
        }
    }
};

BlueRoom.Game.prototype.changeCoffeeSpriteFace = function(x, y, imgName) {
    coffeeCustomerFace.visible = true;
    coffeeCustomerFace.loadTexture(imgName);
    coffeeCustomerFace.x = x;
    coffeeCustomerFace.y = y;
};

BlueRoom.Game.prototype.coffeeUpdate= function () {
    if (coffeeLine.length != 0 && currCoffeeCustomer == null) {
        currCoffeeCustomer = coffeeLine[0];
        console.log(currCoffeeCustomer);

        if (currCoffeeCustomer.order.size === "large") {
            currCoffeeOrderSprites = largeCup;
        } else if (currCoffeeCustomer.order.size === "medium") {
            currCoffeeOrderSprites = mediumCup;
        } else {
            currCoffeeOrderSprites = smallCup;
        }
        currCoffeeOrderSprites[0].visible = true;
        console.log(currCoffeeOrderSprites);

        if (currCoffeeCustomer.order.flavoring.length != 0) {
            var flavorTint = this.getFlavorTint(currCoffeeCustomer.order.flavoring[0]);
            currCoffeeOrderSprites[2].tint = flavorTint;
            currCoffeeOrderSprites[2].visible = true;
        } else {
            currCoffeeOrderSprites[2].visible = false;
        }

        var drinkTint = this.getDrinkTint(currCoffeeCustomer.order.type);
        currCoffeeOrderSprites[1].tint = drinkTint;
        currCoffeeOrderSprites[1].visible = true;

        if (currCoffeeCustomer.order.iced) {
            currCoffeeOrderSprites[3].visible = true;
        } else {
            currCoffeeOrderSprites[3].visible = false;
        }
        
        coffeeCustomerFace.visible = true;
        this.changeCoffeeSpriteFace(200, 20, "neutral");
        coffeeSpeechBubble.visible = true;
    } else if (coffeeLine.length == 0) {
        this.noCoffeeCustomer();
    }
};

BlueRoom.Game.prototype.getDrinkTint = function(flavor) {
    var flavorTint = null;

    switch(flavor) {
        case "latte":
            flavorTint = 0xc68c53;
            break;
        case "coffee":
            flavorTint = 0x604020;
            break;
        case "cappuccino":
            flavorTint = 0x994d00;
            break;
        case "hot_chocolate":
            flavorTint = 0x663300;
            break;
        default:
            flavorTint = 0x392613;
    }
    return flavorTint;

};

BlueRoom.Game.prototype.getFlavorTint = function(syrup) {

    var drinkTint = null;

    switch(syrup) {
        case "vanilla":
            drinkTint = 0xffcccc;
            break;
        case "caramel":
            drinkTint = 0xffb84d;
            break;
        case "hazelnut":
            drinkTint = 0x732626;
            break;
        case "peppermint":
            drinkTint = 0xff6666;
            break;
        default:
            drinkTint = 0xb36b00;
    }
    return drinkTint;

};

BlueRoom.Game.prototype.getDrinkFromTint = function(flavor) {
    var flavorTint = null;

    switch(flavor) {
        case 0xc68c53:
            flavorTint = "latte";
            break;
        case 0x604020:
            flavorTint = "coffee";
            break;
        case 0x994d00:
            flavorTint = "cappuccino";
            break;
        case 0x663300:
            flavorTint = "hot_chocolate";
            break;
        default:
            flavorTint = "tea";
    }
    return flavorTint;

};

BlueRoom.Game.prototype.getFlavorFromTint = function(syrup) {

    var drinkTint = null;

    switch(syrup) {
        case 0xffcccc:
            drinkTint = "vanilla";
            break;
        case 0xffb84d:
            drinkTint = "caramel";
            break;
        case 0x732626:
            drinkTint = "hazelnut";
            break;
        case 0xff6666:
            drinkTint = "peppermint";
            break;
        default:
            drinkTint = "kahlua";
    }
    return drinkTint;

};

BlueRoom.Game.prototype.getSize = function(size) {

    if (size === "sm") {
        return "small";
    }
    if (size === "md") {
        return "medium";
    }
    if (size === "lg") {
        return "large";
    }

};



BlueRoom.Game.prototype.giveCoffeeToCustomer = function() {
    coffeeSpeechBubble.visible = false;


    var currDrink = currThis.getDrinkFromTint(currCup.drink.tint);
    var currFlavor = currThis.getFlavorFromTint(currCup.syrup.tint);
    if (!currCup.syrup.visible) {
        currFlavor = "none";
    }
    var currSize = currThis.getSize(currCup.cupSize);
    var currIce;
    if (!currCup.ice.visible) {
        currIce = false;
    } else {
        currIce = true;
    }

    var correct = false;
    if (this.checkSyrupCorrect(currFlavor) && this.checkDrinkCorrect(currDrink) && 
        this.checkIceCorrect(currIce) && this.checkSizeCorrect(currSize)) {

        correct = true;
    }

    if (correct) {
        currThis.changeCoffeeSpriteFace(170, 0, "happy");
    } else {
        currThis.changeCoffeeSpriteFace(200, 20, "glasses");
    }

    coffeeTransitioning = true;
    var tw = currThis.add.tween(coffeeCustomerFace).to( { x: 1000 }, 3000, null, true);
    if (currCoffeeOrderSprites.length != 0) {
        for (var i=0; i<4; i++) {
            currCoffeeOrderSprites[i].visible = false;
        }
    }
    var myCurrThis = this;
    
    tw.onComplete.add(function () {
        myCurrThis.noCoffeeCustomer();

        currCoffeeCustomer.drinkType = currDrink;
        currCoffeeCustomer.drinkIced = currIce;
        currCoffeeCustomer.drinkFlavor = currFlavor;
        currCoffeeCustomer.drinkSize = currSize;

        if (!myCurrThis.checkSyrupCorrect(currFlavor) && !myCurrThis.checkDrinkCorrect(currDrink) && 
            !myCurrThis.checkIceCorrect(currIce) && !myCurrThis.checkSizeCorrect(currSize)) {

            myCurrThis.steal(currCoffeeCustomer);
            clearInterval(currCoffeeCustomer.barTimer);
            clearInterval(currCoffeeCustomer.myTimer);
        } else {
            myCurrThis.toCashier("coffee");
        }

        //get next customer
        currCoffeeOrderSprites = [];
        coffeeTransitioning = false;
        currCoffeeCustomer = null;
    }, this);

};