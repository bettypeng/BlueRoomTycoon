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

var happy;
var sad;
var neutral;
var sideEye;
var noface;
var glasses;
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


function Topping( x, y, key) {
    this.key = key;
    this.x = x;
    this.y = y;
}

// BlueRoom.GameSandwichView.prototype = {

BlueRoom.Game.prototype.createSandwichView= function () {
    var myGame = this;

    var bg = this.add.sprite(0, 0, 'whiteBg');
    sandwichViewElements.push(bg);
    platform = this.add.sprite(0, 450, 'whiteBg');

    happy = this.add.sprite(170, 0, "happy");
    sad = this.add.sprite(190, 20, "sad");
    neutral = this.add.sprite(200, 20, "neutral");
    noface = this.add.sprite(200, 20, "noface");
    glasses = this.add.sprite(200, 20, "glasses");
    sideEye = this.add.sprite(200, 0, "leaving");
    customerFace = this.add.sprite(200, 20, "neutral");
    speechBubble = this.add.sprite(350, -30, "speechBubble");
    var garbageCan = this.add.button(950, 495, 'trash', this.trashButton, this);
    exclamation = this.add.sprite(400, 40, 'exclamation');

    happy.visible = false;
    sad.visible = false;
    neutral.visible = false;
    sideEye.visible = false;
    noface.visible = false;
    glasses.visible = false;
    speechBubble.visible = false;
    exclamation.visible = false;
    customerFace.visible = false;

    sandwichViewElements.push(garbageCan);

    //BlueRoom.Game.prototype.create.call(this);
    var swbg = this.add.sprite(0, 0, 'sandwichBg2');
    sandwichViewElements.push(swbg);


    this.physics.arcade.enable(platform);
    platform.body.immovable = true;
    platform.body.moves = false;
    sandwichViewElements.push(platform);

    dropZone = this.add.sprite(930,  235, 'dropzone');
    dropZone.anchor.setTo(0.5, 0.5);

    sandwichViewElements.push(dropZone);

    mypointer = this.add.sprite(940, 45, 'pointer');
    mypointer.anchor.setTo(0.5, 0.5);
    this.add.tween(mypointer).to({y: 70}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
    mypointer.alpha = 0;
    sandwichViewElements.push(mypointer);

    staticElements = this.add.group();
    movableElements =  this.add.physicsGroup();
    
    this.newTopping(200, 320, 'top_bun', 'top_bun');
    this.newTopping(180, 400, 'bottom_bun', 'bottom_bun');
    this.newTopping(325, 420, 'roast_beef', 'roast_beef');
    this.newTopping(350, 310, 'turkey', 'turkey');
    this.newTopping(475, 315, 'ham', 'ham');
    this.newTopping(465, 420, 'cheese', 'cheese');
    this.newTopping(600, 320, 'lettuce', 'lettuce');
    this.newTopping(600, 425, 'tomato', 'tomato');
    this.newTopping(740, 425, 'cucumber', 'cucumber');
    this.newTopping(720, 325, 'onion', 'onion');

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
    this.changeSpriteFace(170, 0, "happy");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(200, 20, "neutral");
    } ,2000);
};

BlueRoom.Game.prototype.showNo = function() {
    this.changeSpriteFace(200, 20, "noface");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(200, 20, "neutral");
    } ,2000);
};

BlueRoom.Game.prototype.showGlasses = function() {
    this.changeSpriteFace(200, 20, "glasses");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(200, 20, "neutral");
    } ,2000);
};

BlueRoom.Game.prototype.showNeutral = function() {
    currThis.changeSpriteFace(200, 20, "neutral");
};

BlueRoom.Game.prototype.showSad = function() {
    this.changeSpriteFace(190, 20, "sad");
    var currThis = this;

    window.setTimeout(function() {
        if (transitioning) {
            return;
        }
        currThis.changeSpriteFace(200, 20, "neutral");
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
        this.showNeutral();
        speechBubble.visible = true;
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
    sandwichViewElements.push(rb);
    sandwichViewElements.push(movableRb);
    movableElems.push(movableRb);
    rb.anchor.setTo(0.5, 0.5);
    movableRb.anchor.setTo(0.5, 0.5);
    elementMap[movableRb.key] = new Topping(x, y, staticImg);
    this.newToppingHelper(rb, movableRb, movableImg);
};

BlueRoom.Game.prototype.renewTopping= function(x, y, key){
    var movable = movableElements.create(x, y, key);
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
    elementMap[transformImg] = new Topping(staticEl.x, staticEl.y, staticEl.key);
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

    sprite.tint = 0xcccccc;

},

BlueRoom.Game.prototype.onOut= function(sprite, pointer) {

    sprite.tint = 0xffffff;

},

BlueRoom.Game.prototype.onDragStart = function(sprite, pointer) {
    var dragOut = staticElementMap[sprite.key];
    sprite.loadTexture(dragOut, 0);
    dragPosition.set(sprite.x, sprite.y);
    mypointer.alpha = 1;
},

BlueRoom.Game.prototype.onDragStop= function(sprite, pointer) {
    dragging = false;
    sprite.tint = 0xffffff;
    sprite.body.moves = true;
    mypointer.alpha = 0;

    if (!sprite.overlap(dropZone) || sprite.overlap(platform))
    {
        this.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
         window.setTimeout(function(){
             sprite.loadTexture(movableElementMap[sprite.key]);
            }, 600);
    }
    else{
        if ((currCustomer != null) && (currCustomerOrder[0] == currOrderElem.key)) {
            this.add.tween(sprite).to( { x: dropZone.x }, 500, null, true);
        }
        sprite.body.gravity.y = 1000;
        sprite.input.draggable = false;
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
            
                currThis.changeSpriteFace(200, 0, "leaving");
                var tw = currThis.add.tween(customerFace).to( { x: 1000 }, 3000, null, true);
                tw.onComplete.add(function () {
                    for (var i=0; i<currSandSprites.length; i++) {
                        movableElements.remove(currSandSprites[i]);
                    }
                    currThis.sandwichComplete();
                    currThis.noCustomer();
                
                    currCustomer.ingredients = currSandwich;
                    currCustomer.ingMap = currDelts;

                    if (incorrSandCount != 0 && incorrSandCount >= currCustomerOrder.length/2) {
                        currThis.steal(currCustomer);
                        clearInterval(currCustomer.barTimer);
                        clearInterval(currCustomer.myTimer);
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
        currCustomerOrder.push('bottom_bun');
        for (var i=0; i<currCustomer.order.ingreds.length; i++) {
            currCustomerOrder.push(currCustomer.order.ingreds[i].type);
        }
        currCustomerOrder.push('top_bun');
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


