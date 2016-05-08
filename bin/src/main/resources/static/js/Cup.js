function Cup(cupSize, cup, drink, syrup, ice, x, y) {
    this.group = currThis.game.add.group();
    this.startX = x;
    this.startY = y;
    this.cupSize = cupSize;
    this.group.x = x;
    this.group.y = y;
	this.cup = currThis.game.add.sprite(0, 0, cup);
	this.cup.tint = 0xe6f2ff;
    this.drink = currThis.game.add.sprite(0, 0, drink);
    this.syrup = currThis.game.add.sprite(0, 0, syrup);
    this.ice = currThis.game.add.sprite(0, 0, ice);
    this.ice.tint = 0x80d4ff;
    this.group.add(this.cup);
    this.group.add(this.drink);
    this.group.add(this.syrup);
    this.group.add(this.ice);
    this.drink.visible = false;
    this.syrup.visible = false;
    this.ice.visible = false;
    this.lastX;
    this.lastY;

    this.cup.anchor.setTo(0.5, 0.5);
    this.drink.anchor.setTo(0.5, 0.5);
    this.syrup.anchor.setTo(0.5, 0.5);
    this.ice.anchor.setTo(0.5, 0.5);

    this.setUpInteractions();
}

Cup.prototype = {
	addDrink:function(){
		this.drink.visible = true;
	},

	addSyrup: function(){
		this.syrup.visible = true;
	},

	addIce: function(){
		this.ice.visible = true;
	},

    setUpInteractions:function(){

        this.cup.inputEnabled = true;
        this.cup.input.enableDrag();
        this.cup.events.onInputOver.add(this.onOver, this);
        this.cup.events.onInputOut.add(this.onOut, this);
        this.cup.events.onDragStart.add(this.onDragStart, this);
        this.cup.events.onDragUpdate.add(this.onDragUpdate, this);
        this.cup.events.onDragStop.add(this.onDragStop, this);
    },

    removeInteractions: function(){
    	this.cup.inputEnabled = false;
    },

    restartInteractions: function(){
    	this.cup.inputEnabled = true;

    },

    onOver: function(sprite, pointer) {
        sprite.tint = 0xffffff;
    
    },
    
    onOut: function(sprite, pointer) {
        sprite.tint = 0xe6f2ff;
    },
    
    onDragStart : function(sprite, pointer) {
        currCup = this;
    	this.cup.moves = false;
        dragPosition.set(this.group.x, this.group.y);
      
        console.log("DRAGGING CUP");
		this.group.children.forEach(function(cup){
		    cup.anchor.setTo(0.5,0.5);
		});
    },

    onDragUpdate: function(sprite, pointer){
    	this.group.x = pointer.x;
        this.group.y = pointer.y; 
        this.cup.x = 0;
        this.cup.y = 0;  
    },
    
    onDragStop: function(sprite, pointer) {
    	sprite.tint = 0xe6f2ff;
        if(sprite.overlap(iceMachine)){
	        this.cupDropZone(iceX);
        } else if(sprite.overlap(drinkDispenser)){
        	this.cupDropZone(drinkX);
        } else if (sprite.overlap(syrupDispenser)){
        	this.cupDropZone(syrupX);
        } else if(sprite.overlap(drinkDropZone)){
            console.log(currCoffeeCustomer);
            if (currCoffeeCustomer == null) {
                currThis.game.add.tween(this.group).to( { x: dragPosition.x, y: dragPosition.y}, 500, "Back.easeOut", true);
            } else {
            	var thisCup = this;
            	this.group.children.forEach(function(cup){
    			    cup.anchor.setTo(0.5,1);
    			});      
            	this.group.x = endX;
            	this.group.y = lineY;
            	currThis.enableCups();
            	var t = currThis.add.tween(this.group).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            	t.onComplete.add(function () {
            		thisCup.group.destroy();
            		currThis.enableCups();
            		currCup= null;
            	});
                currThis.giveCoffeeToCustomer();
            }   
        }else {
        	currThis.game.add.tween(this.group).to( { x: dragPosition.x, y: dragPosition.y}, 500, "Back.easeOut", true);
        }
    },

    cupDropZone:function(x){
    	currThis.newCup(this.cupSize);
		this.group.children.forEach(function(cup){
		    cup.anchor.setTo(0.5,1);
		});        	
		this.group.x = x;
    	this.group.y = lineY;
    	currThis.disableCups(this.cupSize);
    }
};