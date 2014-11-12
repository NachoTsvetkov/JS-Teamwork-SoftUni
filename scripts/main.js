(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var config = new Config();

var canvasEl = document.getElementById("canvas"),
    tiles = new Tiles(),
    player = new Player(tiles.activeTiles[0]),
    board = new Board(canvasEl, player);
    keys = [],
    isActive = true;

function update() {
    if (isActive) {
        board.clearRect();

        tiles.update();
        isActive = player.update(keys, tiles.activeTiles);

        for (var tile in tiles.activeTiles) {
            board.fillRect(tiles.activeTiles[tile]);
        }

        board.fillRect(player);

        requestAnimationFrame(update);
    }
}

// EVENT LISTENERS
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
});