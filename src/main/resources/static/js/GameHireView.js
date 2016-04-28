var hireViewElements = new Array();
var NUMBEROFHIRES = 3;
var currentlyDisplayedHire = 0;

BlueRoom.Game.prototype.createHireView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	hireViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideHireView, this);
	hireViewElements.push(backButton);

	var titleStyle = { font: "60px Verdana", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Hire Employees', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	var labelStyle = { font: "16px Verdana", fill: "#000000", align: "center"};
	var currbalance = this.game.add.text(this.game.width/2, 140, 'Current Balance: $' + statusBar.money.toFixed(2), labelStyle);
	currbalance.anchor.setTo(0.5, 0,5);

	var wages = this.game.add.text(this.game.width/2, 480, 'Wages: $10.50 / hr', labelStyle);
	wages.anchor.setTo(0.5, 0,5);

	var hireMeButton = this.add.button(this.game.width/2, 510, 'hireMeButton', this.hideHireView, this);
	hireMeButton.anchor.setTo(0.5, 0,5);

	hireViewElements.push(title);
	hireViewElements.push(currbalance);
	hireViewElements.push(wages);
	hireViewElements.push(hireMeButton);

	var hireboxX = this.game.width/2;
	var hireboxY = 325;

	// var hireList = new Array();
	// var e1 = this.add.sprite(this.game.width/2, 325, 'e3');
	// e1.anchor.setTo(0.5, 0.5)
	// hireViewElements.push(e1);

	this.hireA = game.add.sprite(hireboxX, hireboxY, 'e0');
    this.hireA.anchor.setTo(0.5, 0.5);

    this.hireB = game.add.sprite(hireboxX, hireboxY, 'e1');
    this.hireB.anchor.setTo(0.5, 0.5);
    this.hireB.alpha = 0;

    hireViewElements.push(this.hireA);
    hireViewElements.push(this.hireB);


	var next = this.add.button(230, 275, 'next', this.fadeHires, this);
	next.anchor.setTo(0.5, 0,5);
	hireViewElements.push(next);
	var prev = this.add.button(825, 275, 'prev', this.fadeHires, this);
	prev.anchor.setTo(0.5, 0,5);
	hireViewElements.push(prev);


	// var starList = new Array();
	// var stars = ['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar'];

	// for (var i = 0; i < 5; i++){
		// var st = this.add.sprite(0, 0, stars[i]);
		// hireViewElements.push(st);
	// 	starList.push(st);
	// }
	
	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};



BlueRoom.Game.prototype.fadeHires = function() {

    //  Cross-fade the two pictures
    var tween;

    if (this.hireA.alpha === 1)
    {
        tween = game.add.tween(this.hireA).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        game.add.tween(this.hireB).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);

    }
    else
    {
        game.add.tween(this.hireA).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(this.hireB).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(this.changePicture, this);

};

BlueRoom.Game.prototype.changePicture= function() {
    if (this.hireA.alpha === 0)
    {
        this.hireA.loadTexture("e" + currentlyDisplayedHire);
    }
    else
    {
        this.hireB.loadTexture("e" + currentlyDisplayedHire);
    }

    currentlyDisplayedHire++;
    console.log(currentlyDisplayedHire);

    if (currentlyDisplayedHire >= NUMBEROFHIRES)
    {
        currentlyDisplayedHire = 0;
    }
};

// BlueRoom.Game.prototype.showHireView= function(){
//     hireViewElements.forEach(function(item){
//         item.visible = true;
//     });
// };

BlueRoom.Game.prototype.hideHireView= function(){
	hireViewElements.forEach(function(item){
		item.destroy();
	});
};