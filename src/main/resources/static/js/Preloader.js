
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
		
		// LOAD SCREEN
		this.load.image('loadBox', 'images/loadrectangle.png');
		this.load.image('loadBanner', 'images/load_banner.png');
		this.load.image('eraseButton', 'images/erase-game.png');
		
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
		this.load.image('status_bar', 'images/status.png');

		 
		// BACKGROUNDS
		this.load.image('whiteBg', 'images/white.png');
		this.load.image('stationBg', 'images/blue_bg.png');

		this.load.image('managerBg', 'images/managerview_bg.png');
		this.load.image('sandwichStation', 'images/sandwich_counter.png');
		this.load.image('coffeeStation', 'images/coffee_counter.png');
		this.load.image('bakeryStation', 'images/bakery_counter.png');

		//this.load.image('sandwichBg', 'images/sandwich_bg.png');
		this.load.image('sandwichBg', 'images/sandwich/sandwich_bg.png');

		this.load.image('alertBox', 'images/alert.png');

		//PAUSE SCREEN
		this.load.image('pauseButton', 'images/pause_game_button.png');
		this.load.image('pauseScreen', 'images/pause_test_screen.png');
		this.load.image('resumeGameButton', 'images/resume_game_button.png');
		this.load.image('restartGameButton', 'images/restart_game_button.png');
		this.load.image('quitGameButton', 'images/quit_game_button.png');



		// MANAGER VIEW
		this.load.image('employee', 'images/employee.png');
		this.load.image('employeeHalf', 'images/employee_behind_counter.png');
		this.load.image('customer', 'images/customer.png');
		this.load.image('employeeBreakStation', 'images/employee_break_station.png');

		this.load.image('radiobutton', 'images/alertbutton.png');

		this.load.image('dollar', 'images/dollar.png');
		this.load.image('dollarSign', 'images/dollar_sign.png');
		this.load.image('dollarSignDark', 'images/dollar_sign_dark.png');
		
		//SANDWICH LINE
		this.load.image('dropzone', 'images/sandwich/dropzonewhiter.png');

		this.load.image('roast_beef_pile', 'images/sandwich/roast_beef_pile.png');
		this.load.image('turkey_pile', 'images/sandwich/turkey_pile.png');
		this.load.image('ham_pile', 'images/sandwich/ham_pile.png');
		this.load.image('mozzarella_pile', 'images/sandwich/mozzarella_pile.png');
		this.load.image('yellow_cheese_pile', 'images/sandwich/yellow_cheese_pile.png');
		this.load.image('swiss_cheese_pile', 'images/sandwich/swiss_cheese_pile.png');
		this.load.image('spring_mix_pile', 'images/sandwich/spring_mix_pile.png');
		this.load.image('lettuce_pile', 'images/sandwich/lettuce_pile.png');
		this.load.image('spinach_pile', 'images/sandwich/spinach_pile.png');
		this.load.image('onion_pile', 'images/sandwich/onion_pile.png');
		this.load.image('pickle_pile', 'images/sandwich/pickle_pile.png');
		this.load.image('tomato_pile', 'images/sandwich/tomato_pile.png');

		this.load.image('top_bun', 'images/sandwich/top_bun.png');
		this.load.image('bottom_bun', 'images/sandwich/bottom_bun.png');

		this.load.image('top_ciabatta', 'images/sandwich/top_ciabatta.png');
		this.load.image('bottom_ciabatta', 'images/sandwich/bottom_ciabatta.png');

		this.load.image('top_french', 'images/sandwich/top_french.png');
		this.load.image('bottom_french', 'images/sandwich/bottom_french.png');

		this.load.image('top_wheat', 'images/sandwich/top_wheat.png');
		this.load.image('bottom_wheat', 'images/sandwich/bottom_wheat.png');

		this.load.image('roast_beef', 'images/sandwich/toppings/roast_beef.png');
		this.load.image('turkey', 'images/sandwich/toppings/turkey.png');
		this.load.image('ham', 'images/sandwich/toppings/ham.png');

		this.load.image('yellow_cheese', 'images/sandwich/toppings/yellow_cheese.png');
		this.load.image('swiss_cheese', 'images/sandwich/toppings/swiss_cheese.png');
		this.load.image('mozzarella', 'images/sandwich/toppings/mozzarella.png');

		this.load.image('lettuce', 'images/sandwich/toppings/lettuce.png');
		this.load.image('spinach', 'images/sandwich/toppings/spinach.png');
		this.load.image('spring_mix', 'images/sandwich/toppings/spring_mix.png');


		this.load.image('onion', 'images/sandwich/toppings/onion.png');
		this.load.image('pickle', 'images/sandwich/toppings/pickle.png');
		this.load.image('tomato', 'images/sandwich/toppings/tomato.png');
		
		this.load.image('speechBubble', 'images/sandwich/speech_bubble.png');
		this.load.image('happy', 'images/happy.png');
		this.load.image('neutral', 'images/neutral.png');
		this.load.image('sad', 'images/saddness.png');
		this.load.image('leaving', 'images/leaving.png');
		this.load.image('pointer', 'images/sandwich/down_pointer.png');
		this.load.image('trash', 'images/trash_can.png');
		this.load.image('exclamation', 'images/exclamation.png');
		this.load.image('noface', 'images/noface.png');
		this.load.image('glasses', 'images/glasses.png');
		this.load.image('troll', 'images/troll.jpg');
		this.load.image('upset', 'images/disappointed.jpg');

		//COFFEE STATION
		this.load.image('coffeeBg', 'images/coffee/coffeeview_bg.png');
		this.load.image('iceMachine', 'images/coffee/yellow_ice_machine.png');
		this.load.image('syrupDispenser', 'images/coffee/orange_syrup_dispenser.png');
		this.load.image('syrupButton', 'images/coffee/syrupButton.png');

		this.load.image('drinkDropZone', 'images/coffee/drink_drop_zone.png');
		this.load.image('drinkDispenser', 'images/coffee/drink_dispenser_cartoon.png');
		this.load.image('drinkButton', 'images/coffee/drinkButton.png');

		//SMALL
		this.load.image('smCup', 'images/coffee/sm_cup.png');
		this.load.image('smIce', 'images/coffee/sm_ice.png');
		this.load.image('smDrink', 'images/coffee/sm_drink.png');
		this.load.image('smSyrup', 'images/coffee/sm_syrup.png');

		//MEDIUM
		this.load.image('mdCup', 'images/coffee/md_cup.png');
		this.load.image('mdIce', 'images/coffee/md_ice.png');
		this.load.image('mdDrink', 'images/coffee/md_drink.png');
		this.load.image('mdSyrup', 'images/coffee/md_syrup.png');
		//LARGE
		this.load.image('lgCup', 'images/coffee/lg_cup.png');
		this.load.image('lgIce', 'images/coffee/lg_ice.png');
		this.load.image('lgDrink', 'images/coffee/lg_drink.png');
		this.load.image('lgSyrup', 'images/coffee/lg_syrup.png');


		//BAKERY STATION
		this.load.image('bakeryBg', 'images/bakery/bakery_background.png');
		this.load.image('muffinDropZone', 'images/bakery/muffin_drop_zone.png');
		this.load.image('muffinPlate', 'images/bakery/purple_plate.png');
		this.load.image('pistachio', 'images/bakery/pistachio_muffin.png');
		this.load.image('doubleChoc', 'images/bakery/double_chocolate_muffin.png');
		this.load.image('chocChip', 'images/bakery/chocolate_chip_muffin.png');
		this.load.image('tripleBerry', 'images/bakery/triple_berry_muffin.png');
		this.load.image('bananaNut', 'images/bakery/banana_nut_muffin.png');
		this.load.image('bran', 'images/bakery/bran_muffin.png');

		this.load.image('pistachioBatter', 'images/bakery/pistachio_batter.png');
		this.load.image('doubleChocBatter', 'images/bakery/double_chocolate_batter.png');
		this.load.image('chocChipBatter', 'images/bakery/chocolate_chip_batter.png');
		this.load.image('tripleBerryBatter', 'images/bakery/triple_berry_batter.png');
		this.load.image('bananaNutBatter', 'images/bakery/banana_nut_batter.png');
		this.load.image('branBatter', 'images/bakery/bran_batter.png');

		this.load.image('batterDropZone', 'images/bakery/batter_drop_zone.png')
		this.load.image('batterMenu', 'images/bakery/batter_menu.png');
		this.load.image('muffinTin', 'images/bakery/baking_tin.png');
		this.load.image('oven', 'images/bakery/baking_oven.png');
		this.load.image('ovenClosed', 'images/bakery/closed_oven.png');
		this.load.image('openOven', 'images/bakery/white_open_oven_button.png');



		//END OF DAY VIEW
		this.load.image('dayEndBg', 'images/day_end_bg.png');
		this.load.image('exitButton', 'images/exit_button.png');
		this.load.image('backButton', 'images/back_button.png');
		this.load.image('viewInventoryButton', 'images/view_inventory_button.png');
		this.load.image('upgradeButton', 'images/upgrade_button.png');
		this.load.image('hireButton', 'images/hire_button.png');
		this.load.image('exitViewButton', 'images/start_new_day.png');
		this.load.image('continueButton', 'images/continue_button.png');
		this.load.image('continueShopping', 'images/continue_shopping.png');
		this.load.image('exitViewSmallButton', 'images/start_new_day_small.png');
		this.load.image('saveButton', 'images/save_game.png');

		// HIRE PAGE
		this.load.image('next', 'images/next_btn.png');
		this.load.image('prev', 'images/prev_btn.png');
		this.load.image('hireMeButton', 'images/hire/hire_me_button.png');
		// this.load.image('philPage', 'images/hire/phil.png');
		this.load.image('erik', 'images/hire/hire_erik.png');
		this.load.image('alex', 'images/hire/hire_alex.png');
		this.load.image('rachel', 'images/hire/hire_rachel.png');

		// HIRE VIEW STAR TEMPLATES
		this.load.image('oneStar', 'images/hire/one_star.png');
		this.load.image('twoStar', 'images/hire/two_star.png');
		this.load.image('threeStar', 'images/hire/three_star.png');
		this.load.image('fourStar', 'images/hire/four_star.png');
		this.load.image('fiveStar', 'images/hire/five_star.png');

		//UPGRADE PAGE
		this.load.image('buyButton', 'images/upgrades/buy_button.png');
		this.load.image('coffee', 'images/upgrades/coffee_bar.png');
		this.load.image('bakery', 'images/upgrades/bakery.png');
		this.load.image('magazine rack', 'images/upgrades/magazine_rack.png');

		//INVENTORY
		this.load.image('inventoryUp', 'images/inventory/up_arrow.png');
		this.load.image('inventoryDown', 'images/inventory/down_arrow.png');
		this.load.image('sellButton', 'images/inventory/sell_button.png');
		this.load.image('fireButton', 'images/inventory/fire_button.png');
		this.load.image('i_erik', 'images/inventory/erik.png');
		this.load.image('i_alex', 'images/inventory/alex.png');
		this.load.image('i_rachel', 'images/inventory/rachel.png');
		this.load.image('i_coffee', 'images/inventory/coffee.png');
		this.load.image('i_bakery', 'images/inventory/bakery.png');
		this.load.image('i_magazine rack', 'images/inventory/magazine.png');




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
