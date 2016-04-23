// ABOUT :)


BlueRoom.About = function (game) {

    this.nextB = null;
    this.play = null;

};

var abouttext;

BlueRoom.About.prototype = {

	create: function () {

        this.add.sprite(0, 0, 'whiteBg');
        this.add.sprite(355, 0, 'banner');
        this.play = this.add.button(880, 500, 'smallStart', this.startGame, this);
        this.nextB = this.add.button(870, 410, 'nextButton', this.changeText, this);
        var style = { font: "20px Comic Sans MS", fill: "#000000", wordWrap: true, wordWrapWidth: 1000, align: "left", backgroundColor: "#ffffff" };

        abouttext = this.game.add.text(50, 100, "Blue Room Tycoon is a business strategy game centered around Brown University’s iconic Blue Room eatery. In the game, you start off with an empty Blue Room with a sandwich station, a cash register, and no employees. It’s your job to serve all of the customers by making them their sandwiches and checking them out at the cash register! The icons in the top left corner allow you to switch between the sandwich-making view, where you serve customers by following their sandwich orders, and the home/manager view, where you can view your establishment and its lines, and you can check customers out at the cash register by clicking the register.", style);
	},

	update: function () {


	},

	startGame: function () {
        this.state.start('Game');
	},
	
	changeText: function () {
	    abouttext.setText("How to make sandwiches: When in the sandwich view, you should see the first component of the customer’s order at the top of the screen in a speech bubble. Drag and drop this ingredient onto the cutting board illuminated at the right hand side of the screen. This should make the next ingredient show up in the speech bubble. Dragging a top bun onto your sandwich completes the order! You will make more money based on how well you make your sandwiches, so try to drop the ingredients right on the center!");
	}

};