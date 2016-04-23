
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
		this.load.image('titlepage', 'js/images/title_page.png');
		this.load.image('playButton', 'js/images/start_game.png');
		this.load.image('aboutButton', 'js/images/about_game.png');
		
		// ABOUT
		this.load.image('nextButton', 'js/images/next.png');
		this.load.image('smallStart', 'js/images/small_start.png');
		this.load.image('banner', 'js/images/about_banner.png');
		
		// BUTTONS
		this.load.image('managerButton', 'js/images/game_manager_button.png');
		this.load.image('sandwichButton', 'js/images/sandwich_view_button.png');
		this.load.image('coffeeButton', 'js/images/coffee_view_button.png');
		this.load.image('bakeryButton', 'js/images/bakery_view_button.png');
		
		//STATUS BAR
		this.load.image('status_bar', 'js/images/status_bar.png');

		 
		// BACKGROUNDS
		this.load.image('whiteBg', 'js/images/bg.png');
		this.load.image('managerBg', 'js/images/manager_bg.png');
		this.load.image('sandwichBg', 'js/images/sandwich_bg.png');
		this.load.image('sandwichBg2', 'js/images/sandwich_bg_2.png');

		// MANAGER VIEW
		this.load.image('customer', 'js/images/customer.png');
		this.load.image('dollar', 'js/images/dollar.png');

		
		//SANDWICH LINE
		this.load.image('dropzone', 'js/images/sandwich/dropzone.png');
		this.load.image('top_bun', 'js/images/sandwich/top_bun.png');
		this.load.image('bottom_bun', 'js/images/sandwich/bottom_bun.png');
		this.load.image('roast_beef', 'js/images/sandwich/roast_beef.png');
		this.load.image('turkey', 'js/images/sandwich/turkey.png');
		this.load.image('ham', 'js/images/sandwich/ham.png');
		this.load.image('cheese', 'js/images/sandwich/cheese.png');
		this.load.image('cucumber', 'js/images/sandwich/cucumber.png');
		this.load.image('lettuce', 'js/images/sandwich/lettuce.png');
		this.load.image('onion', 'js/images/sandwich/onion.png');
		this.load.image('tomato', 'js/images/sandwich/tomato.png');
		
		this.load.image('speechBubble', 'js/images/sandwich/speech_bubble.png');

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
