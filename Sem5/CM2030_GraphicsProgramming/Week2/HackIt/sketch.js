//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls = [];
let col = 255;
let strW = 0.2;
///////////////////////////////////////////////
function setup() {
  createCanvas(900, 600);
  background(0);

  for (let i = 0; i < 100; ++i) {
    balls.push(new Ball());
  }
}
////////////////////////////////////////////////
function draw() {
  for (const ball of balls) {
    ball.run();
  }
}
///////////////////////////////////////////////
class Ball {
  constructor() {
    let randomX = width / 2 + random(-100, 100);
    let randomY = height / 2 + random(-100, 100);

    this.velocity = new createVector(0, 0);
    this.location = new createVector(randomX, randomY);
    this.prevLoc = new createVector(randomX, randomY);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 15;
  }

  run() {
    this.draw();
    this.move();
  }

  draw() {
    if (frameCount % 100 == 0) {
      col = [random(0, 255), random(0, 255), random(0, 255)];
      strW = random(0.2, 1);
    }
    stroke(col);
    strokeWeight(strW);
    line(this.prevLoc.x, this.prevLoc.y, this.location.x, this.location.y);
    this.prevLoc = this.location.copy();
  }

  move() {
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }
}
