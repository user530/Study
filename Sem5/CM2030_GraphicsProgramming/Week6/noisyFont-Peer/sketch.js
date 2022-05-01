var points;
var font;
let amt = 20;

function preload() {
  font = loadFont("assets/Calistoga-Regular.ttf");
}

//////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(900, 400);
  background(0);

  points = font.textToPoints("c o d e", 50, 300, 300, {
    sampleFactor: 0.2,
    simplifyThreshold: 0,
  });
}

//////////////////////////////////////////////////////////////////////
function draw() {
  // **** Your code here ****
  amt = map(mouseX, 0, width, 0, 80);

  fill(0, 5, 0, map(mouseY, 0, height, 10, 225));
  rect(0, 0, width, height);

  for (const point of points) {
    const nX = noise(frameCount + point.x + point.y + random(0, 100));
    const nY = noise(frameCount + point.x + point.y + random(0, 100));

    fill(
      map(frameCount % 600, 0, 599, 10, 255),
      map((frameCount + 300) % 600, 0, 599, 10, 255),
      map((frameCount * 3) % 600, 0, 599, 10, 255)
    );

    ellipse(
      point.x + map(nX, 0, 1, -amt, amt),
      point.y + map(nY, 0, 1, -amt, amt),
      random(3, 15)
    );
  }
}
