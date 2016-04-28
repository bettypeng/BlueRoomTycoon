var hireViewElements = new Array();


BlueRoom.Game.prototype.createHireView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	hireViewElements.push(bg);

	var backButton = this.add.button(50, 60, 'backButton', this.hideHireView, this);
	hireViewElements.push(backButton);

	var titleStyle = { font: "60px Verdana", fill: "#000000", align: "center"};
	var title = this.game.add.text(this.game.width/2, 50, 'Hire Employees', titleStyle);
	title.anchor.setTo(0.5, 0,5);

	hireViewElements.push(title);

	var hireList = new Array();
	var e1 = this.add.sprite(this.game.width/2, 350, 'philPage');
	e1.anchor.setTo(0.5, 0.5)
	hireViewElements.push(e1);

	var next = this.add.button(180, 300, 'next', this.hideHireView, this);
	next.anchor.setTo(0.5, 0,5);
	hireViewElements.push(next);
	var prev = this.add.button(875, 300, 'prev', this.hideHireView, this);
	prev.anchor.setTo(0.5, 0,5);
	hireViewElements.push(prev);


	var starList = new Array();
	var stars = ['oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar'];

	for (var i = 0; i < 5; i++){
		// var st = this.add.sprite(0, 0, stars[i]);
		// hireViewElements.push(st);
		starList.push(st);
	}
	



	managerView = false;
	sandwichView = false;
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

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