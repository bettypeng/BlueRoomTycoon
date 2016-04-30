var EMPLOYEEINTERVAL = 80;

function Employee(){


}


Employee.prototype = {

    setUpInteractions:function(){
        // this.cust.inputEnabled = true;
        // this.cust.input.enableDrag();
        // // this.cust.draggable = false;
        // this.cust.events.onInputOver.add(this.onOver, this);
        // this.cust.events.onInputOut.add(this.onOut, this);
        // this.cust.events.onDragStart.add(this.onDragStart, this);
        // this.cust.events.onDragUpdate.add(this.onDragUpdate, this);
        // this.cust.events.onDragStop.add(this.onDragStop, this);
    },

    onOver: function(sprite, pointer) {
        sprite.tint = 0x00cc00;
    
    },
    
    onOut: function(sprite, pointer) {
        sprite.tint = 0xffffff;
    },
    
    onDragStart : function(sprite, pointer) {
        // this.cust.moves = false;
        // dragPosition.set(sprite.x, sprite.y);
        // this.hideDollar();
        // this.barSprite.visible = false;
        // this.moving = true;
        // console.log("DRAGGING THE SPRITE:  " + this.moving);
    },

    onDragUpdate: function(sprite, pointer){
    },
    
    onDragStop: function(sprite, pointer) {
        var currThis = this;
        // setTimeout(function(){
        //     this.moving = false;
        // }, 500);
        // console.log("NOT DRAGGING THE SPRITE:  " + this.moving);
        // this.moving = false;
        // console.log("NOT DRAGGING THE SPRITE:  " + this.moving);

        // this.barSprite.visible = true;
        // this.sprite.x = pointer.x;
        // this.sprite.y = pointer.y; 
        // this.cust.x = 0;
        // this.cust.y = 5;    

    
        // if (!sprite.overlap(dropZone) || sprite.overlap(platform))
        // {
        //     this.add.tween(this.sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
        // }
        if(sprite.overlap(currThis.sandwichStation)){
        //     console.log("HELLO");
        //     sprite.input.draggable = false;
        //     //this.renewTopping(curr.x, curr.y, curr.key);
        //     currThis.cashCustomerOut(this);
        }
        // else{
        //     sign.visible = true;
        // }
    
    },

   	createBar : function(){
     //    var currCust = this;
    	// this.barTimer = setInterval(function(){
     //        if(managerView && !currCust.moving){
     //      		currCust.happinessBarProgress-=0.1;
     //        }
     //  	}, CUSTOMERHAPPINESSINTERVAL);

     //    this.myTimer = setInterval(function(){
     //        if(managerView){
     //            currCust.myupdate();
     //        }
     //    }, 10);
	},

 	myupdate: function() {
        // // ensure you clear the context each time you update it or the bar will draw on top of itself
        // this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);
        
        // // some simple colour changing to make it look like a health bar
        // if (this.happinessBarProgress < 10) {
        //    this.bar.context.fillStyle = '#f00';   
        // }
        // else if (this.happinessBarProgress < 20) {
        //     this.bar.context.fillStyle = '#ff0';
        // }
        // else {
        //     this.bar.context.fillStyle = '#0f0';
        // }

        // if(this.happinessBarProgress < 0){
        //     this.leaveBlueRoom();
        //     clearInterval(this.barTimer);
        //     clearInterval(this.myTimer);
        // }
        
        // // draw the bar
        // this.bar.context.fillRect(0, 0, this.happinessBarProgress, 8);
        
        // // important - without this line, the context will never be updated on the GPU when using webGL
        // this.bar.dirty = true;
    }

};