function Tiles (level) {
    var that = this;
    this.level = 1;

    if (level) {
        that.level = level;
    }

    this.activeTiles = [new Tile(level)];
    this.unactiveTiles = [];
    this.timeInterval = 0;

    this.timeEnd = config.tilesTimeInterval - level * config.tilesLevelUpRatio;

    this.update = function() {
        if(that.timeInterval == config.tilesTimeInterval) {
            var tile = that.unactiveTiles.shift() || new Tile(level);
            that.activeTiles.push(tile);
            that.timeInterval = 0;
        }

        for (var tile in that.activeTiles) {
            var isActive = that.activeTiles[tile].update();

            if (!isActive) {
                that.unactiveTiles.push(that[tile]);
                that.activeTiles.splice(tile, 1);
                tile--;
            }
        }

        that.timeInterval++;
    }
}
