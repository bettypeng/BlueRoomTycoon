var pausedElements = new Array();
var pausedInManager;
var pausedInSandwich;
var pausedInBakery;
var pausedInCoffee;

var gamePaused = false;

BlueRoom.Game.prototype.showPauseScreen= function () {
	if(!gamePaused){
		pausedInManager = false;
		pausedInSandwich = false;
		pausedInBakery = false;
		pausedInCoffee = false;

		gamePaused = true;
		var pauseScreen = game.add.sprite(0, 0, 'pauseScreen');
		pausedElements.push(pauseScreen);

		var resume = this.add.button(this.game.width/2, 300, 'resumeGameButton', this.hidePauseScreen, this);
		resume.anchor.setTo(0.5, 0.5);
		// var quit = this.add.button(this.game.width/2, 420, 'quitGameButton', this.quitGame, this);
		// quit.anchor.setTo(0.5, 0.5);

		if(managerView){
			pausedInManager = true;
			managerView = false;
		}
		if(sandwichView){
			pausedInSandwich = true;
					sandwichView = false;

		}
		if(coffeeView){
			pausedInCoffee = true;
			coffeeView = false;
		}
		if(bakeryView){
			pausedInBakery = true;
			bakeryView = false;
			clearInterval(bakeTimer);
		}

		this.managerButton.visible = false;
		this.sandwichButton.visible = false;
		this.coffeeButton.visible = false;
		this.bakeryButton.visible = false;

		dayEndView = true;

		pausedElements.push(resume);
		// pausedElements.push(quit);
		clearInterval(gameTimer);
	}



}

BlueRoom.Game.prototype.hidePauseScreen= function(){
	gamePaused = false;
	if(pausedInManager){
		this.setTimer(MANAGERTIMEINTERVAL);
		managerView = true;
	} else{
		this.setTimer(STATIONTIMEINTERVAL);
		if(pausedInSandwich){
			sandwichView = true;
		}
		if(pausedInBakery){
			bakeryView = true;
			this.startBakeTimer();
		}
		if(pausedInCoffee){
			coffeeView = true;
		}
	}

	this.managerButton.visible = true;
	this.sandwichButton.visible = true;
	if(coffeeButtonOn){
		this.coffeeButton.visible = true;
	} else{
		this.coffeeButton.visible = false;
	}
	if(bakeryButtonOn){
		this.bakeryButton.visible = true;
	} else{
		this.bakeryButton.visible = false;
	}

	dayEndView = false;
	pausedElements.forEach(function(item){
		item.destroy();
	});
	pausedInManager = false;
	pausedInSandwich = false;
	pausedInBakery = false;
	pausedInCoffee = false;
}