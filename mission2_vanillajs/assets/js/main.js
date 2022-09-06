function Star(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,0,0," + alpha + ")";
}

Star.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.r * 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

Star.prototype.move = function () {
    this.y -= .15 + params.backgroundSpeed / 100;
    if (this.y <= -10) this.y = HEIGHT + 10;
    this.draw();
}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    WIDTH,
    HEIGHT,
    mouseMoving = false,
    mouseMoveChecker,
    mouseX,
    mouseY,
    stars = [],
    initStarsPopulation = 100,
    dots = [],
    dotsMinDist = 2,
    params = {
        maxDistFromCursor: 50,
        dotsSpeed: 0,
        backgroundSpeed: 100
    },
    fireFlame = document.getElementById("fire"),
    paramsFire = {
        maxPosX: 10,
        minPosX: -10
    },
    posXCurrFire = 0,
    isNaik = true,
    mieGoyang = document.getElementsByClassName("anim-rot");

setCanvasSize();
init();

function setCanvasSize() {
    WIDTH = document.documentElement.clientWidth,
        HEIGHT = document.documentElement.clientHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
}

function init() {
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    for (var i = 0; i < initStarsPopulation; i++) {
        stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
    }
    ctx.shadowBlur = 0;
    animate();
}

function fireMove() {
    if (!isNaik) {
        if (posXCurrFire >= paramsFire.maxPosX) isNaik = true;
        posXCurrFire++;
        fireFlame.style.transform = `translateX(${posXCurrFire}%)`;
    } else {
        if (posXCurrFire <= paramsFire.minPosX) isNaik = false;
        posXCurrFire--;
        fireFlame.style.transform = `translateX(${posXCurrFire}%)`;
    }
}

function mieGoyangAnim() {
    for (let index = 0; index < mieGoyang.length; index++) {
        if (index % 2 == 0)
            mieGoyang[index].style.transform = `rotate(${posXCurrFire}deg)`;
        else
            mieGoyang[index].style.transform = `rotate(${-1 * posXCurrFire}deg) scaleX(-1)`;
    }
}

// The typewriter element
var typeWriterElement = document.getElementsByClassName('anim-txt');

// The TextArray: 
var textArray = ["TERENAK", "TERMURAH", "TERBAIK", "TER-NGEUNAH"];

// function to generate the backspace effect 
function delWriter(text, i, cb) {
    if (i >= 0) {
        typeWriterElement[0].innerHTML = text.substring(0, i--);
        // generate a random Number to emulate backspace hitting.
        var rndBack = 10 + Math.random() * 100;
        setTimeout(function () {
            delWriter(text, i, cb);
        }, rndBack);
    } else if (typeof cb == 'function') {
        setTimeout(cb, 1000);
    }
};

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
    if (i < text.length + 1) {
        typeWriterElement[0].innerHTML = text.substring(0, i++);
        // generate a random Number to emulate Typing on the Keyboard.
        var rndTyping = 250 - Math.random() * 100;
        setTimeout(function () {
            typeWriter(text, i++, cb)
        }, rndTyping);
    } else if (i === text.length + 1) {
        setTimeout(function () {
            delWriter(text, i, cb)
        }, 1000);
    }
};

// the main writer function
function StartWriter(i) {
    if (typeof textArray[i] == "undefined") {
        setTimeout(function () {
            StartWriter(0)
        }, 1000);
    } else if (i < textArray[i].length + 1) {
        typeWriter(textArray[i], 0, function () {
            StartWriter(i + 1);
        });
    }
};
// wait one second then start the typewriter
setTimeout(function () {
    StartWriter(0);
}, 1000);

setInterval(fireMove, 100);
setInterval(mieGoyangAnim, 100);

function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i in stars) {
        stars[i].move();
    }

    requestAnimationFrame(animate);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}