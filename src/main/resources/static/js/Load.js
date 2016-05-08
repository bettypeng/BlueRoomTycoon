
BlueRoom.Load = function(game) {
	
};

var currThis;
var savedGames;

BlueRoom.Load.prototype = {
	create: function() {
	
		this.add.sprite(0, 0, 'titlepage');
		var a = this.add.button(this.game.width/4, 370, 'loadBox', this.loadGameZero, this);
		var b = this.add.button(this.game.width/2, 370, 'loadBox', this.loadGameOne, this);
		var c = this.add.button(3*this.game.width/4, 370, 'loadBox', this.loadGameTwo, this);

		a.anchor.setTo(0.5, 0);
		b.anchor.setTo(0.5, 0);
		c.anchor.setTo(0.5, 0);
		// this.add.sprite(335, 10, 'loadBanner');
		
		var style = { font: "18px Roboto-Light", fill: "#000000", align: "center"};
		this.game.add.text(385, 300, "Select a slot below to begin playing!", style);
		currThis = this;
		getSavedGames();
	
	},
	
	update: function() {
	
	},
	
	finishCreate: function(savedGamesLocal) {
		savedGames = savedGamesLocal;
		var mainstyle = { font: "25px Roboto", fill: "#000000", wordWrap: true, wordWrapWidth: 220, align: "center"};

		var style = { font: "16px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 140, align: "center" };
		var newGameText = "NEW GAME";
		var instructionText = "CLICK HERE TO START A NEW GAME FILE";
		var savedText = "CLICK HERE TO LOAD GAME";
		
		if (savedGames[0]) {
			var a = currThis.add.text(currThis.game.width/4, 425, "GAME 0", mainstyle);
			var b = currThis.add.text(currThis.game.width/4, 525, savedText, style);
			var c = currThis.add.button(currThis.game.width/4, 640, 'eraseButton', currThis.eraseGameZero, this);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
			c.anchor.setTo(0.5, 0);
		} else {
			var a = currThis.add.text(currThis.game.width/4, 425, newGameText, mainstyle);
			var b = currThis.add.text(currThis.game.width/4, 525, instructionText, style);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
		}
		
		if (savedGames[1]) {
			var a = currThis.add.text(currThis.game.width/2, 425, "GAME 1", mainstyle);
			var b = currThis.add.text(currThis.game.width/2, 525, savedText, style);
			var c = currThis.add.button(currThis.game.width/2, 640, 'eraseButton', currThis.eraseGameOne, this);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
			c.anchor.setTo(0.5, 0);
		} else {
			var a = currThis.add.text(currThis.game.width/2, 425, newGameText, mainstyle);
			var b = currThis.add.text(currThis.game.width/2, 525, instructionText, style);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
		}
		
		if (savedGames[2]) {
			var a = currThis.add.text(3* currThis.game.width/4, 425, "GAME 2", mainstyle);
			var b = currThis.add.text(3* currThis.game.width/4, 525, savedText, style);
			var c = currThis.add.button(3* currThis.game.width/4, 640, 'eraseButton', currThis.eraseGameTwo, this);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
			c.anchor.setTo(0.5, 0);
		} else {
			var a = currThis.add.text(3* currThis.game.width/4, 425, newGameText, mainstyle);
			var b = currThis.add.text(3* currThis.game.width/4, 525, instructionText, style);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
		}
	},
	
	eraseGameZero: function() {
		currThis.eraseGame(0);
	},
	
	eraseGameOne: function() {
		currThis.eraseGame(1);
	},
	
	eraseGameTwo: function() {
		currThis.eraseGame(2);
	},
	
	eraseGame: function(number) {
		eraseSavedGame(number);
		this.state.start('Load');
	},
	
	loadGameZero: function() {
		currThis.loadGame(0);
	},
	
	loadGameOne: function() {
		currThis.loadGame(1);
	},
	
	loadGameTwo: function() {
		currThis.loadGame(2);
	},
	
	loadGame: function(gameNumber) {
		var gameFile = "game" + gameNumber + ".brt";
		saveNumber = gameNumber;
		if (savedGames[gameNumber]) {
			loadGame(gameFile);
		} else {
			restartGame();
			this.state.start('Game');
		}
	}
};