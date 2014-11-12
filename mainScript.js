
function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.moveTo(100,300);
    ctx.lineTo(300,300);
    ctx.stroke();
}

draw();

