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
var dayEndView = false;

var gameTimer;
var gamegroup;
var textgroup;
var moneytext;
var timetext;
var daytext;
var ampmtext;
var closedtext;

var dayCounter = 4;
var twelveCounter = 0;

var MANAGERTIMEINTERVAL = 1; //250 standard
var SANDWICHTIMEINTERVAL = 500;

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
		//this.coffeeButton = this.add.button(10, 150, 'coffeeButton', goToCoffeeView, this);
        //this.bakeryButton = this.add.button(10, 220, 'bakeryButton', goToBakeryView, this);
        this.status_bar = this.add.sprite(0, 600, 'status_bar');
        
        gamegroup.add(this.status_bar);
        gamegroup.add(this.managerButton);
        gamegroup.add(this.sandwichButton);
        //gamegroup.add(this.bakeryButton);
        //gamegroup.add(this.coffeeButton);
        
        var status = statusBar;
        var style = { font: "32px Roboto Light", fill: "#000000", wordWrap: true, wordWrapWidth: 100, align: "left", boundsAlignH: "left", backgroundColor: "#ffffff" };

        moneytext = this.game.add.text(100, 650, '$' + (status.money.toFixed(2)), style);
        daytext = this.game.add.text(500, 650,  status.day[dayCounter%7], style);
        timetext = this.game.add.text(900, 650,  status.hour + ':' + status.minute, style);
        ampmtext = this.game.add.text(970, 650,  status.ampm[twelveCounter%2], style);
        closedtext = this.game.add.text(900, 650,  "CLOSED!", style);
        this.closedSign(false);


        this.moneytextTween = this.add.tween(moneytext.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);

        console.log(status.money);
        
        textgroup.add(moneytext);
        textgroup.add(timetext);
        textgroup.add(ampmtext);
        textgroup.add(daytext);
        textgroup.add(closedtext);

        textgroup.forEach(function(item) {
            item.anchor.set(0.5);
        });
        
        this.setTimer(MANAGERTIMEINTERVAL);
        this.disableButton(this.managerButton);
      
        this.createManager();
        this.createSandwichView();
        this.hideSandwichView();
       
        //this.showSandwichView();
        
        function goToManagerView(pointer) {
		    managerView = true;
		    sandwichView = false;
            dayEndView = false;
		    mygame.hideSandwichView();
            mygame.disableButton(this.managerButton);
            mygame.enableButton(this.sandwichButton);
            // this.managerButton.alpha = 0.5;
            // this.sandwichButton.alpha = 1;

            this.setTimer(MANAGERTIMEINTERVAL);
    	};
    	
    	function goToSandwichView(pointer) {
    	    sandwichView = true;
    	    managerView = false;
            dayEndView = false;
    	    mygame.showSandwichView();
            mygame.disableButton(this.sandwichButton);
            mygame.enableButton(this.managerButton);
            // this.sandwichButton.alpha = 0.5;
            // this.managerButton.alpha = 1;
            this.setTimer(SANDWICHTIMEINTERVAL);
    	};
    	
    	function goToCoffeeView(pointer) {
    	};
    	
    	function goToBakeryView(pointer) {
    	};
    	
        function quitGame(pointer) {
            this.state.start('MainMenu');
        };

    },
    
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
        var scoreTween = this.game.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, 800, Phaser.Easing.Exponential.In, true);
     
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
        var scoreTween = this.game.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, 1000, Phaser.Easing.Exponential.In, true);
     
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
        timetext.setText(statusBar.hour + ':' + minute);
        ampmtext.setText(statusBar.ampm[twelveCounter%2]);
        daytext.setText(statusBar.day[dayCounter%7]);


        this.game.world.bringToTop(textgroup);
        if(managerView){
            this.managerUpdate();
            this.hideSandwichView();
            employeeList.forEach(function(item){
                item.visible = true;
            });
        } else{
              employeeList.forEach(function(item){
                item.visible = false;
            });
        }
        if(sandwichView){
            this.sandwichUpdate();
          
        }
        if(!isBlueRoomOpen && numCustomer <=0){
            if(!dayEndView){
                dayEndView = true;
                // this.createDayEndView();
                endDay();
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

    quitGame: function (pointer) {

        //  Destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
