
BlueRoom.Load = function(game) {
	
};

var currLoadThis;
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
		currLoadThis = this;
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
			var a = currLoadThis.add.text(currLoadThis.game.width/4, 425, "GAME 0", mainstyle);
			var b = currLoadThis.add.text(currLoadThis.game.width/4, 525, savedText, style);
			var c = currLoadThis.add.button(currLoadThis.game.width/4, 640, 'eraseButton', currLoadThis.eraseGameZero, this);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
			c.anchor.setTo(0.5, 0);
		} else {
			var a = currLoadThis.add.text(currLoadThis.game.width/4, 425, newGameText, mainstyle);
			var b = currLoadThis.add.text(currLoadThis.game.width/4, 525, instructionText, style);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
		}
		
		if (savedGames[1]) {
			var a = currLoadThis.add.text(currLoadThis.game.width/2, 425, "GAME 1", mainstyle);
			var b = currLoadThis.add.text(currLoadThis.game.width/2, 525, savedText, style);
			var c = currLoadThis.add.button(currLoadThis.game.width/2, 640, 'eraseButton', currLoadThis.eraseGameOne, this);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
			c.anchor.setTo(0.5, 0);
		} else {
			var a = currLoadThis.add.text(currLoadThis.game.width/2, 425, newGameText, mainstyle);
			var b = currLoadThis.add.text(currLoadThis.game.width/2, 525, instructionText, style);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
		}
		
		if (savedGames[2]) {
			var a = currLoadThis.add.text(3* currLoadThis.game.width/4, 425, "GAME 2", mainstyle);
			var b = currLoadThis.add.text(3* currLoadThis.game.width/4, 525, savedText, style);
			var c = currLoadThis.add.button(3* currLoadThis.game.width/4, 640, 'eraseButton', currLoadThis.eraseGameTwo, this);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
			c.anchor.setTo(0.5, 0);
		} else {
			var a = currLoadThis.add.text(3* currLoadThis.game.width/4, 425, newGameText, mainstyle);
			var b = currLoadThis.add.text(3* currLoadThis.game.width/4, 525, instructionText, style);

			a.anchor.setTo(0.5, 0);
			b.anchor.setTo(0.5, 0);
		}
	},
	
	eraseGameZero: function() {
		currLoadThis.eraseGame(0);
	},
	
	eraseGameOne: function() {
		currLoadThis.eraseGame(1);
	},
	
	eraseGameTwo: function() {
		currLoadThis.eraseGame(2);
	},
	
	eraseGame: function(number) {
		eraseSavedGame(number);
		this.state.start('Load');
	},
	
	loadGameZero: function() {
		currLoadThis.loadGameNumber(0);
	},
	
	loadGameOne: function() {
		currLoadThis.loadGameNumber(1);
	},
	
	loadGameTwo: function() {
		currLoadThis.loadGameNumber(2);
	},
	
	loadGameNumber: function(gameNumber) {
		var gameFile = "game" + gameNumber + ".brt";
		saveNumber = gameNumber;
		loadTheFile = false;
		if (savedGames[gameNumber]) {
			loadTheFile = true;
			this.state.start('Game', true, false, gameFile);
		} else {
			restartGame();
			this.state.start('Game');
		}
	}
};