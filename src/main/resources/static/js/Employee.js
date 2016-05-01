var EMPLOYEEINTERVAL = 200;

function Employee(){
    this.employeeSprite = currThis.game.add.group();

    var e = currThis.game.add.sprite(0, 0, 'employee');
    this.e = e;
    e.anchor.setTo(0.5, 0.5);
    this.employeeSprite.add(e);

    this.workHoursProgress = 30;
    //this.bar = this.game.add.bitmapData(30, 2);
    this.workBar = currThis.add.bitmapData(30,5);
    this.workHoursSprite = currThis.game.add.sprite(0, -75, this.workBar);
    this.workHoursSprite.anchor.setTo(0.5, 0.5);
    this.employeeSprite.add(this.workHoursSprite);

    this.employeeSprite.x = 440;
    this.employeeSprite.y = 500;
    this.station;
    this.workHours = 8;

    this.createBar();
    this.setUpInteractions();
}


Employee.prototype = {

    setUpInteractions:function(){
        this.e.inputEnabled = true;
        this.e.input.enableDrag();
        // // this.cust.draggable = false;
        this.e.events.onInputOver.add(this.onOver, this);
        this.e.events.onInputOut.add(this.onOut, this);
        this.e.events.onDragStart.add(this.onDragStart, this);
        this.e.events.onDragUpdate.add(this.onDragUpdate, this);
        this.e.events.onDragStop.add(this.onDragStop, this);
    },

    onOver: function(sprite, pointer) {
        sprite.tint = 0x99ccff;
    
    },
    
    onOut: function(sprite, pointer) {
        sprite.tint = 0xffffff;
    },
    
    onDragStart : function(sprite, pointer) {
        this.e.loadTexture('employee');
        this.e.moves = false;
        dragPosition.set(sprite.x, sprite.y);
        this.workHoursSprite.visible = false;
        console.log("DRAGGING EMPLOYEE");
    },

    onDragUpdate: function(sprite, pointer){

    },
    
    onDragStop: function(sprite, pointer) {
        // var currThis = this;
        // setTimeout(function(){
        //     this.moving = false;
        // }, 500);
        // console.log("NOT DRAGGING THE SPRITE:  " + this.moving);
        console.log("NOT DRAGGING THE EMPLOYEE");

        this.workHoursSprite.visible = true;
        this.employeeSprite.x = pointer.x;
        this.employeeSprite.y = pointer.y; 
        this.e.x = 0;
        this.e.y = 0;    

    
        // if (!sprite.overlap(dropZone) || sprite.overlap(platform))
        // {
        //     this.add.tween(this.sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
        // }
        if(sprite.overlap(currThis.sandwichStation)){
            console.log("WORKING AT SANDWICH STATION");
            //sprite.input.draggable = false;
            this.employeeSprite.x = 750;
            this.employeeSprite.y = 107; 
            this.e.loadTexture('employeeHalf');

            //this.renewTopping(curr.x, curr.y, curr.key);

        }
        else{
        }
    
    },

    createBar : function(){
        var currEmployee = this;
        this.workTimer = setInterval(function(){
           // if(managerView){
                currEmployee.workHoursProgress-=0.1;
            //}
        }, EMPLOYEEINTERVAL);

        this.myTimer = setInterval(function(){
            //if(managerView){
                currEmployee.myupdate();
            //}
        }, 10);
    },


    myupdate: function() {
        // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.workBar.context.clearRect(0, 0, this.workBar.width, this.workBar.height);
        
        // some simple colour changing to make it look like a health bar
        if (this.workHoursProgress < 10) {
           this.workBar.context.fillStyle = '#f00';   
        }
        else if (this.workHoursProgress < 20) {
            this.workBar.context.fillStyle = '#ff0';
        }
        else {
            this.workBar.context.fillStyle = '#0f0';
        }

        if(this.workHoursProgress < 0){
            clearInterval(this.workTimer);
            clearInterval(this.myTimer);
        }
        
        // draw the bar
        this.workBar.context.fillRect(0, 0, this.workHoursProgress, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.workBar.dirty = true;
    }

};