var customerGroup;
var numSandwich;
var numCustomer;
var leaving;
var sandwichLine = new Array();
var cashierLine = new Array();
var managerCounter = 0;
var NUMBEROFSTATIONS = 1;
var NUMBEROFEMPLOYEES = 0;
var CUSTOMERINTERVAL = 500; //500 standard
var employeeList = new Array();
var isBlueRoomOpen = true;

var currThis = this;


BlueRoom.Game.prototype.createManager = function () {
    this.sandwichLinePos = {'x': new Array(), 'y':new Array()};
    this.bakeryLinePos = {'x': new Array(), 'y':new Array()};
    this.coffeeLinePos = {'x': new Array(), 'y':new Array()};

    // BlueRoom.Game.prototype.create.call(this);
    this.add.sprite(0, 0, 'managerBg');
    this.sandwichStation = this.add.sprite(652, 146, 'sandwichStation');
    this.bakeryStation = this.add.sprite(400, 152, 'bakeryStation');
    this.coffeeStation = this.add.sprite(130, 155, 'coffeeStation');
    // this.bakeryStation.visible = false;
    // this.coffeeStation.visible = false;

    var smallstyle = { font: "10px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 100, align: "center" };
    this.employeeBreakStation = this.add.sprite(10, 430, 'employeeBreakStation');
    this.game.add.text(35, 435, "EMPLOYEE\nBREAK\nSTATION", smallstyle);
    this.cashier = this.add.sprite(300, 500, 'dollar');
    this.game.add.text(305, 565, "DRAG HERE TO\nCASH OUT!", smallstyle);
    
    var style = { font: "30px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 300, align: "center" };
    numSandwich = 0;
    numCustomer= 0;
    leaving = false;
    customerGroup = this.add.group();

    for(var i = 0; i < 16; i++){
        var curve = this.game.rnd.integerInRange(8, 12);
        var dist = this.game.rnd.integerInRange(-5,5);
        var x = this.game.rnd.integerInRange(800+(i*curve), 850+(i*curve));
        var y = 200 + (i*25) + dist;
        this.sandwichLinePos['x'].push(x);
        this.sandwichLinePos['y'].push(y);
    }

    for(var i = 0; i < 12; i++){
        var dist = this.game.rnd.integerInRange(-5,5);
        var x = this.game.rnd.integerInRange(470, 540);
        var y = 200 + (i*25) + dist;
        this.bakeryLinePos['x'].push(x);
        this.bakeryLinePos['y'].push(y);
    }

    for(var i = 0; i < 12; i++){
        var curve = this.game.rnd.integerInRange(8, 12);
        var dist = this.game.rnd.integerInRange(-5,5);
        var x = this.game.rnd.integerInRange(240-(i*curve), 290-(i*curve));
        var y = 200 + (i*25) + dist;
        this.coffeeLinePos['x'].push(x);
        this.coffeeLinePos['y'].push(y);
    }

    for(var i = 0; i < 12; i++){
        var cust = this.add.sprite(this.bakeryLinePos['x'][i], this.bakeryLinePos['y'][i], 'customer');
        cust.anchor.setTo(0.5, 0.5);

    }

    for(var i = 0; i < 12; i++){
        var cust = this.add.sprite(this.coffeeLinePos['x'][i], this.coffeeLinePos['y'][i], 'customer');
        cust.anchor.setTo(0.5, 0.5);
    }
    
    // for(var j = 0; j < 5; j++){
    //     var xdiff = this.game.rnd.integerInRange(48, 51);
    //     var ydiff = this.game.rnd.integerInRange(-5,5);
    //     var x = this.game.rnd.integerInRange(240-(j*xdiff), 260-(j*xdiff));
    //     var y = 475 + ydiff;
    //     this.cashierLinePos['x'].push(x);
    //     this.cashierLinePos['y'].push(y);
    // }
 
    // for(var k = 0; k< 15; k++){
    //     var xdiff = this.game.rnd.integerInRange(13, 17);
    //     var ydiff = this.game.rnd.integerInRange(18,22);
    //     var x = this.game.rnd.integerInRange(40+(k*xdiff), 40+(k*xdiff));
    //     var y = this.game.rnd.integerInRange(460-(k*ydiff), 460-(k*ydiff));
    //     this.cashierLinePos['x'].push(x);
    //     this.cashierLinePos['y'].push(y);
    // }
  
    this.increment = 5 / this.game.width;  
    this.i = 0; 
    this.timerStopped = true;
    this.timer = null;

    setTimeout(function(){
        getCustomer();
    }, 500);

    this.startMovement();        
};

BlueRoom.Game.prototype.hideManagerView = function(){
    customerGroup.setAll('visible', false);
};

 
BlueRoom.Game.prototype.showManagerView = function(){
    customerGroup.setAll('visible', true);
};

BlueRoom.Game.prototype.startMovement= function(){
    var myGame = this;
    window.setInterval(function(){
        if(!leaving){
            myGame.moveLineUp(sandwichLine, myGame.sandwichLinePos, 2000);
        }
    }, 100);

    
};

BlueRoom.Game.prototype.abandonLine = function(customer){
        var myGame = this;

        myGame.deleteCurrSandwich(customer);
        leaveHandler();
        leaving = true;
        //var outer = this;
        var c = customer;
        var curr= sandwichLine.shift();
        c.inLine = false;
        var currCustomer = c.sprite;
        //left= currCustomer;
        numSandwich--;
        var tween = this.add.tween(currCustomer).to( { x: 450, y: 700 }, 2000, null, true);
        
        tween.onComplete.add(onLeaveMoveComplete, this);
        // function onLeft(){
        //     //outer.shiftFirstInLine(sandwichLine, this.sandwichLinePos);
        //     outer.onLeaveMoveComplete();
        // }

         function onLeaveMoveComplete(){
                customer.sprite.visible = false;
                numCustomer--;
                leaving = false;
            }
        
        //c = null;

    }

    BlueRoom.Game.prototype.toCashier= function(){
        if(sandwichLine.length>0){
            var curr= sandwichLine.shift();
            curr.inLine = false;
            curr.moving = true;
            var currCustomer = curr.sprite;
            //currCustomer.destroy();
            numSandwich--;
            // var xpos = this.cashierLinePos['x'][numCashier];
            // var ypos = this.cashierLinePos['y'][numCashier];
            var xpos = this.game.rnd.integerInRange(300, 700);
            var ypos = this.game.rnd.integerInRange(300, 500);
            var tween = this.add.tween(currCustomer).to( { x: xpos, y: ypos }, 2000, null, true);
            tween.onComplete.add(onCashierMoveComplete, this);
            // numCashier++;

            
            function onCashierMoveComplete(){
                curr.moving = false;
            //     cashierLine.push(curr);
                //this.shiftFirstInLine(sandwichLine, this.sandwichLinePos);
                //this.moveLineUp(sandwichLine, this.sandwichLinePos, 5000);
                curr.flashDollar();
                curr.setUpInteractions();
            }
           // cashierLine.push(currCustomer);
        }
    };
    
// BlueRoom.Game.prototype.onLeaveMoveComplete= function(){
//     //this.shiftFirstInLine(sandwichLine, this.sandwichLinePos);
//     leaving = false;
//     left.visible = false;
// };



// BlueRoom.Game.prototype.shiftFirstInLine= function(line, linePos){
//     if(line[0]!=null){
//         var xposy = linePos['x'][0];
//         var yposy = linePos['y'][0];
//         this.add.tween(line[0].sprite).to( { x: xposy, y: yposy }, 4000, "Back.easeOut", true);
//     }
// };

BlueRoom.Game.prototype.cashCustomerOut= function(customer){
        var c = customer;
        console.log(c);
        purchase("sandwich", c.ingredients, c.ingMap, "wheat", c.id, c.happinessBarProgress/30, true);
        leaving = true;
        var tween = this.add.tween(customer.sprite).to( { x: 450, y: 700 }, 1000, null, true);
        customer.moving = true;
        tween.onComplete.add(onLeaveMoveComplete, this);
        function onLeaveMoveComplete(){
            customer.sprite.visible = false;
            numCustomer--;
            leaving = false;
        }
};

BlueRoom.Game.prototype.steal = function(customer){
    var c = customer;
    c.cust.tint = 0xff7777;
    console.log(c);
    purchase("sandwich", c.ingredients, c.ingMap, "wheat", c.id, c.happiness, false);
    leaving = true;
    var tween = this.add.tween(customer.sprite).to( { x: 450, y: 700 }, 1000, null, true);
    tween.onComplete.add(onLeaveMoveComplete, this);
    function onLeaveMoveComplete(){
        customer.sprite.visible = false;
        numCustomer--;
        leaving = false;
    }
}

BlueRoom.Game.prototype.moveLineUp=function(line, linePos, speed){
    for(var i = 0; i< line.length; i++){
        var xpos = linePos['x'][i];
        var ypos = linePos['y'][i];
        this.add.tween(line[i].sprite).to( { x: xpos, y: ypos }, speed, "Back.easeOut", true);
    }
};

BlueRoom.Game.prototype.managerUpdate= function () {
    currThis = this;
    managerCounter++;
    if(managerCounter % CUSTOMERINTERVAL == 0 && numSandwich<15 && isBlueRoomOpen){
        getCustomer();
    }
    
};

BlueRoom.Game.prototype.newCustomerReturned = function(customer){
    currThis.customer = customer.sprite;
    customerGroup.add(currThis.customer);
    numSandwich++;
    numCustomer++;
    var posx = currThis.sandwichLinePos['x'][numSandwich];
    var posy = currThis.sandwichLinePos['y'][numSandwich];
    customer.moving = true;
    var tween = currThis.add.tween(currThis.customer).to( { x: posx, y: posy }, 2000, null, true);
    tween.onComplete.add(onComplete, this);
    function onComplete(){
        customer.moving = false;
        sandwichLine.push(customer);
    }
};

