var bakeryViewElements = new Array();
var muffinList = new Array();
var muffinDropZone;
var muffinTin;
var muffinTinGroup;
var batterMap = {};
var batterCount = 0;
var bakedBatter = new Array();
var ovenClosed;
var openOven;
var timerBg;
var bakeTimer;
var ovenTimerSprite;
var movableMuffinMap = {};

var pistText;
var dchocText;
var chocChipText;
var bananaText;
var berryText;
var branText;

function MuffinEl(x, y, img){
    this.x = x;
    this.y = y;
    this.img = img;
}

function Batter(textName, amt){
    this.textName = textName;
    this.amt = amt;
    this.displayAmt = amt;
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
     pistText = this.game.add.text(100, 263, "COUNT: 0"  , style);
     dchocText = this.game.add.text(260, 263, "COUNT: 0"  , style);
     chocChipText = this.game.add.text(420, 263, "COUNT: 0"  , style);
    bananaText = this.game.add.text(580, 263, "COUNT: 0"  , style);
     berryText = this.game.add.text(740, 263, "COUNT: 0"  , style);
     branText = this.game.add.text(900, 263, "COUNT: 0"  , style);

    bakeryViewElements.push(pistText);
    bakeryViewElements.push(dchocText);
    bakeryViewElements.push(chocChipText);
    bakeryViewElements.push(bananaText);    
    bakeryViewElements.push(berryText);
    bakeryViewElements.push(branText);

    muffinTinGroup = this.game.add.group();
    var oven = this.add.sprite(this.game.width/2, 310, 'oven');
    oven.anchor.setTo(0.5, 0);
    //var batterMenu = this.add.sprite(60, 350, 'batterMenu');
    muffinTin = this.add.sprite(this.game.width/2, 463, 'muffinTin');
    muffinTin.anchor.setTo(0.5, 0);
    //bakeryViewElements.push(batterMenu);
    bakeryViewElements.push(oven);
    bakeryViewElements.push(muffinTin);

    this.addBatterToMuffinTin();

    this.setUpMuffinBatter(260, 350, 'pistachioBatter', pistText);
    this.setUpMuffinBatter(260, 390, 'doubleChocBatter', dchocText);
    this.setUpMuffinBatter(260, 430, 'chocChipBatter', chocChipText);
    this.setUpMuffinBatter(260, 470, 'tripleBerryBatter', berryText);
    this.setUpMuffinBatter(260, 510, 'bananaNutBatter', bananaText);
    this.setUpMuffinBatter(260, 550, 'branBatter', branText);

    this.setUpMuffin(85, 140, 'pistachio');
    this.setUpMuffin(245, 140, 'doubleChoc');
    this.setUpMuffin(405, 140, 'chocChip');
    this.setUpMuffin(565, 140, 'bananaNut');
    this.setUpMuffin(725, 140, 'tripleBerry');
    this.setUpMuffin(885, 140, 'bran');

    this.muffinUpdate();

};

BlueRoom.Game.prototype.addBatterToMuffinTin = function(){
    this.setUpBatterDropZone(413, 475, 'batterDropZone');
    this.setUpBatterDropZone(476, 475, 'batterDropZone');
    this.setUpBatterDropZone(539, 475, 'batterDropZone');
    this.setUpBatterDropZone(603, 475, 'batterDropZone');

    this.setUpBatterDropZone(407, 510, 'batterDropZone');
    this.setUpBatterDropZone(474, 510, 'batterDropZone');
    this.setUpBatterDropZone(539, 510, 'batterDropZone');
    this.setUpBatterDropZone(608, 510, 'batterDropZone');

    this.setUpBatterDropZone(399, 547, 'batterDropZone');
    this.setUpBatterDropZone(473, 547, 'batterDropZone');
    this.setUpBatterDropZone(542, 547, 'batterDropZone');
    this.setUpBatterDropZone(612, 547, 'batterDropZone');
}

BlueRoom.Game.prototype.setUpBatterDropZone = function(x, y, img){
    var hole = this.add.sprite(x, y, img);
    muffinTinGroup.add(hole);
    bakeryViewElements.push(hole);
}

BlueRoom.Game.prototype.setUpMuffinBatter = function(x, y, img, textName){
    var b = new Batter(textName, 0);
    batterMap[img] = b;
    var staticMuffinBatter = this.add.sprite(x, y, img);
    var m = new MuffinEl(x, y, img);
    muffinList[img] = m;
    bakeryViewElements.push(staticMuffinBatter);
    this.makeMovableMuffinBatter(x, y, img);
}

BlueRoom.Game.prototype.makeMovableMuffinBatter = function(x, y, img){
    var muffBat = this.add.sprite(x, y, img);
    bakeryViewElements.push(muffBat);
    this.setUpMuffinBatterInteractions(muffBat);
}

BlueRoom.Game.prototype.setUpMuffinBatterInteractions =function(sprite){
    sprite.inputEnabled = true;
    sprite.input.enableDrag();
    sprite.events.onInputOver.add(this.onMuffinOver, this);
    sprite.events.onInputOut.add(this.onMuffinOut, this);
    sprite.events.onDragStart.add(this.onMuffinDragStart, this);
    sprite.events.onDragStop.add(this.onMuffinBatterDragStop, this);
};

BlueRoom.Game.prototype.onMuffinBatterDragStop= function(sprite, pointer) {
    sprite.tint = 0xffffff;
    var batterX = null;
    var batterY = null;
    var itemToDelete = null;

    muffinTinGroup.children.forEach(function(item){
        if (!sprite.overlap(item))
        {
            currThis.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 200, Phaser.Easing.Exponential.In, true);
            matched = true;
        }
        else{
            batterX = item.x;
            batterY = item.y;
            itemToDelete = item;
            return;
        }
    });      

    muffinTinGroup.remove(itemToDelete);
    if(batterX !== null && batterY!==null){
        sprite.inputEnabled = false;
        bakedBatter.push(sprite);
        var posX = muffinList[sprite.key].x
        var posY = muffinList[sprite.key].y;
        this.makeMovableMuffinBatter(posX, posY, sprite.key);
        var t = currThis.add.tween(sprite).to( { x: batterX, y: batterY }, 200, Phaser.Easing.Exponential.In, true);
        batterMap[sprite.key].amt++;
        console.log(batterMap[sprite.key].amt);
        batterCount++;
        t.onComplete.add(function(){
            if(batterCount>=12){
                currThis.bakeMuffins();
            }
        });
        
    }
};

BlueRoom.Game.prototype.createOvenTimer = function(){
    var width = 20;
    var height = 140;

    var bmd = this.add.bitmapData(width, height);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = '#cccccc';
    bmd.ctx.fill();
    timerBg = game.add.sprite(730, 450, bmd);
    timerBg.anchor.setTo(0.5, 1);
    bakeryViewElements.push(timerBg);


    this.ovenTimerTime = height;
    this.ovenTimer = this.add.bitmapData(width, height);
    ovenTimerSprite = this.game.add.sprite(730, 450, this.ovenTimer);
    bakeryViewElements.push(ovenTimerSprite);
    ovenTimerSprite.anchor.setTo(0.5, 1);
    bakeTimer = setInterval(function(){
        currThis.ovenTimerTime-=0.1;
        currThis.ovenTimerUpdate();
    }, 10);
};

BlueRoom.Game.prototype.ovenTimerUpdate= function() {
    // ensure you clear the context each time you update it or the bar will draw on top of itself
    this.ovenTimer.context.clearRect(0, 0, this.ovenTimer.width, this.ovenTimer.height);

    if (this.ovenTimerTime < 15) {
       this.ovenTimer.context.fillStyle = '#f00';   
    }
    else if (this.ovenTimerTime < 30) {
        this.ovenTimer.context.fillStyle = '#ff0';
    }
    else if(this.ovenTimerTime < 50){
        this.ovenTimer.context.fillStyle = '#00cc00'
    }
    else {
        this.ovenTimer.context.fillStyle = '#ff9900';
    }

    if(this.ovenTimerTime < 0){
        // this.leaveBlueRoom();
        // clearInterval(this.barTimer);
        // clearInterval(this.myTimer);
    }
    
    this.ovenTimer.context.fillRect(0, 0, 20, this.ovenTimerTime);
    this.ovenTimer.dirty = true;
};

BlueRoom.Game.prototype.bakeMuffins = function(){
    var t = currThis.add.tween(muffinTin).to( { x: muffinTin.x, y: muffinTin.y-140 }, 1000, Phaser.Easing.Exponential.In, true);

    muffinTinGroup.children.forEach(function(item){
        currThis.add.tween(item).to( { x: item.x, y: item.y-140 }, 1000, Phaser.Easing.Exponential.In, true);
    });
    bakedBatter.forEach(function(item){
        currThis.add.tween(item).to( { x: item.x, y: item.y-140 }, 1000, Phaser.Easing.Exponential.In, true);
    });
    t.onComplete.add(function(){
        ovenClosed = currThis.add.sprite(currThis.game.width/2, 310, 'ovenClosed');
        bakeryViewElements.push(ovenClosed);
        ovenClosed.anchor.setTo(0.5, 0);
        openOven = currThis.add.button(currThis.game.width/2, 334, 'openOven', currThis.endBakeMuffins, this);
        bakeryViewElements.push(openOven);
        openOven.anchor.setTo(0.5, 0.5);
        currThis.createOvenTimer();
    })
};

BlueRoom.Game.prototype.endBakeMuffins = function(){
    if(currThis.ovenTimerTime > 50){
        console.log("Not yet!");
    }
    else if(currThis.ovenTimerTime <5){
        console.log("BURNT");
    }
    else if(currThis.ovenTimerTime<50 && currThis.ovenTimerTime >5){
        console.log("muffins baked!");
        ovenClosed.destroy();

        bakedBatter.forEach(function(item){
            currThis.add.tween(item).to( { x: item.x, y: item.y-300 }, 1000, Phaser.Easing.Exponential.In, true);
            var t = currThis.add.tween(item).to( { alpha: 0 }, 1000, Phaser.Easing.Exponential.In, true);
            //if(batterMap[item.key].amt >0){
            batterMap[item.key].displayAmt = batterMap[item.key].amt;
            batterMap[item.key].textName.setText("COUNT: " + batterMap[item.key].displayAmt);
            currThis.muffinUpdate();
            //}
            t.onComplete.add(function(){
                item.destroy();
            });
        });
      
        
        var t = currThis.add.tween(muffinTin).to( { x: muffinTin.x, y: muffinTin.y+140 }, 1000, Phaser.Easing.Exponential.In, true);
        t.onComplete.add(function(){
            currThis.addBatterToMuffinTin();
            batterCount = 0;
        });
        clearInterval(bakeTimer);
        openOven.destroy();
        timerBg.destroy();
        ovenTimerSprite.destroy();
    }
};

BlueRoom.Game.prototype.setUpMuffin = function(x, y, img){
    var staticMuffin = this.add.sprite(x, y, img);
    staticMuffin.alpha = 0.3;
    var m = new MuffinEl(x, y, img);
    muffinList[img] = m;
    bakeryViewElements.push(staticMuffin);
    this.makeMovableMuffin(x, y, img);
}

BlueRoom.Game.prototype.makeMovableMuffin = function(x, y, img){
    var muff = this.add.sprite(x, y, img);
    movableMuffinMap[img] = muff;
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
    dragPosition.set(sprite.x, sprite.y);
};

BlueRoom.Game.prototype.onMuffinDragStop= function(sprite, pointer) {
    sprite.tint = 0xffffff;

    if (!sprite.overlap(muffinDropZone))
    {
        this.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
    }
    else{
        var posX = muffinList[sprite.key].x
        var posY = muffinList[sprite.key].y;
        this.makeMovableMuffin(posX, posY, sprite.key);
        sprite.x = 660;
        sprite.y = 20;
        sprite.inputEnabled = false;
        var t = currThis.add.tween(sprite).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        batterMap[sprite.key + "Batter"].displayAmt--;
        batterMap[sprite.key + "Batter"].amt--;
        currThis.muffinUpdate();
        t.onComplete.add(function () {
            console.log(batterMap[sprite.key + "Batter"].displayAmt);
            batterMap[sprite.key + "Batter"].textName.setText("COUNT: " + batterMap[sprite.key + "Batter"].displayAmt);
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

BlueRoom.Game.prototype.checkMuffinNumber = function(name){
    if(batterMap[ name + "Batter"].displayAmt >0){
        movableMuffinMap[name].inputEnabled = true;
        movableMuffinMap[name].alpha = 1;
    } else{
        movableMuffinMap[name].inputEnabled = false;
        movableMuffinMap[name].alpha = 0.3;
    }
}

BlueRoom.Game.prototype.muffinUpdate = function(){
    this.checkMuffinNumber("pistachio");
    this.checkMuffinNumber("doubleChoc");
    this.checkMuffinNumber("chocChip");
    this.checkMuffinNumber("bananaNut");
    this.checkMuffinNumber("tripleBerry");
    this.checkMuffinNumber("bran");
}

BlueRoom.Game.prototype.bakeryUpdate= function () {
    // 
};