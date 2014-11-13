(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var config = new Config();
var app = this;

var canvasEl = document.getElementById("canvas"),
    messageEl = document.getElementById("lblMessage"),
    btnStartStopEl = document.getElementById("btnStartStop"),
    btnRestartEl = document.getElementById("btnRestart"),
    lblScoreEl = document.getElementById("lblScore"),
    lblLevelEl = document.getElementById("lblLevel"),
    message = new Message(messageEl),
    keys = [],
    tiles = new Tiles(),
    player = new Player(tiles.activeTiles[0]),
    board = new Board(canvasEl, player),
    isActive = true,
    canRun = true,
    score = 0;

function update() {
    if (isActive && canRun) {
        score++;
        lblScoreEl.innerHTML = score;

        board.clearRect();

        tiles.update();
        isActive = player.update(keys, tiles.activeTiles);

        for (var tile in tiles.activeTiles) {
            board.fillRect(tiles.activeTiles[tile]);
        }

        board.fillRect(player);

        requestAnimationFrame(update);
    } else {
        if(!isActive) {
            //To Do: add high score
            //var isHighScore = highScores.setScore(score);
            //if (isHighScore) {
            //  message.show("Congratulations! High Score!", true);
            // } else
                message.show("Game Over", true);
            //}
        }

        if(!canRun) {
            board.clearRect();
        }
    }
}

// EVENT LISTENERS
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

btnStartStopEl.addEventListener("click", function () {
    if(app.canRun) {
        message.show("Pause");
        app.canRun = !canRun;
    } else {
        app.message.hide();
        app.canRun = !canRun;
        update();
    }
});

btnRestartEl.addEventListener("click", function () {
    app.isActive = false;

    app.tiles = new Tiles();
    app.player = new Player(tiles.activeTiles[0]);
    app.board = new Board(canvasEl, player);
    app.isActive = true;
    app.canRun = true;
    app.score = 0;

    app.update();
});

window.addEventListener("load", function () {
    update();
});



