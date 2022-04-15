//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

let balls = [];
let collisionZones = [];
let fr_koef = 0.03;
///////////////////////////////////////////////
function setup() {
  createCanvas(600, 400);
  noStroke();

  collisionZones.push(new CollisionZone(200, 100, 100, 100, color(255, 0, 0)));
  collisionZones.push(new CollisionZone(0, 300, 50, 50, color(0, 255, 0)));
  collisionZones.push(new CollisionZone(400, 250, 200, 50, color(255, 255, 0)));
}
///////////////////////////////////////////////
function draw() {
  background(0);

  for (const ball of balls) {
    let gravity = new createVector(0, 0.1);

    let friction = ball.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(fr_koef);

    ball.applyForce(gravity);
    ball.applyForce(friction);

    ball.run();
  }

  for (const zone of collisionZones) {
    zone.draw();
  }
}

function mouseDragged() {
  balls.push(new Ball(mouseX, mouseY));
}

function keyPressed() {
  balls = [];
}

///////////////////////////////////////////////
class Ball {
  constructor(ballX, ballY) {
    this.velocity = new createVector(random(-3, 3), random(-3, 3));
    this.location = new createVector(ballX, ballY);
    this.acceleration = new createVector(0, 0);
    this.size = random(20, 60);
    this.color = color(255);
    this.age = 255;
    this.posCollis = [];
  }

  run() {
    this.draw();
    this.move();
    this.bounce();
    this.collisCheck();
  }

  draw() {
    push();
    this.color.setAlpha(this.age);
    fill(this.color);
    ellipse(this.location.x, this.location.y, this.size, this.size);
    pop();

    --this.age;

    this.autoClear();
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce() {
    if (this.location.x > width - this.size / 2) {
      this.location.x = width - this.size / 2;
      this.velocity.x *= -1;
    } else if (this.location.x < this.size / 2) {
      this.velocity.x *= -1;
      this.location.x = this.size / 2;
    }
    if (this.location.y > height - this.size / 2) {
      this.velocity.y *= -1;
      this.location.y = height - this.size / 2;
    }
  }

  collisCheck() {
    let posCollis = [];
    for (const zone of collisionZones) {
      for (const ball of balls) {
        if (ball.location.dist(zone.center) <= ball.size / 2 + zone.diag / 2) {
          posCollis.push([zone, ball]);
        }
      }
    }

    for (const pair of posCollis) {
      if (this.collisCompare(pair[0], pair[1]))
        pair[1].color = color(pair[0].color.levels);
    }
  }

  collisCompare(zone, ball) {
    let x = ball.location.x;
    let y = ball.location.y;

    if (ball.location.x < zone.center.x - zone.w / 2)
      x = zone.center.x - zone.w / 2;
    else if (ball.location.x > zone.center.x + zone.w / 2)
      x = zone.center.x + zone.w / 2;

    if (ball.location.y < zone.center.y - zone.h / 2)
      y = zone.center.y - zone.h / 2;
    else if (ball.location.y > zone.center.y + zone.h / 2)
      y = zone.center.y + zone.y / 2;

    return ball.location.dist(createVector(x, y)) <= ball.size / 2;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  autoClear() {
    for (const ind in balls) {
      if (alpha(balls[ind].color) === 0) balls.splice(ind, 1);
    }
  }
}

class CollisionZone {
  constructor(zoneX, zoneY, zoneW, zoneH, zoneCol) {
    this.x = zoneX;
    this.y = zoneY;
    this.w = zoneW;
    this.h = zoneH;
    this.color = zoneCol;
    this.center = new createVector(zoneX + zoneW / 2, zoneY + zoneH / 2);
    this.diag = sqrt(pow(zoneW, 2) + pow(zoneH, 2));
  }

  draw() {
    push();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
