var video;

function setup() {
  createCanvas(640 * 2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  image(video, 0, 0);

  // I don't have a cam, so i used this instead
  push();
  rectMode(CENTER);
  fill(0, 255, 0);
  rect((mouseX % video.width) - 50, mouseY % video.height, 100, 100);
  fill(255, 255, 0);
  rect((mouseX % video.width) - 50, mouseY % video.height, 60, 60);
  pop();

  // STEP 1 - write your cocde below
  let g = get(video.width / 2, 0, 1, video.height);

  push();
  stroke(255, 0, 0);
  line(video.width / 2, 0, video.width / 2, video.height);
  pop();

  // STEP 2 - write your code below
  image(g, video.width + (frameCount % (width / 2)), 0);
}
