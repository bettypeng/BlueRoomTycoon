
BlueRoom.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.aboutButton = null;

};

BlueRoom.MainMenu.prototype = {

	create: function () {
		// this.music = this.add.audio('titleMusic');
		// this.music.play();
		this.add.sprite(0, 0, 'whiteBg');
		this.add.sprite(0, 0, 'titlepage');

		this.playButton = this.add.button(this.game.width/2, 375, 'playButton', this.startGame, this);
		this.aboutButton = this.add.button(this.game.width/2, 475, 'aboutButton', this.aboutScreen, this);
		this.playButton.anchor.setTo(0.5, 0.5);
		this.aboutButton.anchor.setTo(0.5, 0.5);

	},

	update: function () {

		//	nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	start the actual game
		this.state.start('Load');

	},
	
	aboutScreen: function () {
		this.state.start('About');
	}

};
