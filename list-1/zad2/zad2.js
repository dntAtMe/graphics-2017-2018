onload = function() {

    let slider = document.getElementById("range");
    slider.oninput = () => redrawKochCurve(slider.value);
    redrawKochCurve(0);
}

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
    turtleContext
);

function drawKochCurve (x1, y1, x2, y2, color, alfa1, alfa2, k){

    if (k < 0)
        return;
    if (k == 0) {
        rotateTurtle(turtle, -alfa2)
        moveForward(supportContext, turtle, distance(x1, y1, x2, y2) );
        rotateTurtle(turtle, alfa2)
        return;
    }  
   
  let xa = x1 + 1/3 * (x2 - x1),
      ya = y1 + 1/3 * (y2 - y1),
  
      xb = x1 + 2/3 * (x2 - x1),
      yb = y1 + 2/3 * (y2 - y1),
  
      xc = xa + (xb - xa) * Math.cos(alfa1) - (yb - ya) * Math.sin(alfa1),
      yc = ya + (yb - ya) * Math.cos(alfa1) + (xb - xa) * Math.sin(alfa1);

  drawKochCurve(x1,y1, xa,ya, color, alfa1, alfa2, k -1);
  drawKochCurve(xa,ya, xc,yc, color, alfa1, alfa2 + 60, k - 1);
  drawKochCurve(xc,yc, xb,yb, color, alfa1, alfa2 - 60, k - 1);
  drawKochCurve(xb,yb, x2,y2, color, alfa1, alfa2, k - 1);  

}

function redrawKochCurve(depth) {
    console.log("deg " + depth)
    clearCanvas(supportContext, "rgb(255,255,255)");
    let width = 4;
    let height = width * Math.sqrt(3) / 2;
    turtle.pos.x = 0;
    turtle.pos.y = 0;

    turtle.angle = 90;
    drawKochCurve(0, 0, width, 0, '#000', Math.PI/3, 0, depth);
    turtle.angle = 210;
    //drawKochCurve(width, 0, width / 2, height, '#000', Math.PI/3, 0, depth);
    turtle.angle = 330;
    //drawKochCurve(width / 2, height, 0, 0 , '#000', Math.PI/3, 0, depth);

}

function distance (x1, y1, x2, y2) {
    return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
}