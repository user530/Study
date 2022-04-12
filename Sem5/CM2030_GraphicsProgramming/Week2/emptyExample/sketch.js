let ball;

function setup() {
  createCanvas(900, 600);
  background(0);
  ball = new Ball(25);
}

function draw() {
  //background(0);
  ball.run();
}

class Ball {
  constructor(_r) {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.prevLoc = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 8;
    this.r = _r;
  }

  run() {
    this.draw();
    this.move();
    this.bounce();
  }

  draw() {
    stroke(255);
    fill(255, 0, 0);
    //ellipse(this.location.x, this.location.y, 2 * this.r, 2 * this.r);
    line(this.prevLoc.x, this.prevLoc.y, this.location.x, this.location.y);
    this.prevLoc = this.location.copy();
  }

  move() {
    let mousePos = new createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(mousePos, this.location);
    direction.normalize();
    direction.mult(0.3);
    this.acceleration = direction;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }

  bounce() {
    if (this.location.x <= 0) {
      this.location.x = width;
    } else if (this.location.x >= width) {
      this.location.x = 0;
    } else if (this.location.y <= 0) {
      this.location.y = height;
    } else if (this.location.y >= height) {
      this.location.y = 0;
    }
  }
}
