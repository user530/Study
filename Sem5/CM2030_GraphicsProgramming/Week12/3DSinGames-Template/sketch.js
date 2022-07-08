const gridSize = 800;
const boxes = [];
const confetti = [];
const controls = {};

function setup() {
  createCanvas(900, 800, WEBGL);
  angleMode(DEGREES);
  setupSliders();
  setupGrid();
  setupConfetti();
}

function draw() {
  background(125);
  cam();
  castLight();
  drawGrid();
  drawConfetti();
}

function setupGrid() {
  // Game settings
  const boxSide = controls.boxSideSl.value();
  console.log(boxSide);
  const row = Math.floor(gridSize / boxSide);

  // Create boxes to fill the grid
  for (let i = 0; i < row * row; ++i) {
    const box = {};
    box.x = -gridSize / 2 + boxSide * (i % row);
    box.y = 0;
    box.z = -gridSize / 2 + boxSide * Math.floor(i / row);
    box.side = boxSide;
    box.globSize = gridSize;
    box.distance = dist(
      0,
      0,
      0,
      box.x + box.side / 2, // I changed this part, so it calculate right from the center of each box to the center of the screen and works both for the even and odd number of boxes
      box.y + box.side / 2,
      box.z + box.side / 2
      // box.x,
      // box.y,
      // box.z
    );
    box.length = boxSide;
    boxes.push(box);
  }
}

function drawGrid() {
  updateGrid();
  // Draw boxes and change the height
  for (let i = 0; i < boxes.length; ++i) {
    // Settings
    // normalMaterial();
    stroke(0);
    strokeWeight(2);
    specularMaterial(255, 0, 0);

    // Individual box part
    push();
    {
      // Move to the position
      translate(boxes[i].x, boxes[i].y, boxes[i].z);
      // Change the height
      boxes[i].length = map(
        sin(boxes[i].distance + frameCount * controls.boxSpeedSl.value()),
        -1,
        1,
        100,
        300
      );
      // Draw the box
      box(boxes[i].side, boxes[i].length, boxes[i].side);
    }
    pop();
  }
}

function updateGrid() {
  boxSliderVal = controls.boxSideSl.value();
  if (boxes[0].side != boxSliderVal) {
    const row = Math.floor(gridSize / boxSliderVal);
    boxes.length = 0;
    for (let i = 0; i < row * row; ++i) {
      const box = {};
      box.x = -gridSize / 2 + boxSliderVal * (i % row);
      box.y = 0;
      box.z = -gridSize / 2 + boxSliderVal * Math.floor(i / row);
      box.side = boxSliderVal;
      box.distance = dist(
        0,
        0,
        0,
        box.x + box.side / 2,
        box.y + box.side / 2,
        box.z + box.side / 2
      );
      box.length = boxSliderVal;
      boxes.push(box);
    }
  }
}

function setupConfetti() {
  // Confetti settings
  const confRangeX = 1000;
  const confRangeY = 800;
  const confRangeZ = 1000;

  for (let i = 0; i < 200; ++i) {
    const conf = {};
    conf.v = createVector(
      random(-confRangeX / 2, confRangeX / 2),
      random(-confRangeY, 0),
      random(-confRangeZ / 2, confRangeZ / 2)
    );
    conf.th = random(0, 360);
    conf.col = [random(0, 255), random(0, 255), random(0, 255)];
    confetti.push(conf);
  }
}

function drawConfetti() {
  for (let i = 0; i < confetti.length; ++i) {
    push();
    {
      // Hide borders
      noStroke();
      // Position and angle
      translate(confetti[i].v);
      rotateX(confetti[i].th);
      // Color the confetti
      //fill(confetti[i].col);
      emissiveMaterial(confetti[i].col);
      // Draw the confetti
      plane(15, 15);
      // Update the position, angle and color
      confetti[i].v.y++;
      confetti[i].th += 10;
      if (confetti[i].v.y >= 0) confetti[i].v.y = -height;
      if (frameCount % 30 == 0)
        confetti[i].col = [random(0, 255), random(0, 255), random(0, 255)];
    }
    pop();
  }
}

function cam() {
  camera(
    controls.camRangeSl.value() * cos(frameCount / 2),
    -600,
    controls.camRangeSl.value() * sin(frameCount / 2),
    0,
    0,
    0,
    0,
    1,
    0
  );
}

function castLight() {
  pointLight(
    155,
    255,
    50,
    200 * cos(frameCount),
    -height / 2,
    200 * sin(frameCount)
  );

  pointLight(
    155,
    255,
    50,
    200 * cos(frameCount),
    -height / 2,
    200 * sin(frameCount)
  );
}

function setupSliders() {
  controls.boxSideSl = createSlider(25, 100, 50, 25);
  controls.boxSideSl.position(10, 10);
  controls.boxSideSl.style("width", "100px");

  controls.boxSpeedSl = createSlider(1, 10, 2, 1);
  controls.boxSpeedSl.position(10, 30);
  controls.boxSpeedSl.style("width", "100px");

  controls.camRangeSl = createSlider(600, 1200, 800, 100);
  controls.camRangeSl.position(10, 50);
  controls.camRangeSl.style("width", "100px");

  const img = createGraphics(200, 200);
  img.background(255);
  image(img, -width / 2, -height / 2);
}
