function setup() {
  createCanvas(900, 600);
  background(0);
}

function draw() {
  background(0);
  let c = color(255, 0, 0);
  fill(c);
  ellipse(mouseX, mouseY, 20, 20);
}
