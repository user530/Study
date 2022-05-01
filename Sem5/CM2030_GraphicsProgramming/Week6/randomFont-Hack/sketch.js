var font;
function preload() {
  font = loadFont("assets/Calistoga-Regular.ttf");
}

var points;

function setup() {
  createCanvas(900, 400);
  fill(255, 104, 204, 150);
  noStroke();

  points = font.textToPoints("c o d e", 50, 300, 300, {
    sampleFactor: 0.3,
    simplifyThreshold: 0,
  });
}

function draw() {
  background(0);

  // *** your code here ****
  for (const point of points) {
    ellipse(
      point.x + random(-mouseX, mouseX) / 12,
      point.y + random(-mouseX, mouseX) / 12,
      10
    );
  }
  noLoop();
}

function mouseMoved() {
  loop();
}
