let startSize;

function setup() {
  createCanvas(900, 900);
  background(0);
  startSize = pow(3, 6);

  fill(255);
  noStroke();
  noSmooth();
  rectMode(CENTER);
}

function draw() {
  translate(width / 2, height / 2);
  mySquare(startSize);
  noLoop();
}

function mySquare(side) {
  side = side / 3;

  if (side < 1) return;

  rect(0, 0, side, side);

  for (let i = 0; i < 9; ++i) {
    if (i == 4) continue;
    push();
    translate(-side * (1 - (i % 3)), -side * (1 - int(i / 3)));
    mySquare(side);
    pop();
  }
}
