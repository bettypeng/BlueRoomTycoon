
BlueRoom.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BlueRoom.Preloader.prototype = {

	preload: function () {

		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	Automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Load the rest of the assets our game needs.

		// MAINMENU
		this.load.image('titlepage', 'images/title_page.png');
		this.load.image('playButton', 'images/start_game.png');
		this.load.image('aboutButton', 'images/about_game.png');
		
		// ABOUT
		this.load.image('nextButton', 'images/next.png');
		this.load.image('smallStart', 'images/small_start.png');
		this.load.image('banner', 'images/about_banner.png');
		
		// BUTTONS
		this.load.image('managerButton', 'images/game_manager_button.png');
		this.load.image('sandwichButton', 'images/sandwich_view_button.png');
		this.load.image('coffeeButton', 'images/coffee_view_button.png');
		this.load.image('bakeryButton', 'images/bakery_view_button.png');
		
		//STATUS BAR
		this.load.image('status_bar', 'images/status_bar.png');

		 
		// BACKGROUNDS
		this.load.image('whiteBg', 'images/white.png');
		this.load.image('managerBg', 'images/manager_view.png');
		this.load.image('sandwichStation', 'images/sandwich_station.png');

		this.load.image('sandwichBg', 'images/sandwich_bg.png');
		this.load.image('sandwichBg2', 'images/sandwich_bg_2.png');

		// MANAGER VIEW
		this.load.image('customer', 'images/customer.png');
		this.load.image('dollar', 'images/dollar.png');
		this.load.image('dollarSign', 'images/dollar_sign.png');
		this.load.image('dollarSignDark', 'images/dollar_sign_dark.png');
		
		//SANDWICH LINE
		this.load.image('dropzone', 'images/sandwich/dropzone.png');

		this.load.image('top_bun', 'images/sandwich/top_bun.png');
		this.load.image('bottom_bun', 'images/sandwich/bottom_bun.png');
		this.load.image('roast_beef', 'images/sandwich/roast_beef.png');
		this.load.image('turkey', 'images/sandwich/turkey.png');
		this.load.image('ham', 'images/sandwich/ham.png');
		this.load.image('cheese', 'images/sandwich/cheese.png');
		this.load.image('cucumber', 'images/sandwich/cucumber.png');
		this.load.image('lettuce', 'images/sandwich/lettuce.png');
		this.load.image('onion', 'images/sandwich/onion.png');
		this.load.image('tomato', 'images/sandwich/tomato.png');
		
		this.load.image('speechBubble', 'images/sandwich/speech_bubble.png');
		this.load.image('happy', 'images/happy.png');
		this.load.image('neutral', 'images/neutral.png');
		this.load.image('sad', 'images/saddness.png');
		this.load.image('leaving', 'images/leaving.png');
		this.load.image('pointer', 'images/sandwich/down_pointer.png');

		//END OF DAY VIEW
		this.load.image('dayEndBg', 'images/day_end_bg.png');
		this.load.image('exitButton', 'images/exit_button.png');
		this.load.image('upgradeButton', 'images/upgrade_button.png');

		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		//this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished, disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');


	},

	// update: function () {

	// 	//	You don't actually need to do this, but gives a much smoother game experience.
	// 	//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
	// 	//	You can jump right into the menu if you want and still play the music, but you'll have a few
	// 	//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
	// 	//	it's best to wait for it to decode here first, then carry on.
		
	// 	//	If you don't have any music in your game then put the game.state.start line into the create function and delete
	// 	//	the update function completely.
		
	// 	if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
	// 	{
	// 		this.ready = true;
	// 		this.state.start('MainMenu');
	// 	}

	// }

};
