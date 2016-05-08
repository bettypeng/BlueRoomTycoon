// BlueRoom.GameSandwichView = function (game) {
  
// };

// BlueRoom.GameSandwichView.prototype = Object.create(BlueRoom.Game.prototype);
// BlueRoom.GameSandwichView.prototype.constructor = BlueRoom.GameSandwichView();


var dropZone;
var dragPosition;
var staticElementMap = {};
var movableElementMap = {};
var elementMap = {};

var staticElements;
var movableElements;
var dragging;
var platform;
var currSprite;

// var happy;
// var sad;
// var neutral;
// var sideEye;
// var noface;
// var glasses;
var speechBubble;
var exclamation;
var customerFace;
var transitioning = false;

// var currCustomer = ["bottom_bun", "roast_beef", "cheese", "lettuce", "top_bun"];
var currCustomer = null;
var currCustomerOrder = [];
var currOrderElem = null;
var currPlace = 0;
var currOrder;
var currSandwich = [];
var currSandSprites = [];
var currDelts = {};
var firstX;
var collidedElem = null;
var stopUpdate = false;
var nonSandwich = [];
var sandIngWasted = [];
var nonSandElem;
var incorrSandCount = 0;

var mypointer;

var movableElems = [];
var sandwichViewElements = new Array();
var currCustomerStatusBar;


function Topping( x, y, key) {
    this.key = key;
    this.x = x;
    this.y = y;
}

// BlueRoom.GameSandwichView.prototype = {

BlueRoom.Game.prototype.createSandwichView= function () {
    var myGame = this;

    var bg = this.add.sprite(0, 0, 'stationBg');
    sandwichViewElements.push(bg);
    platform = this.add.sprite(0, 470, 'stationBg');

    // happy = this.add.sprite(170, 0, "happy");
    // sad = this.add.sprite(190, 20, "sad");
    // neutral = this.add.sprite(200, 20, "neutral");
    // noface = this.add.sprite(200, 20, "noface");
    // glasses = this.add.sprite(200, 20, "glasses");
    // sideEye = this.add.sprite(200, 0, "leaving");
    customerFace = this.add.sprite(150, 40, "neutral");
    speechBubble = this.add.sprite(350, -30, "speechBubble");
    exclamation = this.add.sprite(400, 40, 'exclamation');

    // happy.visible = false;
    // sad.visible = false;
    // neutral.visible = false;
    // sideEye.visible = false;
    // noface.visible = false;
    // glasses.visible = false;
    speechBubble.visible = false;
    exclamation.visible = false;
    customerFace.visible = false;


    //BlueRoom.Game.prototype.create.call(this);
    var swbg = this.add.sprite(0, 0, 'sandwichBg');
        var garbageCan = this.add.button(950, 495, 'trash', this.trashButton, this);
    sandwichViewElements.push(garbageCan);

    sandwichViewElements.push(swbg);


    this.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.body.moves = false;
    sandwichViewElements.push(platform);

    dropZone = this.add.sprite(940,  235, 'dropzone');
    dropZone.anchor.setTo(0.5, 0.5);

    sandwichViewElements.push(dropZone);

    mypointer = this.add.sprite(940, 45, 'pointer');
    mypointer.anchor.setTo(0.5, 0.5);
    this.add.tween(mypointer).to({y: 70}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
    mypointer.alpha = 0;
    sandwichViewElements.push(mypointer);

    staticElements = this.add.group();
    movableElements =  this.add.physicsGroup();

    this.newTopping(300, 260, 'turkey_pile', 'turkey');
    this.newTopping(260, 370, 'roast_beef_pile', 'roast_beef');
    this.newTopping(220, 500, 'ham_pile', 'ham');

    this.newTopping(417, 260, 'mozzarella_pile', 'mozzarella');
    this.newTopping(405, 383, 'yellow_cheese_pile', 'yellow_cheese');
    this.newTopping(400, 500, 'swiss_cheese_pile', 'swiss_cheese');

    this.newTopping(523, 260, 'spring_mix_pile', 'spring_mix');
    this.newTopping(545, 375, 'lettuce_pile', 'lettuce');
    this.newTopping(565, 500, 'spinach_pile', 'spinach');

    this.newTopping(650, 260, 'onion_pile', 'onion');
    this.newTopping(680, 380, 'pickle_pile', 'pickle');
    this.newTopping(730, 500, 'tomato_pile', 'tomato');


    this.newTopping(150, 240, 'top_ciabatta', 'top_ciabatta');
    this.newTopping(140, 275, 'bottom_ciabatta', 'bottom_ciabatta');

    this.newTopping(100, 315, 'top_french', 'top_french');
    this.newTopping(90, 350, 'bottom_french', 'bottom_french');

    this.newTopping(70, 390, 'top_wheat', 'top_wheat');
    this.newTopping(70, 415, 'bottom_wheat', 'bottom_wheat');
 

    dragPosition = new Phaser.Point(0, 0);
    
    this.orderElems();

};

BlueRoom.Game.prototype.changeSpriteFace = function(x, y, imgName) {
    customerFace.visible = true;
    customerFace.loadTexture(imgName);
    customerFace.x = x;
    customerFace.y = y;
};

BlueRoom.Game.prototype.showHappy = function() {
    this.changeSpriteFace(150, 40, "happy");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(150, 40, "neutral");
    } ,2000);
};

BlueRoom.Game.prototype.showNo = function() {
    this.changeSpriteFace(150, 40, "noface");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(150, 40, "neutral");
    } ,2000);
};

BlueRoom.Game.prototype.showGlasses = function() {
    this.changeSpriteFace(150, 40, "glasses");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(150, 40, "neutral");
    } ,2000);
};

BlueRoom.Game.prototype.showNeutral = function() {
    currThis.changeSpriteFace(150, 40, "neutral");
};

BlueRoom.Game.prototype.showSad = function() {
    this.changeSpriteFace(150, 40, "sad");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(150, 40, "neutral");
    } ,2000);

};

BlueRoom.Game.prototype.noCustomer = function() {
    speechBubble.visible = false;
    customerFace.visible = false;
};

BlueRoom.Game.prototype.showSandwichView= function(){
    sandwichViewElements.forEach(function(item){
        
        item.visible = true;
    });
    if (currCustomer != null) {
        if (!transitioning) {
            this.showNeutral();
            speechBubble.visible = true;
        }
    }
};


BlueRoom.Game.prototype.hideSandwichView= function(){
    sandwichViewElements.forEach(function(item){
        item.visible = false;
    });
    this.noCustomer();

};

BlueRoom.Game.prototype.newTopping=function(x, y, staticImg, movableImg){
    var rb = staticElements.create(x, y, staticImg);
    var movableRb = movableElements.create(x, y, movableImg);
    elementMap[rb.key] = new Topping(x, y, movableImg);
    elementMap[movableRb.key] = new Topping(x, y, movableImg);
    movableRb.loadTexture(staticImg);
    sandwichViewElements.push(rb);
    sandwichViewElements.push(movableRb);
    movableElems.push(movableRb);
    rb.anchor.setTo(0.5, 0.5);
    movableRb.anchor.setTo(0.5, 0.5);
   
    this.newToppingHelper(rb, movableRb, movableImg);
};

BlueRoom.Game.prototype.renewTopping= function(x, y, key){
    var change = movableElementMap[key];
    var movable = movableElements.create(x, y, key);
    movable.loadTexture(change);
    sandwichViewElements.push(movable);
    movableElems.push(movable);
    movable.anchor.setTo(0.5, 0.5);
    this.setUpInteractions(movable);
    movable.inputEnabled = true;
    movable.input.enableDrag();
    movable.body.collideWorldBounds = true;
};

BlueRoom.Game.prototype.newToppingHelper= function(staticEl, draggableEl, transformImg){
    staticElementMap[staticEl.key] = transformImg;
    movableElementMap[transformImg] = staticEl.key;
    //elementMap[transformImg] = new Topping(staticEl.x, staticEl.y, staticEl.key);
    this.setUpInteractions(staticEl);
    this.setUpInteractions(draggableEl);
    staticEl.inputEnabled = true;
    draggableEl.inputEnabled = true;
    draggableEl.input.enableDrag();
    draggableEl.body.collideWorldBounds = true;
};

BlueRoom.Game.prototype.setUpInteractions =function(sprite){
    sprite.events.onInputOver.add(this.onOver, this);
    sprite.events.onInputOut.add(this.onOut, this);
    sprite.events.onDragStart.add(this.onDragStart, this);
    sprite.events.onDragStop.add(this.onDragStop, this);
};

    
BlueRoom.Game.prototype.onOver= function(sprite, pointer) {

    //sprite.tint = 0xcccccc;

},

BlueRoom.Game.prototype.onOut= function(sprite, pointer) {

    //sprite.tint = 0xffffff;

},

BlueRoom.Game.prototype.onDragStart = function(sprite, pointer) {
    //var change = dragOut.substring(0, dragOut.length-5);
    if(sprite.key.indexOf("_pile")!=-1){
        sprite.loadTexture(elementMap[sprite.key].key);
        sprite.resetFrame();
    }
    dragPosition.set(sprite.x, sprite.y);
    mypointer.alpha = 1;
},

BlueRoom.Game.prototype.onDragStop= function(sprite, pointer) {
    dragging = false;
    sprite.tint = 0xffffff;
    sprite.body.moves = true;
    mypointer.alpha = 0;

    if(sprite.x===dragPosition.x && sprite.y===dragPosition.y){
        var change = movableElementMap[sprite.key];
        sprite.loadTexture(change);    
    }
    else if (!sprite.overlap(dropZone) )
        //|| sprite.overlap(platform))
    {
        var t = this.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
        setTimeout(function(){
            var change = movableElementMap[sprite.key];
            sprite.loadTexture(change);
        }, 490);
    }
    else{
        if ((currCustomer != null) && (currCustomerOrder[0] == currOrderElem.key)) {
            this.add.tween(sprite).to( { x: dropZone.x }, 500, null, true);
        }
        sprite.body.gravity.y = 1000;
        sprite.input.draggable = false;
        console.log("sprite key: " + sprite.key);
                console.log(elementMap);

        console.log(elementMap[sprite.key]);
        var curr = elementMap[sprite.key];
        this.renewTopping(curr.x, curr.y, curr.key);
    }

},

BlueRoom.Game.prototype.deleteCurrSandwich = function (customer) {
    if (customer != currCustomer) {
        return;
    }
    currOrderElem.destroy();
    for (var i=0; i<currSandSprites.length; i++) {
        movableElements.remove(currSandSprites[i]);
    }
    currPlace = 0;
    currSandwich = [];
    currSandSprites = [];
    currCustomerOrder = [];
    currDelts = {};
    currCustomer = null;
    currOrderElem = null;
    incorrSandCount = 0;
},

BlueRoom.Game.prototype.trashButton = function () {
    if (transitioning) {
        return;
    }
    var totalTrash = 0;
    if (nonSandwich.length != 0) {
        totalTrash += nonSandwich.length;
        for (var i=0; i<nonSandwich.length; i++) {
            movableElements.remove(nonSandwich[i]);
        }
        nonSandwich = [];
    }
    if (currSandSprites.length != 0) {
        totalTrash += currSandSprites.length;
        for (var i=0; i<currSandSprites.length; i++) {
            movableElements.remove(currSandSprites[i]);
        }
        currOrderElem.destroy();
        exclamation.visible = true;
        var t = this.add.tween(exclamation).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        t.onComplete.add(function () {
            currSandwich = [];
            currDelts = {};
            currSandSprites = [];
            currPlace = 0;
            incorrSandCount = 0;
            exclamation.visible = false;
            exclamation.alpha = 1;

            var f = currCustomerOrder[0];
            currOrderElem = this.add.sprite(400, 60, f);
            currOrderElem.alpha = 0;

            this.add.tween(currOrderElem).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            sandwichViewElements.push(currOrderElem);
        }, this);
    }
    trashHandler("sandwich", totalTrash);
},

BlueRoom.Game.prototype.orderElems= function () {
    var currThis = this;
    
    window.setInterval(function() {
        if (transitioning) {
            if (nonSandElem != null) {
                nonSandwich.push(nonSandElem);
                nonSandElem = null;
            }
            return;
        }
        if (currCustomer == null)  {
            currThis.noCustomer();
            if (nonSandElem != null) {
                nonSandwich.push(nonSandElem);
                nonSandElem = null;
            }
            return;
        }

        if (currCustomer.happinessBarProgress < 0) {
            currThis.changeSpriteFace(150, 40, "upset");
            transitioning = true;

            // console.log(currSandSprites);
            nonSandwich = nonSandwich.concat(currSandSprites);
            // console.log(nonSandwich);

            currThis.add.tween(speechBubble).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            currThis.add.tween(currOrderElem).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var t = currThis.add.tween(customerFace).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            // console.log(currOrderElem);
            t.onComplete.add(function () {
                // console.log(currOrderEl

                currOrderElem.destroy();
                currPlace = 0;
                currSandwich = [];
                currSandSprites = [];
                currCustomerOrder = [];
                currDelts = {};
                incorrSandCount = 0;
                currCustomer = null;
                currOrderElem = null;
                transitioning = false;
                collidedElem = null;
                customerFace.visible = false;
                speechBubble.visible = false;
                customerFace.alpha = 1;
                speechBubble.alpha = 1;
            });
            return;
        }
      
        if (collidedElem != null) {
            var item = collidedElem;

            collidedElem = null;

            if (currSandwich.length == 0) {
                firstX = item.x;
            }

            if (item.key != currCustomerOrder[currPlace]) {
                incorrSandCount++;
                if (Math.abs(item.x-firstX) > 60) {
                    currThis.showGlasses();
                } else {
                    currThis.showSad();
                }
            } else if (Math.abs(item.x-firstX) < 10) {
                currThis.showHappy();
            } else if (Math.abs(item.x-firstX) > 50) {
                currThis.showNo();
            }
            currSandwich.push(item.key);
            currSandSprites.push(item);
            currDelts[currPlace] = Math.abs((item.x-firstX)/100);
            
            if (currPlace == (currCustomerOrder.length-1)) {
                currOrderElem.destroy();
                speechBubble.visible = false;
                transitioning = true;

                if (incorrSandCount != 0 && incorrSandCount >= currCustomerOrder.length/2) {
                    currThis.changeSpriteFace(150, 40, "troll");
                } else {
                    currThis.changeSpriteFace(150, 40, "leaving");
                }
                var tw = currThis.add.tween(customerFace).to( { x: 1000 }, 3000, null, true);
                currCustomerStatusBar.discard();
                tw.onComplete.add(function () {
                    for (var i=0; i<currSandSprites.length; i++) {
                        movableElements.remove(currSandSprites[i]);
                    }
                    // currThis.sandwichComplete();
                    currThis.noCustomer();
                
                    currCustomer.ingredients = currSandwich;
                    currCustomer.ingMap = currDelts;

                    if (incorrSandCount != 0 && incorrSandCount >= currCustomerOrder.length/2) {
                        currThis.steal(currCustomer);
                        curr= sandwichLine.shift();
                        numSandwich--;
                        // clearInterval(currCustomer.barTimer);
                        // clearInterval(currCustomer.myTimer);
                    } else {
                        currThis.sandwichComplete();
                    }

                    //get next customer
                    currPlace = 0;
                    currSandwich = [];
                    currSandSprites = [];
                    currCustomerOrder = [];
                    currDelts = {};
                    incorrSandCount = 0;
                    currCustomer = null;
                    currOrderElem = null;
                    transitioning = false;
                    collidedElem = null;
                    console.log(currCustomer);
                }, this);
                
                //reset all variables
                        
            } else {
                currPlace++;
                currOrderElem.destroy();
                currOrderElem = currThis.add.sprite(400, 60, currCustomerOrder[currPlace]);
                currOrderElem.alpha = 0;

                currThis.add.tween(currOrderElem).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
                sandwichViewElements.push(currOrderElem);

            }
        
        }
        
    }, 1);
    
},

BlueRoom.Game.prototype.sandwichComplete= function () {
    this.toCashier("sandwich");
},

BlueRoom.Game.prototype.sandwichUpdate= function () {
    this.physics.arcade.collide(movableElements);
    this.physics.arcade.collide(movableElements, platform);
    
    if (sandwichLine.length != 0 && currCustomer == null) {
        currCustomer = sandwichLine[0];
        currCustomerStatusBar = new CustomerStatusBar(currCustomer, 250, 10);
        sandwichViewElements.push(currCustomerStatusBar.barSprite);
        //currCustomerOrder.push('bottom_bun');
        console.log(currCustomer.order);
        currCustomerOrder.push('bottom_' + currCustomer.order.bread.type);
        for (var i=0; i<currCustomer.order.ingreds.length; i++) {
            currCustomerOrder.push(currCustomer.order.ingreds[i].type);
        }
        //currCustomerOrder.push('top_bun');
        currCustomerOrder.push('top_' + currCustomer.order.bread.type);
        this.showNeutral();
        speechBubble.visible = true;
    }
    
    if (currCustomer != null && currOrderElem == null) {
        var f = currCustomerOrder[0];
        currOrderElem = this.add.sprite(400, 60, f);
        currOrderElem.alpha = 0;

        this.add.tween(currOrderElem).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        sandwichViewElements.push(currOrderElem);
    }
    
    if (!stopUpdate) {
        var tempMov = [];
        for(var i=0; i<movableElems.length; i++) {

            if(movableElems[i].overlap(dropZone) && (movableElems[i].body.touching.down)){
                stopUpdate = true;
                
                var e = movableElems[i];
                movableElems.splice(i, 1);
                i--;
                window.setTimeout(function(){
                    e.body.moves = false;
                    if (transitioning) {
                        nonSandElem = e;
                    }else if (currCustomer != null) {
                        collidedElem = e;
                    } else {
                        nonSandElem = e;
                    }
                    stopUpdate = false;
                }, 1);
            } 
        }
    }
};


