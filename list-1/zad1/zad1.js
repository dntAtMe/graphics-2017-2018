/*
keys = {};

onkeydown = function (e) {
    let code = e.which || e.keyCode;
    keys[code] = true;
   // console.log(keys[code] + " " + code);
    if (keys[38]) // FORWARD
        moveForward(supportContext, turtle, 0.1);
            
    if (keys[37]) // LEFT
        rotateTurtle(turtle, -10)
            
    if (keys[39]) //RIGHT
        rotateTurtle(turtle, 10)
}

onkeyup = function(e) {
    e.preventDefault();
    let code = e.which || e.keyCode;
    keys[code] = false;
}
*/
/////////////////////////////////////////

function xCanvas(context, x, xBounds) {
    return (x - xBounds.min) / (xBounds.max-xBounds.min) * context.canvas.width;
}

function yCanvas(context, y, yBounds) {
    return context.canvas.height - (y - yBounds.min) / (yBounds.max-yBounds.min) * context.canvas.height;
}

function drawPixel(context, x, y, bounds) {
    if (bounds.x.min <= x && x < bounds.x.max && bounds.y.min <= y && y < bounds.y.max) {
        context.fillRect( xCanvas(context, x, bounds.x), yCanvas(context, y, bounds.y), 1, 1);
    }
}

function setPosition(turtle, newPos) {
    turtle.pos.x = newPos.newX;
    turtle.pos.y = newPos.newY;
}

function clearCanvas(context, color) {
    context.fillStyle = color;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function deg2rad(deg) {
    return deg / 180 * Math.PI;
}

function rad2deg(rad) {
    return rad / Math.PI * 180;
}

function rotate(angle, origin, point) {
    let result = {x: 0, y: 0};
    result.y = Math.cos(angle) * (point.y - origin.y) + Math.sin(angle) * (point.x - origin.x);
    result.x = Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y);
    return result;
}

function rotateTurtle(turtle, angle) {
    turtle.angle = (turtle.angle + angle) % 360;
    redraw(supportContext.canvas, turtle);
}

function redraw(pathCanvas, turtle) {
    clearCanvas(turtle.context, "rgb(255,255,255)");
    drawTurtle(turtle.context, turtle);
    turtle.context.drawImage(pathCanvas, 0, 0);
}

function drawTurtle(context, turtle) {
    if (turtle.visible) {

        let p0 = rotate( -deg2rad(turtle.angle), turtle.pos, {x: turtle.pos.x - turtle.drawable.width, y: turtle.pos.y} );
        let p1 = rotate( -deg2rad(turtle.angle), turtle.pos, {x: turtle.pos.x + turtle.drawable.width, y: turtle.pos.y} );
        let p2 = rotate( -deg2rad(turtle.angle), turtle.pos, {x: turtle.pos.x, y: turtle.pos.y + turtle.drawable.height} );

        context.beginPath();
        context.moveTo( xCanvas(context, p0.x + turtle.pos.x, bounds.x), yCanvas(context, p0.y + turtle.pos.y, bounds.y) );
        context.lineTo( xCanvas(context, p1.x + turtle.pos.x, bounds.x), yCanvas(context, p1.y + turtle.pos.y, bounds.y) );
        context.lineTo( xCanvas(context, p2.x + turtle.pos.x, bounds.x), yCanvas(context, p2.y + turtle.pos.y, bounds.y) );
        context.closePath();
        context.stroke();
        context.fillStyle = "white"
        context.fill();
    }
}

function moveForward(context, turtle, distance) {
    let newX = turtle.pos.x + (distance * Math.sin(deg2rad(turtle.angle)));
    let newY = turtle.pos.y + (distance * Math.cos(deg2rad(turtle.angle)));

    context.save();
    if (turtle.penDown) {
        context.beginPath();
        context.moveTo( xCanvas(context, turtle.pos.x, bounds.x), yCanvas(context, turtle.pos.y, bounds.y) );
        context.lineTo( xCanvas(context, newX, bounds.x), yCanvas(context, newY, bounds.y) );
        context.closePath();
        context.stroke();

    }
    context.restore();

    setPosition(turtle, {newX, newY});
    redraw(context.canvas, turtle);
}

function goTo(turtle, pos) {
    setPosition(turtle, pos);
    redraw(supportContext.canvas, turtle);
}

function createTurtle(pos, visible, dim, context) {
    let turtle = {
        pos: pos,
        angle: 0,
        visible,
        context,
        penDown: true,
        drawable: {
            width: dim.width * xBounds / 2 / ratio,
            height: dim.height * yBounds / 2 / ratio,
        },
    }
    redraw(supportContext.canvas, turtle);

    return turtle;
}

function Draw(pathctx, trtl) {
    let turtle = trtl;
    let pathContext = pathctx;

    function rectangle(start, a) {
        goTo(turtle, start);
        for (let i = 0; i < 4; i++) {
            moveForward(pathContext, turtle, a);
            rotateTurtle(turtle, 90);
        }
    }

    function hexagon(start, a) {
        goTo(turtle, start);
        for (let i = 0; i < 6; i++) {
            moveForward(pathContext, turtle, a);
            rotateTurtle(turtle, 60);
        }
    }

    function triangle(start, a) {
        goTo(turtle, start);
        rotateTurtle(turtle, 30);
        for (let i = 0; i < 3; i++) {
            moveForward(pathContext, turtle, a);
            rotateTurtle(turtle, 120);
        }
    }

    function Draw() {
        return {
            rectangle,
            hexagon,
            triangle,
        }
    }

    return Draw();
}

let turtleCanvas = document.getElementById("turtleCanvas");
let turtleContext = turtleCanvas.getContext("2d");

let supportContext = document.getElementById("supportCanvas").getContext("2d");

let bounds = {
    x: {
        min: -5,
        max: 5,
    },
    y: {
        min: -5,
        max: 5,
    },
}

let xBounds = (Math.abs(bounds.x.min) + bounds.x.max)
let yBounds = (Math.abs(bounds.x.min) + bounds.x.max)
let ratio = xBounds / yBounds;
