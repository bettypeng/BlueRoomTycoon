
BlueRoom.GameManagerView = function (game) {
    this.bmd = null;
    // points arrays - one for x and one for y
    this.points = {
    'x': [440, 550],
    'y': [675, 400]
    };
    this.sandwichLinePos = {'x': new Array(), 'y':new Array()};
    this.cashierLinePos = {'x': new Array(), 'y':new Array()};

};


// BlueRoom.GameManagerView.prototype = Object.create(BlueRoom.Game.prototype);
// BlueRoom.GameManagerView.prototype.constructor = BlueRoom.GameManagerView();

var customerGroup;
var numSandwich;
var numCashier;
var leaving;
var left;
var sandwichLine = new Array();
var cashierLine = new Array();

var currThis = this;

// BlueRoom.GameManagerView.prototype = {

    BlueRoom.Game.prototype.createManager = function () {
        this.bmd = null;
        // points arrays - one for x and one for y
        this.points = {
        'x': [440, 550],
        'y': [675, 400]
        };
        this.sandwichLinePos = {'x': new Array(), 'y':new Array()};
        this.cashierLinePos = {'x': new Array(), 'y':new Array()};
        // BlueRoom.Game.prototype.create.call(this);
        this.add.sprite(0, 0, 'managerBg');
        this.cashierButton = this.add.button(300, 400, 'dollar', this.toLeaveBlueRoom, this);
        var smallstyle = { font: "10px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 100, align: "center" };
        this.game.add.text(305, 465, "CLICK TO\nCASH OUT!", smallstyle);
        
        var style = { font: "30px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: 300, align: "center" };
        this.game.add.text(682, 190, "SANDWICHES", style);
        numSandwich = 0;
        numCashier = 0;
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
        
        //var cashierLine = this.add.group();

        
        //cashierLine.create(350, 250, 'customer');
        for(var j = 0; j < 5; j++){
            var xdiff = this.game.rnd.integerInRange(48, 51);
            var ydiff = this.game.rnd.integerInRange(-5,5);
            var x = this.game.rnd.integerInRange(240-(j*xdiff), 260-(j*xdiff));
            var y = 475 + ydiff;
            this.cashierLinePos['x'].push(x);
            this.cashierLinePos['y'].push(y);
        }
        
     
        for(var k = 0; k< 15; k++){
            var xdiff = this.game.rnd.integerInRange(13, 17);
            var ydiff = this.game.rnd.integerInRange(18,22);
            var x = this.game.rnd.integerInRange(40+(k*xdiff), 40+(k*xdiff));
            var y = this.game.rnd.integerInRange(460-(k*ydiff), 460-(k*ydiff));
            this.cashierLinePos['x'].push(x);
            this.cashierLinePos['y'].push(y);
        }
      
        this.increment = 5 / this.game.width;  
        this.i = 0; 
        this.timerStopped = true;
        this.timer = null;
    
        this.startMovement();
        // Draw the path 
        // this.bmd = this.add.bitmapData(this.game.width/2, this.game.height/2);
        // this.bmd.addToWorld();
        // for (var i = 0; i < 1; i += this.increment) {
        //   var px = this.math.catmullRomInterpolation(this.points.x, i);
        //   var py = this.math.catmullRomInterpolation(this.points.y, i);
        //   this.bmd.rect(px, py, 3, 3, 'rgba(245, 0, 0, 1)');
        // } 
        
    };
    
    BlueRoom.Game.prototype.hideManagerView = function(){
        customerGroup.setAll('visible', false);
    };
    
     
    BlueRoom.Game.prototype.showManagerView = function(){
        customerGroup.setAll('visible', true);
    };
    
    BlueRoom.Game.prototype.startMovement= function(){
        var myGame = this;
        //var counter = 0;
        window.setInterval(function(){
            //if(managerView){
                //counter++;
                // if(counter%5 == 0){
                //     if(numCashier<20){
                //         myGame.toCashier();
                //     }
                // }
                // if(counter%15 ==0){
                //     myGame.toLeaveBlueRoom();
                // }
                myGame.moveLineUp(sandwichLine, myGame.sandwichLinePos, 4000);
                myGame.moveLineUp(cashierLine, myGame.cashierLinePos, 3000);

            //}
           
        }, 1000);

        
    };
    
    BlueRoom.Game.prototype.toCashier= function(){
        if(sandwichLine.length>0){
            var curr= sandwichLine.shift();
            var currCustomer = curr.sprite;
            //currCustomer.destroy();
            numSandwich--;
            var xpos = this.cashierLinePos['x'][numCashier];
            var ypos = this.cashierLinePos['y'][numCashier];
            var tween = this.add.tween(currCustomer).to( { x: xpos, y: ypos }, 5000, null, true);
            tween.onComplete.add(onCashierMoveComplete, this);
            numCashier++;
            this.shiftFirstInLine(sandwichLine, this.sandwichLinePos);
            
            function onCashierMoveComplete(){
                cashierLine.push(curr);
            }
           // cashierLine.push(currCustomer);
        }
    };
    
    BlueRoom.Game.prototype.onLeaveMoveComplete= function(){
        //this.shiftFirstInLine(sandwichLine, this.sandwichLinePos);
        leaving = false;
        left.destroy();
    };
    
    
    
    BlueRoom.Game.prototype.shiftFirstInLine= function(line, linePos){
        if(line[0]!=null){
            var xposy = linePos['x'][0];
            var yposy = linePos['y'][0];
            this.add.tween(line[0].sprite).to( { x: xposy, y: yposy }, 4000, "Back.easeOut", true);
        }
    };
    
    BlueRoom.Game.prototype.toLeaveBlueRoom= function(){
        if(cashierLine.length>0 && cashierLine[0]!=null && !leaving){
            var c = cashierLine[0];
            console.log(c);
            purchase("sandwich", c.ingredients, c.ingMap, "wheat", c.id, c.happiness);
            leaving = true;
            left = cashierLine.shift().sprite;
            numCashier--;
            var tween = this.add.tween(left).to( { x: 450, y: 700 }, 1000, null, true);
            tween.onComplete.add(this.onLeaveMoveComplete, this);
            //BlueRoom.Game.prototype.addMoney.call(this);
            this.shiftFirstInLine(cashierLine, this.cashierLinePos);
        }

    };
    
    BlueRoom.Game.prototype.moveLineUp=function(line, linePos, speed){
        for(var i = 0; i< line.length; i++){
            var xpos = linePos['x'][i];
            var ypos = linePos['y'][i];
            this.add.tween(line[i].sprite).to( { x: xpos, y: ypos }, speed, "Back.easeOut", true);
        }
    };
    
    BlueRoom.Game.prototype.drawPath= function(){
        this.points['x'][2] = this.sandwichLinePos['x'][numSandwich];
        this.points['y'][2] = this.sandwichLinePos['y'][numSandwich];
        console.log(this.sandwichLinePos['x'][numSandwich]);
    };

    BlueRoom.Game.prototype.managerUpdate= function () {
        // this just takes care of resetting
        // the timer so the movement repeats
        currThis = this;
       
        if (this.timerStopped && numSandwich<15) {
            this.timerStopped = false;
            this.timer = this.game.time.create(true);
            // this.customer = this.add.sprite(400, 600, 'customer');
            // console.log("in other func");
            // console.log(this);
            // console.log(this.add);
            getCustomer();
        }
    
        //BlueRoom.Game.prototype.update.call(this);

    };
    
    BlueRoom.Game.prototype.newCustomerReturned = function(customer){
        // var currThis = this;
        // console.log(customer);
        // console.log(currThis.add);
        // console.log(this);
        customer.sprite = currThis.add.sprite(400, 600, 'customer');
        currThis.customer = customer.sprite;
        customerGroup.add(currThis.customer);
        numSandwich++;
        currThis.drawPath();
        currThis.customer.anchor.setTo(0.5, 0.5);
        currThis.timer.loop(.001, function(){
            var posx = currThis.math.bezierInterpolation(currThis.points.x, currThis.i);
            var posy = currThis.math.bezierInterpolation(currThis.points.y, currThis.i);
            currThis.customer.x = posx;
            currThis.customer.y = posy;
            currThis.i += currThis.increment;
            if (posx > currThis.points['x'][2]) {
                currThis.timer.stop();
                currThis.timer.destroy();
                currThis.i = 0;
                currThis.timerStopped = true;
                sandwichLine.push(customer);
            }
        }, currThis);
        currThis.timer.start();
    }
    
    // BlueRoom.Game.prototype.plot= function() {
    //     var posx = this.math.bezierInterpolation(this.points.x, this.i);
    //     var posy = this.math.bezierInterpolation(this.points.y, this.i);
    //     this.customer.x = posx;
    //     this.customer.y = posy;
    //     this.i += this.increment;
    //     if (posx > this.points['x'][2]) {
    //         this.timer.stop();
    //         this.timer.destroy();
    //         this.i = 0;
    //         this.timerStopped = true;
    //         sandwichLine.push(customer);
    //     }
    // };
