var bakeryViewElements = new Array();

// pistachio, double chocolate, chocolate chip, banana nut, triple berry, bran 

BlueRoom.Game.prototype.createBakeryView= function () {
	var bg = this.add.sprite(0, 0, 'whiteBg');
	var bakeryBg = this.add.sprite(0,0, 'bakeryBg');
    bakeryViewElements.push(bg);
    bakeryViewElements.push(bakeryBg);

    var p1 = this.add.sprite(60, 220, 'muffinPlate');
    var p2 = this.add.sprite(220, 220, 'muffinPlate');
    var p3 = this.add.sprite(380, 220, 'muffinPlate');
    var p4 = this.add.sprite(540, 220, 'muffinPlate');
    var p5 = this.add.sprite(700, 220, 'muffinPlate');
    var p6 = this.add.sprite(860, 220, 'muffinPlate');
    bakeryViewElements.push(p1);
    bakeryViewElements.push(p2);
    bakeryViewElements.push(p3);
    bakeryViewElements.push(p4);    
    bakeryViewElements.push(p5);
    bakeryViewElements.push(p6);

    var style = { font: "18px Roboto-Thin", fill: "#000000", wordWrap: true, wordWrapWidth: 400, align: "center" };
    var pist = this.add.sprite(85, 140, 'pistachio');
    var pistText = this.game.add.text(100, 263, "COUNT: 0"  , style);
    var dchoc = this.add.sprite(245, 140, 'doubleChoc');
    var dchocText = this.game.add.text(260, 263, "COUNT: 0"  , style);
    var chocChip = this.add.sprite(405, 140, 'chocChip');
    var chocChipText = this.game.add.text(420, 263, "COUNT: 0"  , style);
    var banana = this.add.sprite(565, 140, 'bananaNut');
    var bananaText = this.game.add.text(580, 263, "COUNT: 0"  , style);
    var berry = this.add.sprite(725, 140, 'tripleBerry');
    var berryText = this.game.add.text(740, 263, "COUNT: 0"  , style);
    var bran = this.add.sprite(885, 140, 'bran');
    var branText = this.game.add.text(900, 263, "COUNT: 0"  , style);
    bakeryViewElements.push(pist);
    bakeryViewElements.push(dchoc);
    bakeryViewElements.push(chocChip);
    bakeryViewElements.push(banana);    
    bakeryViewElements.push(berry);
    bakeryViewElements.push(bran);
    bakeryViewElements.push(pistText);
    bakeryViewElements.push(dchocText);
    bakeryViewElements.push(chocChipText);
    bakeryViewElements.push(bananaText);    
    bakeryViewElements.push(berryText);
    bakeryViewElements.push(branText);

    var oven = this.add.sprite(this.game.width/2, 310, 'oven');
    oven.anchor.setTo(0.5, 0);
    var batterMenu = this.add.sprite(60, 350, 'batterMenu');
    var muffinTin = this.add.sprite(this.game.width/2, 463, 'muffinTin');
    muffinTin.anchor.setTo(0.5, 0);
    bakeryViewElements.push(batterMenu);
    bakeryViewElements.push(oven);
    bakeryViewElements.push(muffinTin);



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