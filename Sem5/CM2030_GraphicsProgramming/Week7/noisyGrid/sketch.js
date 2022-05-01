var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
  // your code here

  // Setup noise settings
  noiseDetail(10, 0.5);

  // Iterate over columns
  for (let i = 0; i < 25; ++i) {
    // Iterate over rows
    for (let j = 0; j < 25; ++j) {
      // Create noise (scaled), time dependent (mouse X)
      const n = noise(
        (stepSize * j) / 500,
        (stepSize * i) / 500,
        frameCount / map(mouseX, 0, width, 250, 50)
      );

      // Create color
      const col = lerpColor(color(255, 0, 255), color(255, 255, 0), n);

      // Fill color and disable lines
      fill(col);
      noStroke();

      // Rectangle
      rect(stepSize * j, stepSize * i, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  // your code here

  // Setup noise settings
  noiseDetail(17, 0.67);

  // Iterate over rows
  for (let i = 0; i < 25; ++i) {
    // Iterate over columns
    for (let j = 0; j < 25; ++j) {
      push();

      // Generate noises
      const n = noise(
        (stepSize * (j + 0.5)) / 1800000,
        (stepSize * i) / 2000000,
        frameCount / map(mouseX, 0, width, 700000, 250000)
      );

      const n2 = noise(i, j, frameCount / 100);

      // Generate angle
      const angle = map(n, 0, 1, 0, 720);

      // Translate
      translate((j + 0.5) * stepSize, (i + 0.5) * stepSize);

      // Rotate compass
      rotate(angle);

      // Create color
      const col = lerpColor(color(0, 255, 0), color(0, 0, 255), (n + n2) / 2);

      // Stroke color and weight
      stroke(col);
      strokeWeight(n2);

      // Draw compass line
      line(0, 0, 0, (-stepSize / 2) * n2);

      pop();
    }
  }
}
