function Tile (level) {
    var that = this;

    this.width = config.tileMaxWidth;
    this.height = config.tileHeight;
    this.color = config.tileColor;
    this.y = -config.tileHeight;
    this.x = 0;

    this.level = 1;

    if (level) {
        that.level = level;
    }

    this.velY = config.tileStartVel * (1 + this.level * config.tileLevelUpRatio);

    this.setRandomX = function() {
        var length = config.canvasWidth - that.width;
        var random = Math.floor(Math.random()* length);
        that.x = random;
    }

    //Init first x random:
    this.setRandomX();

    this.update = function() {
        var isActive = true;
        that.y += that.velY;

        if (that.y >= config.canvasHeight) {
            that.y = 0;
            that.setRandomX();
            isActive = false;
        }

        return isActive;
    }
}