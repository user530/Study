// Code from a modified Daniel Shiffman example
// https://thecodingtrain.com/

var angle = 0;
var seed;

function setup() {
  createCanvas(400, 400);
  seed = random(1000);
}
////////////////////////////////////////////////
function draw() {
  background(225);
  angleMode(DEGREES);
  randomSeed(seed);
  angle = 45;
  stroke(255);
  translate(200, height);
  branch(100, 3);
}
/////////////////////////////////////////////////
function branch(len, thickness) {
  stroke(
    map(len, 0, 100, 145, 92),
    map(len, 0, 100, 94, 64),
    map(len, 0, 100, 80, 51)
  );
  strokeWeight(thickness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(random(-angle, 0) + map(noise(frameCount / 100), 0, 1, -20, 20));
    branch(len * random(0.5, 0.8), thickness * 0.8);
    pop();
    push();
    rotate(random(0, angle) + map(noise(frameCount / 100), 0, 1, -20, 20));
    branch(len * random(0.5, 0.8), thickness * 0.8);
    pop();
  } else {
    fill(random(25, 150), 255, random(25, 150), random(120, 255));
    ellipse(0, 0, random(5, 10), random(10, 20));
  }
}
