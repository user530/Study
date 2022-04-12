const secLen = 160;
const secWid = 10;

const minLen = 140;
const minWid = 7;

const hourLen = 120;
const hourWid = 5;

function setup() {
  createCanvas(900, 600);
  background(0);
}

function draw() {
  // White background
  background(255, 255, 255);

  // Center
  translate(width / 2, height / 2);

  // Draw clock base
  ellipse(0, 0, 350);

  push();
  {
    strokeWeight(secWid);
    stroke(255, 255, 255);

    let secAngle = map(seconds(), 0, 60, 0, 360);
    rotate(radians(secAngle));
    line(0, 0, 0, -secLen);
  }
  pop();
}
