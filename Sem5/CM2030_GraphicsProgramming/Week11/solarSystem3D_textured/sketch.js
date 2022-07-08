let bgTexture;
let starLoc = [];

function preload() {
  earthImg = loadImage("assets/earth.jpg");
  moonImg = loadImage("assets/moon.jpg");
  sunImg = loadImage("assets/sun.jpg");
}

function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
  bgTexture = createGraphics(900, 600);
  bgTexture.background(0);
  for (let i = 0; i < 200; ++i)
    starLoc.push({
      x: random(0, bgTexture.width),
      y: random(0, bgTexture.height),
      size: random(0, 3),
    });
}

function draw() {
  background(125);
  noStroke();
  bg();
  let celSun = sun();
  let earth = planet(celSun, 50, 300, frameCount, frameCount, earthImg);
  let moon = planet(earth, 20, 100, frameCount * 0.3, 0, moonImg);
  camera(0, -300, 600, 0, 0, 0, 0, 1, 0);
}

function sun() {
  const center = createVector(0, 0, 0);

  pointLight(255, 255, 255, 0, 0, 0);
  pointLight(255, 255, 255, 0, 0, 0);

  push();
  {
    rotateY(frameCount / 10);
    ambientLight(250, 250, 250);
    texture(sunImg);
    sphere(100);
  }
  pop();

  return center;
}

function planet(gravCent, size, orbit, speed, rotation, img) {
  const center = createVector(
    gravCent.x + orbit * cos(speed),
    gravCent.y + 0,
    gravCent.z + orbit * sin(speed)
  );

  push();
  {
    translate(center);
    rotateY(rotation);
    texture(img);
    sphere(size);
  }
  pop();

  return center;
}

function bg() {
  push();
  translate(0, 300, -600);
  rotateX(25);
  updateStars();
  sky();
  texture(bgTexture);
  plane(2400, 1600);
  pop();
}

function sky() {
  bgTexture.background(0);
  for (let i = 0; i < starLoc.length; ++i) {
    bgTexture.rect(
      starLoc[i].x,
      starLoc[i].y,
      starLoc[i].size,
      starLoc[i].size
    );
  }
}

function updateStars() {
  for (let i = 0; i < starLoc.length; ++i) {
    if (frameCount % 60 == 0 && i % 10 == int(frameCount / 100) % 10) {
      starLoc[i].x = random(0, bgTexture.width);
      starLoc[i].y = random(0, bgTexture.height);
      starLoc[i].size = random(0, 3);
    }
  }
}
