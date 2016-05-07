function CustomerStatusBar(customer, x, y){
	this.customer = customer;
	this.happinessBarProgress = (customer.happinessBarProgress/30) * 100;
	this.bar = currThis.add.bitmapData(this.happinessBarProgress, 30);
    this.barSprite = currThis.game.add.sprite(x, y, this.bar);
    this.barSprite.anchor.setTo(0.5, 0);
    var currBar = this;
    setInterval(function(){
    	currBar.updateBar();
    }, 10);
}

CustomerStatusBar.prototype = {
	updateBar: function(){
		this.realhappinessBarProgress = this.customer.happinessBarProgress;
		this.happinessBarProgress = (this.customer.happinessBarProgress/30) * 100;
		this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);
        // some simple colour changing to make it look like a health bar
        if (this.realhappinessBarProgress < 10) {
           this.bar.context.fillStyle = '#f00';   
        }
        else if (this.realhappinessBarProgress < 20) {
            this.bar.context.fillStyle = '#ff0';
        }
        else {
            this.bar.context.fillStyle = '#0f0';
        }

        // draw the bar
        this.bar.context.fillRect(0, 0, this.happinessBarProgress, 8);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;
	},

	discard: function(){
		this.barSprite.destroy();
	}
}