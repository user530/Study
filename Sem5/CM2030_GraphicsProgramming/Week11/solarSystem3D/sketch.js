function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(150);
  sun();
  earth();
  camera(0, -300, 800, 0, 0, 0, 0, 1, 0);
}

function sun() {
  pointLight(255, 255, 255, 0, 0, 0);
  pointLight(255, 255, 255, 0, 0, 0);
  push();
  noStroke();
  ambientLight(250, 250, 250);
  fill(255, 255, 255);
  sphere(100);
  pop();
}

function earth() {
  push();
  const orbit = 350;
  translate(orbit * cos(frameCount), 0, orbit * sin(frameCount));
  rotateY(frameCount);
  stroke(1);
  ambientMaterial(255, 255, 255);
  sphere(50);
  pop();
}
