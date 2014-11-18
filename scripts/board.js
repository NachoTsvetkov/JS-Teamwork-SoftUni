function Board(element, player) {
    var that = this;

    this.setElement = function(element) {
        that.el = element;
        that.el.width = config.canvasWidth;
        that.el.height = config.canvasHeight;
        that.context = this.el.getContext("2d");
    }

    this.setPlayer = function(player) {
        that.fillRect(player);
    }

    this.fillRect = function (rect, imgEl) {
        if (imgEl) {
            that.context.drawImage(imgEl, rect.x, rect.y);
        } else {
            that.context.fillStyle = rect.color;
            that.context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    }

    this.clearRect = function() {
        that.context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
    }

    //Init the component:
    if (element) {
        that.setElement(element);
    }

    if (player) {
        that.setPlayer(player);
    }

}
