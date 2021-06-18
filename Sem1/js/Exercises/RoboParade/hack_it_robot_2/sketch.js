function setup() {
  noStroke();
}

function draw() {
  background(204);
  let x1 = map(mouseX, 0, width, 25, 75,true);
    
    console.log('MouseX:'+mouseX+' x1: '+x1);
  ellipse(x1, 25, 25, 25);
  //This ellipse is constrained to the 0-100 range
  //after setting withinBounds to true
  let x2 = map(mouseX, 0, width, 0, 100, true);
  ellipse(x2, 75, 25, 25);
}