var img;

function preload() {
  img = loadImage("assets/sviborg.jpg");
}

function setup() {
  createCanvas(900, 600, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  texture(img);

  rotateY(radians(frameCount));
  sphere(200);
}
