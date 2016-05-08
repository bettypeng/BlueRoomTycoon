var BlueRoom = {};

BlueRoom.Boot = function (game) {

};

BlueRoom.Boot.prototype = {

    init: function () {

        //  Unless game needs to support multi-touch
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. Can disable that here.
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  Desktop specific settings go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings: scale the game, no lower than 480x260 and no higher than 1024x768
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        // Load the assets required for preloader (background and a loading bar)
        this.load.image('preloaderBackground', 'images/loading.png');
        this.load.image('preloaderBar', 'images/blue_loading_bar.png');

    },

    create: function () {

        //  Preloader assets have loaded to the cache
        //  we've set the game settings
        //  start the real preloader going
        this.state.start('Preloader');

    }

};
