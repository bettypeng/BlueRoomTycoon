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
        var style = { font: "17px Comic Sans MS", fill: "#000000", wordWrap: true, wordWrapWidth: 1000, align: "left", backgroundColor: "#ffffff" };

        abouttext = this.game.add.text(50, 90, "Congratulations! You have just purchased Brown's beloved eatery, "+
        	"the Blue Room. You begin with just a sandwich station and cash register at "+
        	"the moment, but don't worry, business will soon be booming. With time you will be able to hire employees "+
        	"to help you out, but for now you are the lone manager and worker of your eatery. All of Brown is depending on you to keep their "+
        	"favorite eatery afloat. Good luck!", style);

        // Blue Room Tycoon is a business strategy game centered around Brown University’s iconic Blue Room eatery. 
        //In the game, you start off with an empty Blue Room with a sandwich station, a cash register, and no employees. 
        //It’s your job to serve all of the customers by making them their sandwiches and checking them out at the cash
        // register! The icons in the top left corner allow you to switch between the sandwich-making view, where you 
        //serve customers by following their sandwich orders, and the home/manager view, where you can view your 
        //establishment and its lines, and you can check customers out at the cash register by clicking the register.", 
        //style);
	},

	update: function () {


	},

	startGame: function () {
        this.state.start('Game');
	},
	
	changeText: function () {
	    abouttext.setText("HOW TO PLAY: \n You have two views of the Blue Room: Manager and Sandwich. The "+
	    	"icons in the top left corner allow you to switch between these views. Your job is to serve all the "+
	    	"customers by making them their sandwiches and check them out at the cash register. \n Manager View:\n "+
	    	"Once a customer receives their sandwich they will move over to the cash register. You must check them "+
	    	"out by clicking on the dollar sign above the cash register. The money you recieved will increment your "+
	    	"account balance in the lower left. \nSandwich View:\n When a customer is at the sandwich station his/her "+
	    	"order will appear in the speech bubble bit by bit as you construct the sandwich. Just click and drag the "+
	    	"correct ingredients over to the cutting board illuminated on the right thand side. The better you make "+
	    	"your sandwich, the more money you make, so try to drop the ingredients right in the center.");
		this.nextB.visible = false;
	}

};