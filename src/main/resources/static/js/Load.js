
BlueRoom.Load = function(game) {
	
};

var currThis;
var savedGames;

BlueRoom.Load.prototype = {
	create: function() {
	
		this.add.sprite(0, 0, 'whiteBg');
		this.add.button(80, 180, 'loadBox', this.loadGameZero, this);
		this.add.button(380, 180, 'loadBox', this.loadGameOne, this);
		this.add.button(680, 180, 'loadBox', this.loadGameTwo, this);
		this.add.sprite(335, 10, 'loadBanner');
		
		var style = { font: "18px Comic Sans MS", fill: "#000000", align: "center", backgroundColor: "#ffffff" };
		this.game.add.text(385, 160, "Select a slot below to begin playing!", style);
		currThis = this;
		getSavedGames();
	
	},
	
	update: function() {
	
	},
	
	finishCreate: function(savedGamesLocal) {
		savedGames = savedGamesLocal;
		var style = { font: "18px Comic Sans MS", fill: "#000000", wordWrap: true, wordWrapWidth: 220, align: "center", backgroundColor: "#ffffff" };
		var newGameText = "NEW GAME";
		var instructionText = "CLICK HERE TO START A NEW GAME FILE";
		var savedText = "CLICK HERE TO LOAD GAME";
		
		if (savedGames[0]) {
			currThis.add.text(202, 310, "GAME 0", style);
			currThis.add.text(138, 410, savedText, style);
			currThis.add.button(37, 560, 'eraseButton', currThis.eraseGameZero, this);
		} else {
			currThis.add.text(185, 310, newGameText, style);
			currThis.add.text(132, 410, instructionText, style);
		}
		
		if (savedGames[1]) {
			currThis.add.text(502, 310, "GAME 1", style);
			currThis.add.text(438, 410, savedText, style);
			currThis.add.button(337, 560, 'eraseButton', currThis.eraseGameOne, this);
		} else {
			currThis.add.text(485, 310, newGameText, style);
			currThis.add.text(432, 410, instructionText, style);
		}
		
		if (savedGames[2]) {
			currThis.add.text(802, 310, "GAME 2", style);
			currThis.add.text(738, 410, savedText, style);
			currThis.add.button(637, 560, 'eraseButton', currThis.eraseGameTwo, this);
		} else {
			currThis.add.text(785, 310, newGameText, style);
			currThis.add.text(732, 410, instructionText, style);
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