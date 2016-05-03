var bakeryViewElements = new Array();

// pistachio, double chocolate, chocolate chip, banana nut, triple berry, bran 

BlueRoom.Game.prototype.createBakeryView= function () {
	var bg = this.add.sprite(0, 0, 'whiteBg');
    bakeryViewElements.push(bg);
};

BlueRoom.Game.prototype.showBakeryView= function(){
    bakeryViewElements.forEach(function(item){
        item.visible = true;
    });
};

BlueRoom.Game.prototype.hideBakeryView= function(){
    bakeryViewElements.forEach(function(item){
        item.visible = false;
    });
};

BlueRoom.Game.prototype.bakeryUpdate= function () {
};