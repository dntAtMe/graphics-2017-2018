onload = function() {

    let turtle = createTurtle(
        {
            x: 0,
            y: 0,
        },
        false,
        {
            width : 0.10 / 2,
            height: 0.15 / 2,
        },        
        turtleContext,

    );

    let drawClass = Draw(supportContext, turtle);
    drawClass.rectangle({newX: 2, newY: 1}, 1);
    drawClass.hexagon({newX: 0, newY: 1}, 1 / Math.sqrt(3));
    drawClass.triangle({newX: -2, newY: 1}, 1);
}
