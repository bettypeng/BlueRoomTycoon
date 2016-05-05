var coffeeViewElements = new Array();

var coffeeStaticElements;
var coffeeMovableElements;
var coffeeStaticElementMap = {};
var coffeeMovableElementMap = {};
var coffeeElementMap = {};
var drinkDropZone;

var hasIce = false;
var hasFill = false;
var hasSyrup = false;

var atIce = false;
var atFill = false;
var atSyrup = false;

function Cup( x, y, key) {
    this.key = key;
    this.x = x;
    this.y = y;
}


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


    drinkDropZone = this.add.sprite(920, 355, 'drinkDropZone');

	// var sm = this.add.sprite(190, 500, 'smCup');
	// var md = this.add.sprite(110, 472, 'mdCup');
	// var lg = this.add.sprite(20, 435, 'lgCup');

    coffeeViewElements.push(iceMachine);
    coffeeViewElements.push(syrupDispenser);
    coffeeViewElements.push(drinkDispenser);
    coffeeViewElements.push(drinkDropZone);

    // coffeeViewElements.push(sm);
    // coffeeViewElements.push(md);
    // coffeeViewElements.push(lg);

    coffeeStaticElements = this.add.group();
    coffeeMovableElements =  this.add.physicsGroup();
        
    this.newCup(230, 530, 'smCup', 'smCup');
    this.newCup(147, 520, 'mdCup', 'mdCup');
    this.newCup(60, 500, 'lgCup', 'lgCup');
    console.log(coffeeViewElements);

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

BlueRoom.Game.prototype.newCup=function(x, y, staticImg, movableImg){
        var rb = coffeeStaticElements.create(x, y, staticImg);
        var movableRb = coffeeMovableElements.create(x, y, movableImg);
        coffeeViewElements.push(rb);
        coffeeViewElements.push(movableRb);
        console.log("here");
        // coffeeMovableElems.push(movableRb);
        rb.anchor.setTo(0.5, 0.5);
        movableRb.anchor.setTo(0.5, 0.5);
        coffeeElementMap[movableRb.key] = new Cup(x, y, staticImg);
        this.newCupHelper(rb, movableRb, movableImg);
    };
    
    BlueRoom.Game.prototype.renewCup= function(x, y, key){
        var movable = coffeeMovableElements.create(x, y, key);
        coffeeViewElements.push(movable);
        // coffeeMovableElems.push(movable);
        movable.anchor.setTo(0.5, 0.5);
        this.setUpCoffeeInteractions(movable);
        movable.inputEnabled = true;
        movable.input.enableDrag();
        movable.body.collideWorldBounds = true;
    };
    
    BlueRoom.Game.prototype.newCupHelper= function(staticEl, draggableEl, transformImg){
        coffeeStaticElementMap[staticEl.key] = transformImg;
        coffeeMovableElementMap[transformImg] = staticEl.key;
        coffeeElementMap[transformImg] = new Cup(staticEl.x, staticEl.y, staticEl.key);
        this.setUpCoffeeInteractions(staticEl);
        this.setUpCoffeeInteractions(draggableEl);
        staticEl.inputEnabled = true;
        draggableEl.inputEnabled = true;
        draggableEl.input.enableDrag();
        draggableEl.body.collideWorldBounds = true;
    };
    
    BlueRoom.Game.prototype.setUpCoffeeInteractions =function(sprite){
        sprite.events.onInputOver.add(this.coffeeonOver, this);
        sprite.events.onInputOut.add(this.coffeeonOut, this);
        sprite.events.onDragStart.add(this.coffeeonDragStart, this);
        sprite.events.onDragStop.add(this.coffeeonDragStop, this);
    };
    
        
    BlueRoom.Game.prototype.coffeeonOver= function(sprite, pointer) {
    
        sprite.tint = 0xff7777;
    
    },
    
    BlueRoom.Game.prototype.coffeeonOut= function(sprite, pointer) {
    
        sprite.tint = 0xffffff;
    
    },
    
    BlueRoom.Game.prototype.coffeeonDragStart = function(sprite, pointer) {
        var dragOut = coffeeStaticElementMap[sprite.key];
        sprite.loadTexture(dragOut, 0);
        dragPosition.set(sprite.x, sprite.y);
        mypointer.alpha = 1;
    },
    
    BlueRoom.Game.prototype.coffeeonDragStop= function(sprite, pointer) {
        dragging = false;
        sprite.tint = 0xffffff;
        sprite.body.moves = true;
        mypointer.alpha = 0;
    
        if (!sprite.overlap(drinkDropZone))
        {
            this.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
             window.setTimeout(function(){
                 sprite.loadTexture(coffeeMovableElementMap[sprite.key]);
                }, 600);
        }
    
    },

    // BlueRoom.Game.prototype.trashButton = function () {
    //     if (transitioning) {
    //         return;
    //     }
    //     var totalTrash = 0;
    //     if (nonSandwich.length != 0) {
    //         totalTrash += nonSandwich.length;
    //         for (var i=0; i<nonSandwich.length; i++) {
    //             movableElements.remove(nonSandwich[i]);
    //         }
    //         nonSandwich = [];
    //     }
    //     if (currSandSprites.length != 0) {
    //         totalTrash += currSandSprites.length;
    //         for (var i=0; i<currSandSprites.length; i++) {
    //             movableElements.remove(currSandSprites[i]);
    //         }
    //         currOrderElem.destroy();
    //         exclamation.visible = true;
    //         var t = this.add.tween(exclamation).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    //         t.onComplete.add(function () {
    //             currSandwich = [];
    //             currDelts = {};
    //             currSandSprites = [];
    //             currPlace = 0;
    //             incorrSandCount = 0;
    //             exclamation.visible = false;
    //             exclamation.alpha = 1;

    //             var f = currCustomerOrder[0];
    //             currOrderElem = this.add.sprite(400, 60, f);
    //             currOrderElem.alpha = 0;

    //             this.add.tween(currOrderElem).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    //             sandwichViewElements.push(currOrderElem);
    //         }, this);
    //     }
    //     trashHandler("sandwich", totalTrash);
    // },

BlueRoom.Game.prototype.coffeeUpdate= function () {
    // if (sandwichLine.length != 0 && currCustomer == null) {
    //         currCustomer = sandwichLine[0];
    //         currCustomerOrder.push('bottom_bun');
    //         for (var i=0; i<currCustomer.order.ingreds.length; i++) {
    //             currCustomerOrder.push(currCustomer.order.ingreds[i].type);
    //         }
    //         currCustomerOrder.push('top_bun');
    //         this.showNeutral();
    //         speechBubble.visible = true;
    //         console.log(currCustomer);
    //     }
        
    //     if (currCustomer != null && currOrderElem == null) {
    //         var f = currCustomerOrder[0];
    //         currOrderElem = this.add.sprite(400, 60, f);
    //         currOrderElem.alpha = 0;

    //         this.add.tween(currOrderElem).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    //         sandwichViewElements.push(currOrderElem);
    //     }
};