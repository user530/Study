function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(125);

  // let xLoc = cos(frameCount) * height;
  // let yLoc = sin(frameCount * 3) * 300;
  // let zLoc = sin(frameCount)
  let xAim = sin(frameCount) * 300;
  camera(0, 0, height, xAim, 0, 0, 0, 1);

  normalMaterial();
  torus(200, 50, 50, 50);
  translate(0, 100, 0);
  rotateX(90);
  fill(200);
  plane(500, 500);
}
