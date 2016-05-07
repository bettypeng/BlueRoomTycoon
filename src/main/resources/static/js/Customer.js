var sign;
var CUSTOMERHAPPINESSINTERVAL = 80;
//var currThis = this;

function Customer(id, station, order){
    this.id = id;
    this.sprite = currThis.game.add.group();

    var cust = currThis.game.add.sprite(0, 5, 'customer');
    this.cust = cust;
    cust.anchor.setTo(0.5, 0.5);
    this.sprite.add(cust);

	this.happinessBarProgress = 30;
	//this.bar = this.game.add.bitmapData(30, 2);
	this.bar = currThis.add.bitmapData(30,5);
    this.barSprite = currThis.game.add.sprite(0, -60, this.bar);
    this.barSprite.anchor.setTo(0.5, 0.5);
    this.sprite.add(this.barSprite);

    this.employee = null; //this indicates when an employee has served this customer

    this.moving = true;
    this.cashedOut = false;
    this.sprite.x = 440;
    this.sprite.y = 675;
    this.station = station;
    this.order = order;
    this.happiness = 1;
    this.ingredients = null;
    this.ingMap = null;

    this.drinkType = null;
    this.drinkIced = null;
    this.drinkFlavor = null;
    this.drinkSize = null;

    this.muffinType = null;

    this.createBar();

    this.inLine = true;

}


Customer.prototype = {

    setUpInteractions:function(){
        this.cust.inputEnabled = true;
        this.cust.input.enableDrag();
        // this.cust.draggable = false;
        this.cust.events.onInputOver.add(this.onOver, this);
        this.cust.events.onInputOut.add(this.onOut, this);
        this.cust.events.onDragStart.add(this.onDragStart, this);
        this.cust.events.onDragUpdate.add(this.onDragUpdate, this);
        this.cust.events.onDragStop.add(this.onDragStop, this);
    },

    onOver: function(sprite, pointer) {
        sprite.tint = 0x00cc00;
    
    },
    
    onOut: function(sprite, pointer) {
        sprite.tint = 0xffffff;
    },
    
    onDragStart : function(sprite, pointer) {
        this.cust.moves = false;
        dragPosition.set(sprite.x, sprite.y);
        this.hideDollar();
        this.barSprite.visible = false;
        this.moving = true;
        console.log("DRAGGING THE SPRITE:  " + this.moving);
    },

    onDragUpdate: function(sprite, pointer){
    },
    
    onDragStop: function(sprite, pointer) {
        // var currThis = this;
        // setTimeout(function(){
        //     this.moving = false;
        // }, 500);
        // console.log("NOT DRAGGING THE SPRITE:  " + this.moving);
        this.moving = false;
        console.log("NOT DRAGGING THE SPRITE:  " + this.moving);

        this.barSprite.visible = true;
        this.sprite.x = pointer.x;
        this.sprite.y = pointer.y; 
        this.cust.x = 0;
        this.cust.y = 5;    

    
        // if (!sprite.overlap(dropZone) || sprite.overlap(platform))
        // {
        //     this.add.tween(this.sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
        // }
        if(sprite.overlap(currThis.cashier)){
            console.log("HELLO");
            sprite.input.draggable = false;
            //this.renewTopping(curr.x, curr.y, curr.key);
            currThis.cashCustomerOut(this);
        }
        else{
            sign.visible = true;
        }
    
    },

    hideDollar: function(){
        // this.sprite.remove(sign);
        sign.visible = false;
    },

    flashDollar: function(){
        sign = currThis.add.sprite(0, -80, 'dollarSign');
        sign.anchor.setTo(0.5, 0.5);
        this.sprite.add(sign);
        var counter = 0;
        var timer = setInterval(function(){
            if(counter%2 == 0){
                sign.loadTexture('dollarSign');
            }
            else{
                sign.loadTexture('dollarSignDark');
            }
            counter++;
        }, 100);
    },

   	createBar : function(){
        var currCust = this;
    	this.barTimer = setInterval(function(){
            if(!currCust.moving && !gamePaused){
                if(managerView){
                    currCust.happinessBarProgress-=0.1;
                } else {
                    currCust.happinessBarProgress-=0.01;
                }
            }
      	}, CUSTOMERHAPPINESSINTERVAL);

        this.myTimer = setInterval(function(){
            if(managerView){
                currCust.myupdate();
            }
        }, 10);
	},

    stopBar : function() {
        clearInterval(this.barTimer);
        clearInterval(this.myTimer);
    },

 	myupdate: function() {
        // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);
        
        // some simple colour changing to make it look like a health bar
        if (this.happinessBarProgress < 10) {
           this.bar.context.fillStyle = '#f00';   
        }
        else if (this.happinessBarProgress < 20) {
            this.bar.context.fillStyle = '#ff0';
        }
        else {
            this.bar.context.fillStyle = '#0f0';
        }

        if(this.happinessBarProgress < 0){
            this.leaveBlueRoom();
            clearInterval(this.barTimer);
            clearInterval(this.myTimer);
        }
        
        // draw the bar
        this.bar.context.fillRect(0, 0, this.happinessBarProgress, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;
    },

    leaveBlueRoom: function(){
        this.moving = true;
        if(!this.cashedOut){
            if(this.ingredients!=null || this.drinkType !=null || this.muffinType != null){
                currThis.steal(this);
                console.log("STEAL");
            }
            else{
                currThis.abandonLine(this);
                console.log("ABANDON");
            }
        }
    }

};