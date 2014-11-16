function Player(tile) {
    var that = this;

    this.x = 0;
    this.y = 0;
    this.width = config.palyerWidth;
    this.height = config.playerHeight;
    this.speed = config.playerSpeed;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.grounded = false;
    this.color = config.playerColor;
    this.isActive = true;

    if (tile) {
        this.y = tile.y - this.height;
        this.x = tile.x + tile.width / 2 - this.width / 2;
    }

    this.update = function (keys, tiles) {
        if (keys[38] || keys[32]) {
            // up arrow or space
            if (!that.jumping) {
                that.jumping = true;
                that.grounded = false;
                that.velY = -player.speed * config.playerJumpSpeed;
            }
        }
        if (keys[39]) {
            // right arrow
            if (that.velX < that.speed) {
                that.velX++;
            }
        }
        if (keys[37]) {
            // left arrow
            if (that.velX > -that.speed) {
                that.velX--;
            }
        }

        that.velY += config.gravity;
        that.velX *= config.friction;

        that.grounded = false;

        for (var i = 0; i < tiles.length; i++) {
            var dir = colCheck(that, tiles[i]);

            if (dir === "l" || dir === "r") {
                that.velX = 0;
                that.jumping = false;
            } else if (dir === "b") {
                that.grounded = true;
                that.jumping = false;
            } else if (dir === "t") {
                that.velY = 2;
            }
            //Check for falling to left
            if (that.x + that.width - 5 < tiles[i].x && that.y < tiles[i].y + tiles[i].height) {
                that.jumping = true;
            }
            //Check for falling to right
            if (that.x > tiles[i].x + tiles[i].width - 5 && that.y < tiles[i].y + tiles[i].height) {
                that.jumping = true;
            }

        }

        if (that.grounded) {
            that.velY = 0;
        }

        that.x += that.velX;
        that.y += that.velY;

        if (that.y > (config.canvasHeight + config.playerHeight)) {
            that.isActive = false;
        }

        return that.isActive;
    }
}