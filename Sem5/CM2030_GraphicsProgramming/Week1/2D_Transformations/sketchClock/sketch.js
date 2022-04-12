const secLen = 160;
const secWid = 5;

const minLen = 140;
const minWid = 7;

const hourLen = 120;
const hourWid = 10;

const clockD = 400;

function setup() {
  createCanvas(900, 600);
  background(0);
  angleMode(DEGREES);
}

function draw() {
  // White background
  background(255, 255, 255);

  // Center
  translate(width / 2, height / 2);

  // Draw clock
  createClock();

  // Draw second
  drawSec();

  // Draw minutes
  drawMin();

  // Draw hour
  drawHour();
}

function drawSec() {
  push();
  {
    strokeWeight(secWid);
    stroke(255, 0, 0);

    let secAngle = map(second(), 0, 60, 0, 360);
    rotate(secAngle);
    line(0, 0, 0, -secLen);
  }
  pop();
}

function drawMin() {
  push();
  {
    strokeWeight(minWid);
    stroke(255, 0, 0);

    let minAngle = map(minute(), 0, 60, 0, 360);
    rotate(minAngle);
    line(0, 0, 0, -minLen);
  }
  pop();
}

function drawHour() {
  push();
  {
    strokeWeight(hourWid);
    stroke(255, 0, 0);

    let hourAngle = map(hour() % 12, 0, 12, 0, 360);
    rotate(hourAngle);
    line(0, 0, 0, -hourLen);

    push();
    {
      translate(0, -hourLen + 20);
      ellipse(0, 0, 20, 20);
    }
    pop();
  }
  pop();
}

function createClock() {
  // Draw clock base
  ellipse(0, 0, clockD, clockD);

  let hours = 12;
  let hourStep = 360 / hours;

  stroke(255, 255, 255);
  line(clockD, 0, clockD * 0.8, 0);

  for (let i = 0; i < hours; ++i) {
    push();
    {
      rotate(hourStep * i);
      translate(clockD / 2, 0);

      let w = i % 3 == 0 ? 5 : 3;
      let l = i % 3 == 0 ? -40 : -20;
      strokeWeight(w);
      line(0, 0, l, 0);
    }
    pop();
  }
}
