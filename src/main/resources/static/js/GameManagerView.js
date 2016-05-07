var customerGroup;
var numSandwich;
var numBakery;
var numCoffee;
var numCustomer;
var leaving;
var sandwichLine = new Array();
var bakeryLine = new Array();
var coffeeLine = new Array();
var cashierLine = new Array();
var managerCounter = 0;
var NUMBEROFSTATIONS = 1;
var NUMBEROFEMPLOYEES = 0;
var CUSTOMERINTERVAL = 500; //500 standard
var employeeGroup;
var employeeMap = {};
var isBlueRoomOpen = true;

var empMakingSandwich = false;
var empMakingCoffee = false;
var empMakingMuffin = false;

var atSandwichStation = null;
var atBakeryStation = null;
var atCoffeeStation = null;

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
    this.bakeryStation.visible = false;
    this.coffeeStation.visible = false;

    var smallstyle = { font: "10px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 100, align: "center" };
    this.employeeBreakStation = this.add.sprite(10, 430, 'employeeBreakStation');
    this.game.add.text(35, 435, "EMPLOYEE\nBREAK\nSTATION", smallstyle);
    this.cashier = this.add.sprite(300, 500, 'dollar');
    this.game.add.text(305, 565, "DRAG HERE TO\nCASH OUT!", smallstyle);
    
    var style = { font: "30px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 300, align: "center" };
    numSandwich = 0;
    numBakery = 0;
    numCoffee = 0;
    numCustomer= 0;
    leaving = false;
    customerGroup = this.add.group();
    employeeGroup = this.add.group();


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

    // var emp = new Employee("eric");
    // employeeList.push(emp.employeeSprite);

    // for(var i = 0; i < 12; i++){
    //     var cust = this.add.sprite(this.bakeryLinePos['x'][i], this.bakeryLinePos['y'][i], 'customer');
    //     cust.anchor.setTo(0.5, 0.5);

    // }

    // for(var i = 0; i < 12; i++){
    //     var cust = this.add.sprite(this.coffeeLinePos['x'][i], this.coffeeLinePos['y'][i], 'customer');
    //     cust.anchor.setTo(0.5, 0.5);
    // }
    
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
        currThis.statusAlert(customerAlert);
    }, 500);

    setInterval(function() {
        managerCounter++;
        // console.log(managerCounter);
        // console.log(CUSTOMERINTERVAL);
        if(managerCounter % CUSTOMERINTERVAL == 0 && numSandwich<15 && numCoffee<11 && numBakery<11 && isBlueRoomOpen){
            getCustomer();
            currThis.statusAlert(customerAlert);
        }
    }, 1);

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
            myGame.moveLineUp(bakeryLine, myGame.bakeryLinePos, 2000);
            myGame.moveLineUp(coffeeLine, myGame.coffeeLinePos, 2000);
        }
    }, 100);

    
};

BlueRoom.Game.prototype.abandonLine = function(customer){
        var myGame = this;

        this.statusAlert(leavingAlert);

        // myGame.deleteCurrSandwich(customer);
        leaving = true;
        //var outer = this;
        var c = customer;
        var curr;
        if (c.station == "sandwich") {
            leaveHandler("sandwich");
            curr= sandwichLine.shift();
            numSandwich--;
        } else if (c.station == "bakery") {
            leaveHandler("bakery");
            curr= bakeryLine.shift();
            numBakery--;
        } else {
            leaveHandler("coffee");
            curr= coffeeLine.shift();
            numCoffee--;
        }
        // var curr= sandwichLine.shift();
        c.inLine = false;
        var currCustomer = c.sprite;
        //left= currCustomer;

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

    BlueRoom.Game.prototype.toCashier= function(station){
        var curr;

        if (station == "sandwich") {
            if(sandwichLine.length>0){
                curr= sandwichLine.shift();
                numSandwich--;
            } else {
                return;
            }
        } else if (station == "bakery") {
            if(bakeryLine.length>0){
                curr= bakeryLine.shift();
                numBakery--;
            } else {
                return;
            }
        } else {
           if(coffeeLine.length>0){
                curr= coffeeLine.shift();
                numCoffee--;
            } else {
                return;
            } 
        }

        curr.inLine = false;
        curr.moving = true;
        var currCustomer = curr.sprite;
        //currCustomer.destroy();
        // var xpos = this.cashierLinePos['x'][numCashier];
        // var ypos = this.cashierLinePos['y'][numCashier];
        var xpos = currThis.game.rnd.integerInRange(300, 700);
        var ypos = currThis.game.rnd.integerInRange(300, 500);
        var tween = currThis.add.tween(currCustomer).to( { x: xpos, y: ypos }, 2000, null, true);
        tween.onComplete.add(onCashierMoveComplete, currThis);
        // numCashier++;

        
        function onCashierMoveComplete(){
            curr.moving = false;
        //     cashierLine.push(curr);
            //this.shiftFirstInLine(sandwichLine, this.sandwichLinePos);
            //this.moveLineUp(sandwichLine, this.sandwichLinePos, 5000);
            curr.flashDollar();
            curr.setUpInteractions();
            currThis.statusAlert(checkoutAlert);

        }
           // cashierLine.push(currCustomer);
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
    if (c.employee != null) {
        employeePurchase(c.employee, c.id, c.happinessBarProgress/30, true);
    } else {
        if (c.station == "sandwich") {
            sandwichPurchase(c.ingredients, c.ingMap, "wheat", c.id, c.happinessBarProgress/30, true);
        } else if (c.station == "coffee") {
            coffeePurchase(c.drinkType, c.iced, c.drinkSize, c.drinkFlavor, c.id, c.happinessBarProgress/30, true);
        } else {
            bakeryPurchase(c.muffinType, c.id, c.happinessBarProgress/30, true);
        }   
    }
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
    this.statusAlert(stealingAlert);

    var c = customer;
    c.cust.tint = 0xff7777;
    if (c.employee != null) {
        employeePurchase(c.employee, c.id, c.happinessBarProgress/30, false);
    } else {
        if (c.station == "sandwich") {
            sandwichPurchase(c.ingredients, c.ingMap, "wheat", c.id, c.happinessBarProgress/30, false);
        } else if (c.station == "coffee") {
            coffeePurchase(c.drinkType, c.drinkIced, c.drinkSize, c.drinkFlavor, c.id, c.happinessBarProgress/30, false);
        } else {
            bakeryPurchase(c.muffinType, c.id, c.happinessBarProgress/30, false);
        } 
    }
    leaving = true;
    var tween = this.add.tween(customer.sprite).to( { x: 450, y: 700 }, 1000, null, true);
    tween.onComplete.add(onLeaveMoveComplete, this);
    function onLeaveMoveComplete(){
        console.log("Steal decrement customer!");
        customer.sprite.visible = false;
        clearInterval(customer.barTimer);
        clearInterval(customer.myTimer);
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
    // managerCounter++;
    // if(managerCounter % CUSTOMERINTERVAL == 0 && numSandwich<15 && numCoffee<11 && numBakery<11 && isBlueRoomOpen){
    //     getCustomer();
    // }

    if (sandwichStationFilled && !empMakingSandwich && sandwichLine.length != 0) {
        empMakingSandwich = true;
        getEmployeeInterval("sandwich", atSandwichStation, sandwichLine[0]);
    }
    if (coffeeStationFilled && !empMakingCoffee && coffeeLine.length != 0) {
        empMakingCoffee = true;
        getEmployeeInterval("coffee", atCoffeeStation, coffeeLine[0]);
    }
    if (bakeryStationFilled && !empMakingMuffin && bakeryLine.length != 0) {
        empMakingMuffin = true;
        getEmployeeInterval("bakery", atBakeryStation, bakeryLine[0]);
    }
    
};

BlueRoom.Game.prototype.employeeMakeProduct= function (stationName, employee, first, interval) {
    // makingProduct = true;
    var currThis = this;

    setTimeout(function(){
        console.log("making product");

        // if (atStation != employee) {
        var frontCust;
        if (stationName == "sandwich") {
            if (atSandwichStation != employee || first != sandwichLine[0]) {
                empMakingSandwich = false;
                return;
            }
            frontCust = sandwichLine[0];
        } else if (stationName == "coffee") {
            if (atCoffeeStation != employee || first != coffeeLine[0]) {
                empMakingCoffee = false;
                return;
            } 
            frontCust = coffeeLine[0];         
        } else {
            if (atBakeryStation != employee || first != bakeryLine[0]) {
                empMakingMuffin = false;
                return;
            } 
            frontCust = bakeryLine[0];          
        }

        frontCust.employee = employee.name;

        currThis.toCashier(stationName);

        if (stationName == "sandwich") {
            empMakingSandwich = false;
        } else if (stationName == "coffee") {
            empMakingCoffee = false;
        } else {
            empMakingMuffin = false;
        }

    }, interval*1000)
}

BlueRoom.Game.prototype.newCustomerReturned = function(customer){
    currThis.customer = customer.sprite;
    customerGroup.add(currThis.customer);
    numCustomer++;
    var posx;
    var posy;
    if (customer.station == "sandwich") {
        numSandwich++;
        posx = currThis.sandwichLinePos['x'][numSandwich];
        posy = currThis.sandwichLinePos['y'][numSandwich];
    } else if (customer.station == "bakery") {
        numBakery++;
        posx = currThis.bakeryLinePos['x'][numBakery];
        posy = currThis.bakeryLinePos['y'][numBakery];
    } else {
        numCoffee++;
        posx = currThis.coffeeLinePos['x'][numCoffee];
        posy = currThis.coffeeLinePos['y'][numCoffee];
    }
    
    customer.moving = true;
    var tween = currThis.add.tween(currThis.customer).to( { x: posx, y: posy }, 2000, null, true);
    tween.onComplete.add(onComplete, this);
    function onComplete(){
        customer.moving = false;
        if (customer.station == "sandwich") {
            sandwichLine.push(customer);
        } else if (customer.station == "bakery") {
            bakeryLine.push(customer);
        } else {
            coffeeLine.push(customer);
        }
        
    }
};

