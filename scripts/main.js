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
    highScores = new HighScores(),
    isActive = true,
    canRun = true,
    isRestart = false,
    score = 0;

function restart() {
    app.tiles = new Tiles();
    app.player = new Player(tiles.activeTiles[0]);
    app.board = new Board(canvasEl, player);
    app.isActive = true;
    app.canRun = true;
    app.isRestart = false;
    app.score = 0;

    btnStartStopEl.innerHTML = config.lblStop;

    app.message.hide();
}

function update() {
    if (isActive && canRun && !isRestart) {
        score++;
        lblScoreEl.innerHTML = app.score;
        board.clearRect();

        tiles.update();
        isActive = player.update(keys, tiles.activeTiles);

        for (var tile in tiles.activeTiles) {
            board.fillRect(tiles.activeTiles[tile]);
        }

        board.fillRect(player);

        requestAnimationFrame(update);
    } else {
        if (!isActive) {
            var isHighScore = highScores.setScore(score);
            if (isHighScore) {
                message.show("Congratulations! High Score!", true);
            } else {
                message.show("Game Over", true);
            }
        }

        if (isRestart) {
            app.restart();
            app.update();
        }

        if (!canRun) {
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
    if (app.canRun) {
        message.show("Pause");
        btnStartStopEl.innerHTML = config.lblStart;
        app.canRun = false;
    } else {
        app.message.hide();
        btnStartStopEl.innerHTML = config.lblStop;
        app.canRun = true;
        update();
    }
});

btnRestartEl.addEventListener("click", function () {
    app.isRestart = true;

    if(!canRun || !isActive) {
        app.restart();
        update();
    }
});

window.addEventListener("load", function () {
    highScores.update();
    update();
});



