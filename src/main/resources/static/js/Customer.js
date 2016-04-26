var currThis = this;

function Customer(id, station, order){
    this.id = id;
    this.sprite = currThis.add.group();

    var cust = currThis.game.add.sprite(0, 5, 'customer');
    cust.anchor.setTo(0.5, 0.5);
    this.sprite.add(cust);

	this.barProgress = 30;
	//this.bar = this.game.add.bitmapData(30, 2);
	this.bar = currThis.add.bitmapData(30,2);
    var bar = currThis.game.add.sprite(0, -60, this.bar);
    bar.anchor.setTo(0.5, 0.5);
    this.sprite.add(bar);

    this.station = station;
    this.order = order;
    this.happiness = 1;
    this.ingredients = null;
    this.ingMap = null;
    this.createBar();
}


Customer.prototype = {

    // setUpInteractions =function(sprite){
    //     sprite.events.onInputOver.add(this.onOver, this);
    //     sprite.events.onInputOut.add(this.onOut, this);
    //     sprite.events.onDragStart.add(this.onDragStart, this);
    //     sprite.events.onDragStop.add(this.onDragStop, this);
    // };

    flashDollar: function(){
        var sign = currThis.add.sprite(0, -80, 'dollarSign');
        sign.anchor.setTo(0.5, 0.5);
        this.sprite.add(sign);
        var counter = 0;
        var timer = setInterval(function(){
            if(counter%2 == 0){
                sign.loadTexture('dollarSign');
            }
            else{
                sign.loadTexture('dollarSignDark');
            }
            counter++;
        }, 100);
    },

   	createBar : function(){
        var mygame = this;
    	var timer = setInterval(function(){
      		mygame.barProgress-=0.1;
      	}, 100);

        var mygame = this;
        var mytimer = setInterval(function(){
          	mygame.myupdate();
        }, 10);
	},

 	myupdate: function() {
        // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);
        
        // some simple colour changing to make it look like a health bar
        if (this.barProgress < 10) {
           this.bar.context.fillStyle = '#f00';   
        }
        else if (this.barProgress < 20) {
            this.bar.context.fillStyle = '#ff0';
        }
        else {
            this.bar.context.fillStyle = '#0f0';
        }
        
        // draw the bar
        this.bar.context.fillRect(0, 0, this.barProgress, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;
    }

};