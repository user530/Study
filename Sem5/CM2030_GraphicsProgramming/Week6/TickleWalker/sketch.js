let tickler;

function setup() {
  createCanvas(900, 600);
  background(0);
  tickler = new Tickler(width / 2, height / 2, 50);
}

function draw() {
  background(0);
  tickler.run();
}

class Tickler {
  constructor(_x, _y, _r) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.col = color(random(0, 255), random(0, 255), random(0, 255));
  }

  run() {
    push();
    fill(this.col);
    if (
      mouseX >= this.x - this.r &&
      mouseX <= this.x + this.r &&
      mouseY >= this.y - this.r &&
      mouseY <= this.y + this.r
    ) {
      this.x += random(-this.r / 4, this.r / 4);
      this.y += random(-this.r / 4, this.r / 4);
    }
    circle(this.x, this.y, this.r * 2);
    pop();
  }
}
