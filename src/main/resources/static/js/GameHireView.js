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