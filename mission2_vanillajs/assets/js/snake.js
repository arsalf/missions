var canvasSnake, ctxSnake;
// Try other values!
var numberOfSegments = 20;
// Length of each segment of the snake
var segLength = 10;
// Diana's additions

// Arrays of x,y positions of each coordinate system
// one for each segment
// Trick to create arrays filled with zero values
var x = Array.apply(null, Array(numberOfSegments)).map(Number.prototype.valueOf, 0);

var y = Array.apply(null, Array(numberOfSegments)).map(Number.prototype.valueOf, 0); var mousePos;

function initSnake() {
    canvasSnake = document.getElementById("canvas");
    ctxSnake = canvasSnake.getContext('2d');

    // starts animation
    requestAnimationFrame(animateSnake);
}

window.onmousemove = function (e) {
    mouseMoving = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    clearInterval(mouseMoveChecker);
    mouseMoveChecker = setTimeout(function () {
        mouseMoving = false;
    }, 100);
}

function getMousePos(canvasSnake, evt) {
    // necessary to take into account CSS boundaries
    var rect = canvasSnake.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function animateSnake() {
    if (mouseMoving) {
        drawSnake(mouseX, mouseY);
    }

    requestAnimationFrame(animateSnake);
}

function drawSnake(posX, posY) {
    // DRAW BETTER HEAD HERE?
    drawHead(posX - 5, posY - 5);
    dragSegment(0, posX - 5, posY - 5);
    for (var i = x.length - 1; i >= 0; i--) {
        dragSegment(i + 1, x[i], y[i]);
    }
    // DRAW BETTER TAIL HERE ?
    drawTail();
}

function drawHead(xin, yin) {
    dx = xin - x[0];
    dy = yin - y[0];

    ctxSnake.save();
    ctxSnake.translate(dx, dy);

    ctxSnake.beginPath();
    ctxSnake.fillStyle = "yellow";
    ctxSnake.arc(mouseX - 5, mouseY - 5, 10, 0, 2 * Math.PI);
    ctxSnake.fill();
    ctxSnake.restore();
}

function drawTail() {
    dx = x[numberOfSegments - 2] - x[numberOfSegments - 1];
    dy = y[numberOfSegments - 2] - y[numberOfSegments - 1];

    angle = Math.atan2(dy, dx);

    ctxSnake.save();
    ctxSnake.translate(x[numberOfSegments - 1], y[numberOfSegments - 1]);
    ctxSnake.rotate(angle - (2 * Math.PI / 180));
    ctxSnake.translate(0, -5);

    ctxSnake.fillStyle = "yellow";
    ctxSnake.beginPath();
    ctxSnake.moveTo(0, 0);
    ctxSnake.lineTo(-20, 5);
    ctxSnake.lineTo(0, 10);
    ctxSnake.closePath();
    ctxSnake.fill();

    ctxSnake.restore();
}

function dragSegment(i, xin, yin) {
    dx = xin - x[i];
    dy = yin - y[i];

    angle = Math.atan2(dy, dx);

    x[i] = xin - Math.cos(angle) * segLength;
    y[i] = yin - Math.sin(angle) * segLength;

    ctxSnake.save();
    ctxSnake.translate(x[i], y[i]);
    ctxSnake.rotate(angle);

    var segColor;

    segColor = "rgba(255, 255, 0, 255)";
    drawLine(0, 0, segLength, 0, segColor, 10);

    ctxSnake.restore();
}

function drawLine(x1, y1, x2, y2, color, width) {
    ctxSnake.save();

    ctxSnake.strokeStyle = color;
    ctxSnake.lineWidth = width;

    ctxSnake.beginPath();
    ctxSnake.moveTo(x1, y1);
    ctxSnake.lineTo(x2, y2);
    ctxSnake.stroke();

    ctxSnake.restore();
}

initSnake();