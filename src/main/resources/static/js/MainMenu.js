
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

		this.playButton = this.add.button(365, 250, 'playButton', this.startGame, this);
		this.aboutButton = this.add.button(365, 370, 'aboutButton', this.aboutScreen, this);

	},

	update: function () {

		//	nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	start the actual game
		this.state.start('Game');

	},
	
	aboutScreen: function () {
		this.state.start('About');
	}

};
