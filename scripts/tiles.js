function Tiles () {
    var that = this;
    this.activeTiles = [new Tile()];
    this.unactiveTiles = [];
    this.timeInterval = 0;

    this.update = function(board) {
        if(that.timeInterval == config.tilesTimeInterval) {
            var tile = that.unactiveTiles.shift() || new Tile();
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
