function setup() {
  createCanvas(900, 600);
  colorMode(HSB);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(0);
  const brW = 90;
  const brH = 60;
  const brC = 180;
  for (let i = 0; i < width; i += brW) {
    for (let j = 0; j < height; j += brH) {
      fill(brC + random(-20, 20), random(10), random(40, 50));
      rect(i, j, brW, brH);
    }
  }
}
