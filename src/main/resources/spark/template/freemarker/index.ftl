<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8" />
	<title>Blue Room Tycoon</title>
	<script src="js/phaser.min.js"></script>
	<script src="js/jquery-2.1.1.js"></script>
	<script src="js/Boot.js"></script>
	<script src="js/Preloader.js"></script>
	<script src="js/MainMenu.js"></script>
	<script src="js/About.js"></script>

	<script src="js/Game.js"></script>
	<script src="js/StatusBar.js"></script>
	<script src="js/Customer.js"></script>
	<script src="js/Server.js"></script>
	<script src="js/GameManagerView.js"></script>
	<script src="js/GameSandwichView.js"></script>
	<script src="js/GameCoffeeView.js"></script>
	<script src="js/GameBakeryView.js"></script>


</head>
<body>

<div id="gameContainer"></div>

<script type="text/javascript">

window.onload = function() {

	//	Created Phaser game, injected into the gameContainer div.
	//	Here, a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	//var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'gameContainer');
	var game = new Phaser.Game(1058, 700, Phaser.AUTO, 'gameContainer');


	//	Add the States game has.
	//	don't have to do this in the html, it could be done in Boot state too, but for simplicity I'll keep it here.
	game.state.add('Boot', BlueRoom.Boot);
	game.state.add('Preloader', BlueRoom.Preloader);
	game.state.add('MainMenu', BlueRoom.MainMenu);
	game.state.add('About', BlueRoom.About);

	// game.state.add('GameManagerView', BlueRoom.GameManagerView);
	// game.state.add('GameSandwichView', BlueRoom.GameSandwichView);
	// game.state.add('GameCoffeeView', BlueRoom.GameCoffeeView);
	// game.state.add('GameBakeryView', BlueRoom.GameBakeryView);

	game.state.add('Game', BlueRoom.Game);

	//	start Boot state.
	game.state.start('Boot');

};

</script>

</body>
</html>