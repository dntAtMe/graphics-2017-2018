onload= function() {
    let svg = document.querySelector("#kochSVG");
    setDimensions(svg, 800, 800, 10, 10);
    
    svg.innerHTML= '<g id="group"></g>';
    let group = document.querySelector("#group");

    let slider = document.getElementById("range");
    slider.oninput = () => redrawKochCurve(svg, slider.value);

    redrawKochCurve(svg, 0);

}


function setDimensions( svg, width, height, xMargin, yMargin){
    svg.setAttribute("width", ''+(width+2*xMargin));
    svg.setAttribute("height", ''+(height+2*yMargin));
    svg.setAttribute("viewBox", ' '+(-xMargin)+', '+(-yMargin)+', '+(width+2*xMargin)+', '+(height+2*yMargin));
    
}

function drawLine(x1, y1, x2, y2, color, width) {
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2
	+'" style="stroke:'+color+';stroke-width:'+width+'" />'+"\n";
}

function drawKochCurve (group, x1, y1, x2, y2, color, alfa, k){

    if (k < 0)
        return;
    if (k == 0) {
        group.innerHTML+=drawLine( x1, y1, x2, y2, "black" , 1);
        return;
    }  
   
    let xa = x1 + 1/3 * (x2 - x1),
      ya = y1 + 1/3 * (y2 - y1),
  
      xb = x1 + 2/3 * (x2 - x1),
      yb = y1 + 2/3 * (y2 - y1),
  
      xc = xa + (xb - xa) * Math.cos(alfa) - (yb - ya) * Math.sin(alfa),
      yc = ya + (yb - ya) * Math.cos(alfa) + (xb - xa) * Math.sin(alfa);

  drawKochCurve(group, x1,y1, xa,ya, color, alfa, k -1);
  drawKochCurve(group, xa,ya, xc,yc, color, alfa, k - 1);
  drawKochCurve(group, xc,yc, xb,yb, color, alfa, k - 1);
  drawKochCurve(group, xb,yb, x2,y2, color, alfa, k - 1);  

}

function redrawKochCurve(svg, depth) {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
    svg.innerHTML= '<g id="group"></g>';
   
    let group = document.querySelector("#group");

    let width = 600;
    let height = 600;
    console.log(depth);
    drawKochCurve(group, 0, height, width, height, '#000', -Math.PI/3, depth);
}

function distance (x1, y1, x2, y2) {
    return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
}