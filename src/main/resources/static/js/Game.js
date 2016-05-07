BlueRoom.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    //  You can use any of these from any function within this State.
    //  But they are 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

var managerView = true;
var sandwichView = false;
var coffeeView = false;
var bakeryView = false;
var dayEndView = false;

var coffeeButtonOn;
var BakeryButtonOn;

var gameTimer;
var gamegroup;
var textgroup;
var moneytext;
var timetext;
var daytext;
var ampmtext;
var closedtext;

var customerAlert;
var leavingAlert;
var stealingAlert;
var checkoutAlert;


var dayCounter = 4;
var twelveCounter = 0;


var MANAGERTIMEINTERVAL = 50; //250 standard
var STATIONTIMEINTERVAL = 50;


var saveNumber;

var game;

BlueRoom.Game.prototype = {

    create: function () {
        game = this;
        var mygame = this;
        //this.add.sprite(0, 0, 'whiteBg');
        gamegroup = this.game.add.group();
        textgroup = this.game.add.group();

        this.add.sprite(0, 0, 'whiteBg');
        this.managerButton = this.add.button(10, 10, 'managerButton', goToManagerView, this);
		this.sandwichButton = this.add.button(10, 80, 'sandwichButton', goToSandwichView, this);
		this.coffeeButton = this.add.button(10, 150, 'coffeeButton', goToCoffeeView, this);
        this.bakeryButton = this.add.button(10, 220, 'bakeryButton', goToBakeryView, this);
        this.status_bar = this.add.sprite(0, 600, 'status_bar');
        this.pauseButton = this.add.button(1000, 630, 'pauseButton', this.showPauseScreen, this);

        customerAlert = this.add.sprite(20, 625, 'radiobutton');
        leavingAlert = this.add.sprite(20, 645, 'radiobutton');
        stealingAlert = this.add.sprite(20, 665, 'radiobutton');
        checkoutAlert = this.add.sprite(20, 685, 'radiobutton');


        // coffeeButtonOn = false;
        // this.coffeeButton.visible = false;
        // bakeryButtonOn = false;
        // this.bakeryButton.visible = false;
        
        gamegroup.add(this.status_bar);
        gamegroup.add(this.managerButton);
        gamegroup.add(this.sandwichButton);
        gamegroup.add(this.bakeryButton);
        gamegroup.add(this.coffeeButton);
        gamegroup.add(this.pauseButton);

        
        var status = statusBar;
        var style = { font: "32px Roboto-Light", fill: "#000000", wordWrap: true, wordWrapWidth: 300, align: "left", boundsAlignH: "left"};

        moneytext = this.game.add.text(330, 650, '$' + (status.money.toFixed(2)), style);
        daytext = this.game.add.text(620, 650,  status.day[dayCounter%7], style);
        //timetext = this.game.add.text(800, 650,  status.hour + ':' + status.minute, style);
        timetext = this.game.add.text(820, 650,  status.hour, style);
        ampmtext = this.game.add.text(860, 650,  status.ampm[twelveCounter%2], style);
        closedtext = this.game.add.text(820, 650,  "CLOSING TIME!", style);
        this.closedSign(false);

        var newstyle = { font: "12px Roboto-Light", fill: "#000000", wordWrap: true, wordWrapWidth: 300, align: "left", boundsAlignH: "left"};

        var customerAlertText = this.game.add.text(40, 615, "NEW CUSTOMER", newstyle);
        var leavingAlertText = this.game.add.text(40, 635, "LEAVING", newstyle);
        var stealingAlertText = this.game.add.text(40, 655, "STEALING", newstyle);
        var checkoutAlertText = this.game.add.text(40, 675, "CHECKOUT", newstyle);


        this.moneytextTween = this.add.tween(moneytext.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);

        
        textgroup.add(moneytext);
        textgroup.add(timetext);
        textgroup.add(ampmtext);
        textgroup.add(daytext);
        textgroup.add(closedtext);
        textgroup.add(customerAlert);
        textgroup.add(leavingAlert);
        textgroup.add(stealingAlert);
        textgroup.add(checkoutAlert);
        textgroup.add(customerAlertText);
        textgroup.add(leavingAlertText);
        textgroup.add(stealingAlertText);
        textgroup.add(checkoutAlertText);

        textgroup.forEach(function(item) {
            item.anchor.set(0.5);
        });

        customerAlertText.anchor.setTo(0, 0);
        leavingAlertText.anchor.setTo(0, 0);
        stealingAlertText.anchor.setTo(0, 0);
        checkoutAlertText.anchor.setTo(0,0);
        
        this.setTimer(MANAGERTIMEINTERVAL);
        this.disableButton(this.managerButton);
      
        this.createManager();
        this.createSandwichView();
        this.createBakeryView();
        this.createCoffeeView();
        this.hideSandwichView();
        this.hideCoffeeView();
        this.hideBakeryView();

        window.setInterval(function(){
            if (isBlueRoomOpen) {
                updateCustomerInterval();
            }
        }, 1000);

       
        //this.showSandwichView();
        
        function goToManagerView(pointer) {
		    managerView = true;
		    sandwichView = false;
            coffeeView = false;
            bakeryView = false;
            dayEndView = false;
    		mygame.hideSandwichView();
            mygame.hideCoffeeView();
            mygame.hideBakeryView();
            mygame.disableButton(this.managerButton);
            if (!sandwichStationFilled ) {
                mygame.enableButton(this.sandwichButton);
            }
            if (!coffeeStationFilled) {
                mygame.enableButton(this.coffeeButton);
            }
            if (!bakeryStationFilled) {
                mygame.enableButton(this.bakeryButton);
            }
            this.setTimer(MANAGERTIMEINTERVAL);
    	};
    	
    	function goToSandwichView(pointer) {
    	    managerView = false;
            sandwichView = true;
            coffeeView = false;
            bakeryView = false;
            dayEndView = false;
    	    mygame.showSandwichView();
            mygame.hideCoffeeView();
            mygame.hideBakeryView();
            mygame.enableButton(this.managerButton);
            mygame.disableButton(this.sandwichButton);
            if (!coffeeStationFilled) {
                mygame.enableButton(this.coffeeButton);
            }
            if (!bakeryStationFilled) {
                mygame.enableButton(this.bakeryButton);
            }
            this.setTimer(STATIONTIMEINTERVAL);
    	};
    	
    	function goToCoffeeView(pointer) {
            managerView = false;
            sandwichView = false;
            coffeeView = true;
            bakeryView = false;
            dayEndView = false;
            mygame.hideSandwichView();
            mygame.showCoffeeView();
            mygame.hideBakeryView();
            mygame.enableButton(this.managerButton);
            mygame.disableButton(this.coffeeButton);
            if (!sandwichStationFilled ) {
                mygame.enableButton(this.sandwichButton);
            }
            if (!bakeryStationFilled) {
                mygame.enableButton(this.bakeryButton);
            }
            this.setTimer(STATIONTIMEINTERVAL);
    	};
    	
    	function goToBakeryView(pointer) {
            managerView = false;
            sandwichView = false;
            coffeeView = false;
            bakeryView = true;
            dayEndView = false;
            mygame.hideSandwichView();
            mygame.hideCoffeeView();
            mygame.showBakeryView();
            mygame.enableButton(this.managerButton);
            mygame.disableButton(this.bakeryButton);
            if (!sandwichStationFilled ) {
                mygame.enableButton(this.sandwichButton);
            }
            if (!coffeeStationFilled) {
                mygame.enableButton(this.coffeeButton);
            }
            this.setTimer(STATIONTIMEINTERVAL);
    	};
    	
    },

    statusAlert: function(alerttype) {
        var counter = 0;
        var color;
        if(alerttype==customerAlert){
            color = 0x00FF00;
        } else if (alerttype==leavingAlert){
            color = 0xffff00;
        } else if (alerttype ==stealingAlert){
            color = 0xff0000;
        } else if(alerttype ==checkoutAlert){
            color = 0x0099cc;
        }
        
        timer = setInterval(function(){
            counter++;
            if (counter%2==0) {
                alerttype.tint = color;
            } else {
                alerttype.tint = 0xFFFFFF;
            }
        }, 90);

        setTimeout(function() {
            clearInterval(timer);
        }, 1900);

        alerttype.tint = 0xFFFFFF;

    },

    // custLeavingAlert: function() {
    //     var counter = 0;
    //     leavingTimer = setInterval(function(){
    //         counter++;
    //         if (counter%2==0) {
    //             leavingAlert.tint = 0xFFFF00;
    //         } else {
    //             leavingAlert.tint = 0xFFFFFF;
    //         }
    //     }, 90);
    //     return leavingTimer;
    // },

    // custStealingAlert: function() {
    //     var counter = 0;
    //     stealingTimer = setInterval(function(){
    //         counter++;
    //         if (counter%2==0) {
    //             stealingAlert.tint = 0xFF0000;
    //         } else {
    //             stealingAlert.tint = 0xFFFFFF;
    //         }
    //     }, 90);
    //     return stealingTimer;
    // },

    // checkoutAlert: function(){
    //     var counter = 0;
    //     checkoutTimer = setInterval(function(){
    //         counter++;
    //         if (counter%2==0) {
    //             checkoutAlert.tint = 0x0099cc;
    //         } else {
    //             checkoutAlert.tint = 0xFFFFFF;
    //         }
    //     }, 90);
    //     return checkoutTimer;
    // },
    
    // addMoney: function(amt){
    //     statusBar.money += Number(amt);
    // },

    // loseMoney: function(amt){
    //     statusBar.money -= amt;
    // },

    closedSign: function(bool){
        if(!bool){
            closedtext.visible = false;
            ampmtext.visible = true;
            timetext.visible = true;
        }
        else{
            closedtext.visible = true;
            ampmtext.visible = false;
            timetext.visible = false;
        }
    },

    addMoney: function(x, y, message, amt){
        var scoreFont = "20px Arial";
        //Create a new label for the score
        var scoreAnimation = this.game.add.text(x, y, message, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 15}); 
        scoreAnimation.anchor.setTo(0.5, 0);
        scoreAnimation.align = 'center';
     
        //Tween this score label to the total score label
        var scoreTween = this.game.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, 1500, Phaser.Easing.Exponential.In, true);
     
        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        scoreTween.onComplete.add(function(){
            scoreAnimation.destroy();
            this.moneytextTween.start();
            statusBar.money += Number(amt);
        }, this);
    },

    loseMoney: function(x, y, message, amt){
        var scoreFont = "20px Arial";
        //Create a new label for the score
        var scoreAnimation = this.game.add.text(x, y, message, {font: scoreFont, fill: "#cc0000", stroke: "#ffffff", strokeThickness: 15}); 
        scoreAnimation.anchor.setTo(0.5, 0);
        scoreAnimation.align = 'center';
     
        //Tween this score label to the total score label
        var scoreTween = this.game.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, 1500, Phaser.Easing.Exponential.In, true);
     
        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        scoreTween.onComplete.add(function(){
            scoreAnimation.destroy();
            this.moneytextTween.start();
            statusBar.money -= Number(amt);
        }, this);
    },

    // incrementMoney: function(){
    //     statusBar.money = statusBar.money + .01;   
    //     statusBar.money.toFixed(2);
    //     moneytext.text = '$' + statusBar.money;     
    // },

    update: function () {
        this.game.world.bringToTop(gamegroup);

        // if(statusBar.moneyBuffer > 0){
        //     this.incrementMoney();
        //     statusBar.moneyBuffer-=1;
        //     console.log(statusBar.moneyBuffer);
        // }

        var minute;
        if(statusBar.minute < 10){
            minute = '0' + statusBar.minute;
        } else {
            minute = statusBar.minute;
        }
        moneytext.setText('$' + statusBar.money.toFixed(2));
        timetext.setText(statusBar.hour);
        ampmtext.setText(statusBar.ampm[twelveCounter%2]);
        daytext.setText(statusBar.day[dayCounter%7]);


        this.game.world.bringToTop(textgroup);
        if(managerView){
            this.managerUpdate();
            this.hideSandwichView();
            employeeGroup.children.forEach(function(item){
                item.visible = true;
            });
        } else{
              employeeGroup.children.forEach(function(item){
                item.visible = false;
            });
        }

        if(sandwichView){
            this.sandwichUpdate(); 
        }

        if(coffeeView) {
            this.coffeeUpdate();
        }

        if(bakeryView){
            this.bakeryUpdate();
        }

        if(dayEndView){
            // this.managerButton.visible = true;
            // this.sandwichButton.visible = true;
            // if(coffeeButtonOn){
            //     this.coffeeButton.visible = true;
            // } else{
            //     this.coffeeButton.visible = false;
            // }
            // if(bakeryButtonOn){
            //     this.bakeryButton.visible = true;
            // } else{
            //     this.bakeryButton.visible = false;
            // }
        }
        else{
            // this.managerButton.visible = false;
            // this.sandwichButton.visible = false;
            // this.bakeryButton.visible = false;
            // this.coffeeButton.visible = false;
        }
        if(!isBlueRoomOpen && numCustomer <=0){
            if(!dayEndView){
                dayEndView = true;
                // this.createDayEndView();
                //endDay();
                // this.createDayEndAlert();
                endDayStats();
            }
        }
    },
    

    setTimer: function(inc){
        var myGame = this;
        clearInterval(gameTimer);
        gameTimer = setInterval(function(){
            myGame.closedSign(false);
            if(statusBar.minute < 59){
                statusBar.minute+=1;
            } 
            else{
                if(statusBar.hour==11){
                    twelveCounter++;
                    // if(twelveCounter%2 == 0){
                    //     dayCounter +=1;
                    // }
                }
                if(statusBar.hour>=12){
                    statusBar.hour = 1;
                }
                else{
                    statusBar.hour+=1;
                }
                statusBar.minute = 0;
            }
            if(statusBar.day[dayCounter%7]=="Saturday" || statusBar.day[dayCounter%7]=="Sunday"){
                  if(statusBar.hour==5 && twelveCounter==1){
                    isBlueRoomOpen = false;
                    console.log("WEEKEND END");
                    clearInterval(gameTimer);
                    myGame.closedSign(true);

                    // myGame.createDayEndView();
                }
            } 
            else{
                if(statusBar.hour==9 && twelveCounter==1){
                    isBlueRoomOpen = false;
                    console.log("WEEKDAY END");
                    clearInterval(gameTimer);
                    myGame.closedSign(true);
                    // myGame.createDayEndView();
                }
            }
        }, inc);
    },

    resetGameDay: function(){
        dayCounter +=1;
        isBlueRoomOpen = true;
        //if(statusBar.day[dayCounter%7]=='Monday' || statusBar.day[dayCounter%7]=='Tuesday' || statusBar.day[dayCounter%7]=='Wednesday' || statusBar.day[dayCounter%7]=='Thursday' || statusBar.day[dayCounter%7]=='Friday'){
        if(statusBar.day[dayCounter%7]=="Saturday" || statusBar.day[dayCounter%7]=="Sunday"){
            statusBar.hour = 9;
            statusBar.minute = 0;
            twelveCounter = 0;
        }
        else {
            statusBar.hour = 7;
            statusBar.minute = 30;
            twelveCounter = 0;
        } 
        this.setTimer(MANAGERTIMEINTERVAL);
    },

    restartGame: function(){
        this.state.start('Game');
    },

    quitGame: function () {

        //  Destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    load: function(stations, employees, balance, dayNum, magRack) {
        console.log(stations);
        for (var i = 0; i < stations.length; i++) {
            var station = stations[i];
            // do something to add the station to the front end

        }
        console.log(employees);
        for (var i = 0; i < employees.length; i++) {
            // add each employee
        }
        console.log(balance);
        // check if this is actually a valid way to change the money
        statusBar.money = balance;
        console.log(dayNum);
        // do something with dayNum to make sure day of the week is correct
        console.log(magRack);
        // do something to tell game if magazine rack has been purchased
        currThis.state.start('Game');
    }

};
