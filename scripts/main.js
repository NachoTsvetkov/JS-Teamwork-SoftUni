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
    imgTileEl = document.getElementById("imgTile"),
    imgPlayerEl = document.getElementById("imgPlayer"),
    imgPlayerJEl = document.getElementById("imgPlayerJumping"),
    message = new Message(messageEl),
    keys = [],
    tiles = new Tiles(),
    player = new Player(tiles.activeTiles[0]),
    board = new Board(canvasEl, player),
    highScores = new HighScores(),

    isActive = true,
    canRun = true,
    isRestart = false,
    score = 0,
    level = 1;

function restart(level) {
    if (!level) {
        app.tiles = new Tiles();

        app.player = new Player(tiles.activeTiles[0]);
        app.board = new Board(canvasEl, player);
        app.isActive = true;
        app.canRun = true;
        app.isRestart = false;
        app.score = 0;
        app.level = 1;

        lblLevelEl.innerHTML = app.level;
        btnStartStopEl.innerHTML = config.lblStop;

        app.message.hide();

    } else {
        app.canRun = false;
        message.show(config.levelUpMessage + level, true, function() {
            app.tiles = new Tiles(level);

            app.player = new Player(tiles.activeTiles[0]);
            app.board = new Board(canvasEl, player);
            app.canRun = true;
            app.update();
        })
    }
}

function update() {
    if (isActive && canRun && !isRestart) {
        score++;
        lblScoreEl.innerHTML = app.score;

        if (score % config.levelUpScore == 0) {
            app.level++;
            lblLevelEl.innerHTML = app.level;

            app.restart(app.level);
        }

        board.clearRect();

        tiles.update();
        isActive = player.update(keys, tiles.activeTiles);

        for (var tile in tiles.activeTiles) {
            board.fillRect(tiles.activeTiles[tile], imgTileEl);
        }

        if (player.jumping || !player.grounded) {
            board.fillRect(player, imgPlayerJEl, true);
        } else {
            board.fillRect(player, imgPlayerEl, true);
        }
        board.fillRect(player, imgPlayerEl, true);

        requestAnimationFrame(update);
    } else {
        if (!isActive) {
            var isHighScore = highScores.checkScore(score);
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
    if (isActive) {
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
    lblLevelEl.innerHTML = app.level;
    highScores.fillList();
    update();
});



