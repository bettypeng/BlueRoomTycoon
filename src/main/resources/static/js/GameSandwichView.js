
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

// var currCustomer = ["bottom_bun", "roast_beef", "cheese", "lettuce", "top_bun"];
var currCustomer = null;
var currOrderElem = null;
var currPlace = 0;
var currOrder;
var currSandwich = [];
var currSandSprites = [];
var currDelts = {};
var firstX;
var collidedElem = null;
var stopUpdate = false;

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

        //BlueRoom.Game.prototype.create.call(this);
        var bg = this.add.sprite(0, 0, 'whiteBg');
        sandwichViewElements.push(bg);
        platform = this.add.sprite(0, 450, 'whiteBg');
        var swbg = this.add.sprite(0, 0, 'sandwichBg2');
        sandwichViewElements.push(swbg);

        this.physics.arcade.enable(platform);
        platform.body.immovable = true;
        platform.body.moves = false;
        sandwichViewElements.push(platform);

        
        dropZone = this.add.sprite(865, 5, 'dropzone');
        sandwichViewElements.push(dropZone);

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

        
        // staticElements.forEach(function(item) {
        //     myGame.setUpInteractions(item);
        // });
        
        // movableElements.forEach(function(item) {
        //     myGame.setUpInteractions(item);
        // });
        
        //  Make them all input enabled
        // staticElements.setAll('inputEnabled', true);
        // staticElements.callAll('input.enableDrag', 'input');

        // movableElements.setAll('inputEnabled', true);
        // movableElements.callAll('input.enableDrag', true);
    
        //  And allow them all to be dragged
        // movableElements.callAll('input.enableDrag', 'input');
        // movableElements.setAll('body.collideWorldBounds', true);
        //
        //elements.setAll('body.gravity.y', 2000);



    };
    
    BlueRoom.Game.prototype.showSandwichView= function(){
        sandwichViewElements.forEach(function(item){
            item.visible = true;
        });
        // sandwichViewElements.setAll('visible', true);
    };
    
    
    BlueRoom.Game.prototype.hideSandwichView= function(){
         sandwichViewElements.forEach(function(item){
            item.visible = false;
        });
        //sandwichViewElements.destroy();
        // sandwichViewElements.forEach(function(item){
        //     item.destroy();
        // });
        //sandwichViewElements.callAll('destroy');
        //sandwichViewElements.setAll('visible', false);

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
    
        sprite.tint = 0xff7777;
    
    },
    
    BlueRoom.Game.prototype.onOut= function(sprite, pointer) {
    
        sprite.tint = 0xffffff;
    
    },
    
    BlueRoom.Game.prototype.onDragStart = function(sprite, pointer) {
        var dragOut = staticElementMap[sprite.key];
        sprite.loadTexture(dragOut, 0);
        console.log("DRAGGING");
        dragPosition.set(sprite.x, sprite.y);
    },
    
    BlueRoom.Game.prototype.onDragStop= function(sprite, pointer) {
        dragging = false;
        sprite.body.moves = true;
    
        if (!sprite.overlap(dropZone) || sprite.overlap(platform))
        {
            this.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
             window.setTimeout(function(){
                 sprite.loadTexture(movableElementMap[sprite.key]);
                }, 600);
        }
        else{
            sprite.body.gravity.y = 1000;
            sprite.input.draggable = false;
            // var rb = staticElements.create(270, 400, 'roast_beef');
            // var movableRb = movableElements.create(270, 400, 'roast_beef');
            var curr = elementMap[sprite.key];
            this.renewTopping(curr.x, curr.y, curr.key);
        }
    
    },
    
    // getFrontCustomer: function() {
        
    //     var postParameters = {type: "sandwich"};
    
    //     $.post("/line", postParameters, function(responseJSON) {
    
    //         var responseObject = JSON.parse(responseJSON);
    //         currCustomer = responseObject.customer;
    
    //         //can get the order from this customer using frontCust.order which we can
    //         //then display on the screen
            
    //         //call showing of first item on screen
    //         //if station == sandwich: call sanwich view's method for showing
    //         //thing
    //     });
        
    // },
    
    BlueRoom.Game.prototype.orderElems= function () {
        console.log("orderElems");
        var currThis = this;
        
        window.setInterval(function() {
            if (currCustomer == null)  {
                return;
            }
            
            if (collidedElem != null) {
                var item = collidedElem;
                // console.log(collidedElem);
                collidedElem = null;
                // console.log(collidedElem);
                if (currSandwich.length == 0) {
                    firstX = item.x;
                }
                currSandwich.push(item.key);
                currSandSprites.push(item);
                currDelts[item.key] = Math.abs((item.x-firstX)/100);
                
                if (currPlace == (currCustomer.order.ingreds.length-1)) {
                    currOrderElem.destroy();
                    for (var i=0; i<currSandSprites.length; i++) {
                        movableElements.remove(currSandSprites[i]);
                    }
                    currThis.sandwichComplete();
                    
                    currCustomer.ingredients = currSandwich;
                    currCustomer.ingMap = currDelts;
                    //get next customer
                    currPlace = 0;
                    currSandwich = [];
                    currDelts = {};
                    currCustomer = null;
                    currOrderElem = null;
                    
                    //reset all variables
                            
                } else {
                    // console.log("here");
                    currPlace++;
                    currOrderElem.destroy();
                    currOrderElem = currThis.add.sprite(200, 50, currCustomer.order.ingreds[currPlace].type);
                    sandwichViewElements.push(currOrderElem);

                }
            
            }
            
        }, 1000);
        
    },
    
    BlueRoom.Game.prototype.sandwichComplete= function () {
        this.toCashier();
    },

    BlueRoom.Game.prototype.sandwichUpdate= function () {
        this.physics.arcade.collide(movableElements);
        this.physics.arcade.collide(movableElements, platform);
        // console.log(currPlace);
        
        if (sandwichLine.length != 0 && currCustomer == null) {
            currCustomer = sandwichLine[0];
            console.log(currCustomer);
        }
        
        if (currCustomer != null && currOrderElem == null) {
            var f = currCustomer.order.ingreds[0].type;
            currOrderElem = this.add.sprite(200, 50, f);
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
                        collidedElem = e;
                        stopUpdate = false;
                    }, 1);
                } 
                // else {
                // }
            }
            // movableElems = tempMov.slice(0);
            // movableElements.forEach(function(item) {
                
            //     if(item.overlap(dropZone) && (item.body.touching.down)){
            //         stopUpdate = true;
            //         window.setTimeout(function(){
            //             item.body.moves = false;
            //             movableElements.remove(item);
            //             collidedElem = item;
            //             console.log("set collided");
            //             stopUpdate = false;
            //         }, 1);
            //     }
            // });
        }
    };
    


