class Spaceship {
  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run() {
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw() {
    fill(125);
    triangle(
      this.location.x - this.size / 2,
      this.location.y + this.size / 2,
      this.location.x + this.size / 2,
      this.location.y + this.size / 2,
      this.location.x,
      this.location.y - this.size / 2
    );
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  interaction() {
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.1, 0));

      // add jets
      this.drawJets(-HALF_PI);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.applyForce(createVector(0.1, 0));
      // add jets
      this.drawJets(HALF_PI);
    }
    if (keyIsDown(UP_ARROW)) {
      this.applyForce(createVector(0, -0.1));
      // add jets
      this.drawJets();
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.applyForce(createVector(0, 0.1));
      // add jets
      this.drawJets(-PI);
    }
  }

  fire() {
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges() {
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }

  setNearEarth() {
    //YOUR CODE HERE (6 lines approx)
    let g = new createVector(0, 0.05);
    let fric = this.velocity.copy();
    fric = fric.mult(-1 / 30);
    this.applyForce(fric);
    this.applyForce(g);
  }

  drawJets(angle) {
    push();
    fill(255, 125, 0);
    translate(this.location.x, this.location.y);
    rotate(angle);
    // Big flame
    quad(
      0,
      this.size / 2 + 10,
      -this.size * 0.4,
      this.size / 2 + 15,
      0,
      this.size / 2 + 35,
      this.size * 0.4,
      this.size / 2 + 15
    );
    // Small flame
    scale(0.5);
    fill(255, 0, 0);
    translate(0, 40);
    quad(
      0,
      this.size / 2 + 10,
      -this.size * 0.4,
      this.size / 2 + 15,
      0,
      this.size / 2 + 35,
      this.size * 0.4,
      this.size / 2 + 15
    );
    pop();
  }
}
