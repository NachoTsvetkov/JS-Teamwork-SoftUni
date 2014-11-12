// INITIALIZATION
var WIDTH = 400;
var HEIGHT = 600;

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    player = {
        x: WIDTH / 2,
        y: HEIGHT - 20,
        width: 20,
        height: 20,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        color: "#FF0000"
    },
    keys = [];
    friction = 0.9;
    gravity = 0.1;

canvas.width = WIDTH;
canvas.height = HEIGHT;

ctx.fillStyle = player.color;
ctx.fillRect(player.x, player.y, player.width, player.height);

// GAME LOOP
function update() {
    if (keys[38] || keys[32]) {
        // up arrow or space
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.speed * 2;
        }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    player.velY += gravity;
    player.velX *= friction;
    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= WIDTH - player.width) {
        player.x = WIDTH - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= HEIGHT - player.height) {
        player.y = HEIGHT - player.height;
        player.jumping = false;
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
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