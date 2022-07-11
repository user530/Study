var video;

function setup() {
  createCanvas(640 * 2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(0);
  image(video, 0, 0);

  video.loadPixels();

  translate(640, 0);
  var arcSize = 20;
  translate(arcSize / 2, arcSize / 2);

  for (let i = 0; i < video.height; i += arcSize) {
    for (let j = 0; j < video.width; j += arcSize) {
      // your code here
      let pxInd = (j * video.width + i) * 4;
      let r = video.pixels[pxInd];
      let g = video.pixels[pxInd + 1];
      let b = video.pixels[pxInd + 2];
      let a = video.pixels[pxInd + 3];

      let pixelBrightness = brightness(color(r, g, b, a));
      push();
      translate(i, j);

      // var theta = map(pixelBrightness, 0, 255, 0, 360);
      // rotate((180 - theta) / 2);
      // arc(0, 0, arcSize, arcSize, 0, theta);
      let size = map(pixelBrightness, 0, 255, 0, arcSize);
      rect(0, 0, size, size);
      pop();
    }
  }
}
