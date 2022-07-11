let vid;

function setup() {
  createCanvas(900, 600);
  vid = createCapture(VIDEO);
  vid.hide();
}

function draw() {
  background(0);
  image(vid, 0, 0);
}
