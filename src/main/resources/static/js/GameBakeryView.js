var bakeryViewElements = new Array();
var muffinList = new Array();
var muffinDropZone;

// pistachio, double chocolate, chocolate chip, banana nut, triple berry, bran 

function Muffin(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
}

BlueRoom.Game.prototype.createBakeryView= function () {
	var bg = this.add.sprite(0, 0, 'whiteBg');
    muffinDropZone = this.add.sprite(620, 0, 'muffinDropZone');
	var bakeryBg = this.add.sprite(0,0, 'bakeryBg');
    bakeryViewElements.push(bg);
    bakeryViewElements.push(muffinDropZone);
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
    //var pist = this.add.sprite(85, 140, 'pistachio');
    var pistText = this.game.add.text(100, 263, "COUNT: 0"  , style);
    // var dchoc = this.add.sprite(245, 140, 'doubleChoc');
    var dchocText = this.game.add.text(260, 263, "COUNT: 0"  , style);
    // var chocChip = this.add.sprite(405, 140, 'chocChip');
    var chocChipText = this.game.add.text(420, 263, "COUNT: 0"  , style);
    // var banana = this.add.sprite(565, 140, 'bananaNut');
    var bananaText = this.game.add.text(580, 263, "COUNT: 0"  , style);
    // var berry = this.add.sprite(725, 140, 'tripleBerry');
    var berryText = this.game.add.text(740, 263, "COUNT: 0"  , style);
    // var bran = this.add.sprite(885, 140, 'bran');
    var branText = this.game.add.text(900, 263, "COUNT: 0"  , style);
    // bakeryViewElements.push(pist);
    // bakeryViewElements.push(dchoc);
    // bakeryViewElements.push(chocChip);
    // bakeryViewElements.push(banana);    
    // bakeryViewElements.push(berry);
    // bakeryViewElements.push(bran);
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

    this.setUpMuffin(85, 140, 'pistachio');
    this.setUpMuffin(245, 140, 'doubleChoc');
    this.setUpMuffin(405, 140, 'chocChip');
    this.setUpMuffin(565, 140, 'bananaNut');
    this.setUpMuffin(725, 140, 'tripleBerry');
    this.setUpMuffin(885, 140, 'bran');


};

BlueRoom.Game.prototype.setUpMuffin = function(x, y, img){
    var staticMuffin = this.add.sprite(x, y, img);
    var m = new Muffin(x, y, img);
    muffinList[img] = m;
    bakeryViewElements.push(staticMuffin);
    this.makeMovableMuffin(x, y, img);

}

BlueRoom.Game.prototype.makeMovableMuffin = function(x, y, img){
    var muff = this.add.sprite(x, y, img);
    bakeryViewElements.push(muff);
    this.setUpMuffinInteractions(muff);
}

BlueRoom.Game.prototype.setUpMuffinInteractions =function(sprite){
    sprite.inputEnabled = true;
    sprite.input.enableDrag();
    sprite.events.onInputOver.add(this.onMuffinOver, this);
    sprite.events.onInputOut.add(this.onMuffinOut, this);
    sprite.events.onDragStart.add(this.onMuffinDragStart, this);
    sprite.events.onDragStop.add(this.onMuffinDragStop, this);
};

BlueRoom.Game.prototype.onMuffinOver= function(sprite, pointer) {

    sprite.tint = 0xcccccc;

};

BlueRoom.Game.prototype.onMuffinOut= function(sprite, pointer) {

    sprite.tint = 0xffffff;

};

BlueRoom.Game.prototype.onMuffinDragStart = function(sprite, pointer) {
    // var dragOut = staticElementMap[sprite.key];
    // sprite.loadTexture(dragOut, 0);
    dragPosition.set(sprite.x, sprite.y);
    // mypointer.alpha = 1;
};

BlueRoom.Game.prototype.onMuffinDragStop= function(sprite, pointer) {
    dragging = false;
    sprite.tint = 0xffffff;
    // sprite.body.moves = true;
    // mypointer.alpha = 0;

    if (!sprite.overlap(muffinDropZone))
    {
        this.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
    }
    else{
        posX = muffinList[sprite.key].x
        posY = muffinList[sprite.key].y;
        this.makeMovableMuffin(posX, posY, sprite.key)
        sprite.x = 660;
        sprite.y = 20;
        sprite.inputEnabled = false;
        var t = currThis.add.tween(sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        t.onComplete.add(function () {
            sprite.destroy();
            //check if correct muffin, etc
        });
    }

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