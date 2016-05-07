var EMPLOYEEINTERVAL = 300;
//sandwich station coords
var SSX = 750;
var SSY = 107;
//bakery station coords
var BSX = 500;
var BSY = 107;
//coffee station coords
var CSX = 250;
var CSY = 108;

var sandwichStationFilled = false;
var bakeryStationFilled = false;
var coffeeStationFilled = false;

var currThis = this;


function Employee(name){
    this.name = name;

    this.employeeSprite = currThis.game.add.group();

    var e = currThis.game.add.sprite(0, 0, 'employee');
    this.e = e;
    e.anchor.setTo(0.5, 0.5);
    this.employeeSprite.add(e);

    this.workHoursProgress = 30;
    this.workBar = currThis.add.bitmapData(30,5);
    this.workHoursSprite = currThis.game.add.sprite(0, -75, this.workBar);
    this.workHoursSprite.anchor.setTo(0.5, 0.5);
    this.employeeSprite.add(this.workHoursSprite);

    this.employeeSprite.x = 440;
    this.employeeSprite.y = 500;

    this.station;
    this.working = false;
    this.recharging = false;
    this.workHours = 8;
    this.numStationSwitches = 0; //to discourage just switching your employee back and forth between stations

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
        this.working = false;
        this.recharging = false;
        this.unstationEmployee();
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

        if(sprite.overlap(currThis.sandwichStation) && !sandwichStationFilled){
            this.placeEmployee(SSX, SSY);
            this.station = "sandwich";
        }
        else if(sprite.overlap(currThis.bakeryStation) && !bakeryStationFilled){
            this.placeEmployee(BSX, BSY);
        }
        else if(sprite.overlap(currThis.coffeeStation) && !coffeeStationFilled){
            this.placeEmployee(CSX, CSY);
        }
        else if (sprite.overlap(currThis.employeeBreakStation)){
            console.log("TAKING A BREAK");
            this.working = false;
            this.recharging = true;
            this.numStationSwitches = 0;
        } else{
            this.working = false;
            this.recharging = false;
        }

        this.stationEmployee();
    },

    placeEmployee: function(x, y){
        this.numStationSwitches++;
        if(this.numStationSwitches > 1){
            this.workHoursProgress/=2;
        }
        this.employeeSprite.x = x;
        this.employeeSprite.y = y; 
        this.e.loadTexture('employeeHalf');
        this.working = true;
        this.recharging = false;
    },

    stationEmployee: function(){
        var currEmployee = this;
        if(currEmployee.employeeSprite.x == SSX && currEmployee.employeeSprite.y==SSY){
            console.log("SANDWICH STATION FILLED");
            this.station = "sandwich";
            sandwichStationFilled = true;
            console.log(this);
            atSandwichStation = this;
            game.disableButton(currThis.sandwichButton);
        } 
        if(currEmployee.employeeSprite.x == BSX && currEmployee.employeeSprite.y==BSY){
            console.log("BAKERY STATION FILLED");
            this.station = "bakery";
            bakeryStationFilled = true;
            atBakeryStation = this;
            game.disableButton(currThis.bakeryButton);
        }
        if(currEmployee.employeeSprite.x == CSX && currEmployee.employeeSprite.y==CSY){
            console.log("COFFEE STATION FILLED");
            this.station = "coffee";
            coffeeStationFilled = true;
            atCoffeeStation = this;
            game.disableButton(currThis.coffeeButton);
        }
    },

    unstationEmployee: function(){
        var currEmployee = this;
        if(currEmployee.employeeSprite.x == SSX && currEmployee.employeeSprite.y==SSY){
            console.log("SANDWICH STATION UNFILLED");
            this.station = null;
            sandwichStationFilled = false;
            atSandwichStation = null;
            game.enableButton(currThis.sandwichButton);
        } 
        if(currEmployee.employeeSprite.x == BSX && currEmployee.employeeSprite.y==BSY){
            console.log("BAKERY STATION UNFILLED");
            this.station = null;
            bakeryStationFilled = false;
            atBakeryStation = null;
            game.enableButton(currThis.bakeryButton);
        }
        if(currEmployee.employeeSprite.x == CSX && currEmployee.employeeSprite.y==CSY){
            console.log("COFFEE STATION UNFILLED");
            this.station = null;
            coffeeStationFilled = false;
            atCoffeeStation = null;
            game.enableButton(currThis.coffeeButton);
        }
    },

    createBar : function(){
        var currEmployee = this;
        var myEmployee = this;
        this.workTimer = setInterval(function(){
            if(myEmployee.working && !dayEndView){
                console.log("decrementing worker satisfaction");
                if(currEmployee.workHoursProgress>0){
                    currEmployee.workHoursProgress-=0.1;
                }
            } else if(myEmployee.recharging && !dayEndView){
                console.log("incrementing worker satisfaction");
                if(currEmployee.workHoursProgress<30){
                    currEmployee.workHoursProgress+=0.1;
                }
            }
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
            // clearInterval(this.workTimer);
            // clearInterval(this.myTimer);
        }
        
        // draw the bar
        this.workBar.context.fillRect(0, 0, this.workHoursProgress, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.workBar.dirty = true;
    },

    discard: function(){
        this.name = null;

        this.employeeSprite.children.forEach(function(item){
            item.destroy();
        });
        this.employeeSprite.destroy();      

        this.workHoursProgress = null;
        this.workBar = null;
        this.working = null;
        this.recharging = null;
        this.workHours = null;
        this.numStationSwitches = null;

        clearInterval(this.workTimer);
        clearInterval(this.myTimer);
    }

};