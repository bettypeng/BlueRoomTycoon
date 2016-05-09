// ABOUT :)


BlueRoom.About = function (game) {
    this.backB = null;
    this.nextB = null;
    this.play = null;

};

var slideCounter = 0;
var abouttext;
var nextText = [];
nextText.push("Congratulations! You have just purchased Brown's most beloved eatery, "+
            "the Blue Room. You begin with nothing but a sandwich station, a cash register, and $50 in your pocket. "+
            "\n \nFor now, you are the lone manager and worker of the Blue Room. All of Brown is depending on you to keep their "+
            "favorite eatery afloat!");
nextText.push("You will begin with two views of the Blue Room: Manager and Sandwich. With time, you can buy the Coffee Station and the "+
            "bakery. The "+
            "icons in the top left corner allow you to switch between these views. Your job is to serve all the "+
            "customers by creating their orders and checking them out at the cash register. ");
nextText.push("You can check customers "+
            "out by dragging them into the cash register. The money you received will increment your "+
            "account balance in the lower left.");
nextText.push("You should keep track of customers using the Customer Tracker in the status bar. Keep an eye out for new customers that " +
            "will arrive in the Blue Room by the NEW alert. If customers are unsatisfied with their order, they will try and steal from " +
            "the blue room, so watch out for a THEFT. When customers have been waiting in lines for too long, they will DITCH. Make sure "+
            "you cash out all the customers that are waiting to PAY for their orders.");
nextText.push("When a customer is at the sandwich station, his/her "+
            "order will appear in the speech bubble as you construct your sandwich. Just click and drag the "+
            "correct ingredients over to the cutting board illuminated on the right hand side. The more centered "+
            "and correct your ingredients, the more money you make, so try to drop the ingredients right in the center." +
            "\n\n If you make a sandwich poorly enough, a customer will steal it. The longer a customer waits, the less money you will " +
            "make, so time is of the essence!");
nextText.push("In the coffee station, you can click and drag the right cup to the ice machine, the drink dispenser, and the "+
            "syrup dispenser to create the customer's drink.");
nextText.push("In the bakery, you will need to bake muffins every day to prepare for your customer's orders. Choose your batters wisely, "+
            "don't burn any muffins, and keep in mind that any baked goods left at the end of the day will need to be thrown out!");
nextText.push("At the end of the day, you can view your financial summary. With the profits that you gain, you can hire employees that "+
            "will help at each station, and buy upgrades to the Blue Room. With these upgrades and hires, your daily expenses will rise. "+
            "You will need to play smart and make sure that you can afford the upkeep costs of all additions. You can fire employees "+
            "and sell your upgrades when you view your inventory.");
nextText.push("If you go bankrupt, you will lose the Blue Room...and the game! Good luck!")


BlueRoom.About.prototype = {

	create: function () {

        this.add.sprite(0, 0, 'howToBg');
         var titleStyle = { font: "70px Roboto-Bold-Condensed", fill: "#ffffff", align: "center"};
        var title = this.game.add.text(this.game.width/2, 50, 'THE BLUE ROOM IS YOURS.', titleStyle);
        title.anchor.setTo(0.5, 0);
        
        var style = { font: "25px Roboto-Light", fill: "#000000", wordWrap: true, wordWrapWidth: 800, align: "left" };

        abouttext = this.game.add.text(this.game.width/2, 200, nextText[slideCounter], style);
        abouttext.anchor.setTo(0.5, 0);

        this.play = this.add.button(this.game.width/2, 600, 'startHowToButton', this.startGame, this);
        this.play.anchor.setTo(0.5, 0);
        this.backB = this.add.button(50, 600, 'backHowToButton', this.backText, this);
        this.backB.visible = false;
        this.nextB = this.add.button(820, 600, 'nextHowToButton', this.changeText, this);
	},

	update: function () {


	},

	startGame: function () {
        this.state.start('Load');
	},
	
    backText: function(){
        slideCounter--;
        abouttext.setText(nextText[slideCounter]);
        if(slideCounter<=0){
            this.backB.visible = false;
        }else{
            this.backB.visible = true;
        }
        if(slideCounter>=nextText.length-1){
            this.nextB.visible = false;
        }else{
            this.nextB.visible = true;
        }
    },

	changeText: function () {
        slideCounter++;
		abouttext.setText(nextText[slideCounter]);
        if(slideCounter<=0){
            this.backB.visible = false;
        }else{
            this.backB.visible = true;
        }
        if(slideCounter>=nextText.length-1){
            this.nextB.visible = false;
        }else{
            this.nextB.visible = true;
        }
	}

};