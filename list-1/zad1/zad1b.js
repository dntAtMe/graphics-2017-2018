onload = function() {

    let turtle = createTurtle(
        {
            x: 0,
            y: 0,
        },
        true,
        {
            width : 0.10 / 2,
            height: 0.15 / 2,
        },
        turtleContext
    );

    let forward = function (distance) {
        moveForward(supportContext, turtle, distance);
    }

    let right = function (angle) {
        rotateTurtle(turtle, angle);
    }

    let left = function (angle) {
        rotateTurtle(turtle, -angle);
    }

    let setVisible = function(visible) {
        turtle.visible = visible;
    }

    let setPen = function (penDown) {
        turtle.penDown = penDown;
    }

    let color = function (c) {
        supportContext.strokeStyle = c;
    }

    let command = document.getElementById("commandInput");
    command.addEventListener("keyup", event => {
        if (event.keyCode === 13) {
            console.log(command.value);
            eval(command.value);
        }
    });
}
