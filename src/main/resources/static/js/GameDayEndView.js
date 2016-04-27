var dayEndViewElements = new Array();


BlueRoom.Game.prototype.createDayEndView= function () {
	var bg = this.add.sprite(0, 0, 'dayEndBg');
	dayEndViewElements.push(bg);
	var exit = this.add.button(990, 30, 'exitButton', this.destroyDayEndView, this);
	managerView = false;
	sandwichView = false;
	dayEndViewElements.push(exit);
	this.managerButton.visible = false;
	this.sandwichButton.visible = false;

};

// BlueRoom.Game.prototype.showDayEndView= function(){
//     sandwichViewElements.forEach(function(item){
//         item.visible = true;
//     });
// };

BlueRoom.Game.prototype.destroyDayEndView= function(){
	this.managerButton.visible = true;
	this.sandwichButton.visible = true;
	dayEndViewElements.forEach(function(item){
		item.destroy();
	});
	managerView = true;
	sandwichView = false;
	this.resetGameDay();
};