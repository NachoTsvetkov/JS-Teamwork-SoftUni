
function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.moveTo(0,300);
    ctx.lineTo(400,300);
    ctx.stroke();
}

draw();

