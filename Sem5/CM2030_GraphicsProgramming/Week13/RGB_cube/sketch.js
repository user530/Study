const controls = {};
const boxes = [];

function setup() {
  createCanvas(900, 600, WEBGL);
  controlSl();
  angleMode(DEGREES);
  noStroke();
  grid();
}

function draw() {
  background(0);
  cam(controls.ph.value(), controls.len.value());
  rotateX(frameCount);
  rotateY(frameCount);
  rotateZ(frameCount);
  drawGrid();
}

function cam(ph, len) {
  camera(len * cos(ph), -len, len * -sin(ph), 0, 0, 0, 0, 1, 0);
}

function controlSl() {
  controls.ph = createSlider(0, 360, 0, 30);
  controls.ph.position(10, 10);
  controls.ph.style("width", "100px");

  controls.len = createSlider(100, 1000, 600, 100);
  controls.len.position(10, 50);
  controls.len.style("width", "100px");
}

function grid(num = 10, size = 30) {
  for (let i = 0; i < num * num * num; i++) {
    const cube = {};
    cube.x = (-num * size) / 2 + size * (i % num);
    cube.y = (-num * size) / 2 + size * Math.floor(i / (num * num));
    cube.z = (-num * size) / 2 + size * Math.floor((i % 100) / num);
    cube.size = size;
    cube.color = [
      map(cube.x, (-num * size) / 2, (num * size) / 2, 0, 255),
      map(cube.y, (-num * size) / 2, (num * size) / 2, 0, 255),
      map(cube.z, (-num * size) / 2, (num * size) / 2, 0, 255),
    ];
    boxes.push(cube);
  }
}

function drawGrid(boxSize = 30) {
  for (let i = 0; i < boxes.length; ++i) {
    push();
    translate(boxes[i].x, boxes[i].y, boxes[i].z);
    emissiveMaterial(boxes[i].color);
    box(boxSize, boxSize);
    pop();
  }
}
