let time = 0;

function setup() {
  createCanvas(900, 600);
  background(0);
  rectMode(CENTER);
}

function draw() {
  background(0);
  let nX = noise(time);
  let locX = map(nX, 0, 1, 0, width);
  let g = map(nX, 0, 1, 0, 255);
  let rotZ = map(nX, 0, 1, -25, 25);

  let nY = noise(time + 10);
  let locY = map(nY, 0, 1, 0, height);

  translate(locX, locY);
  rotate(rotZ);
  fill(0, g, 0);
  rect(0, 0, 100, 100);

  time += 0.01;
}
