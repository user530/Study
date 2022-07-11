let img;

function preload() {
  img = loadImage("bigBoi.jpg");
}

function setup() {
  createCanvas(900, 600);
  pixelDensity(1);
}

function draw() {
  background(0);
  image(img, 0, 0);

  //   let col = img.get(mouseX, mouseY);

  //   fill(col);
  //   rect(mouseX, mouseY, 50, 50);

  img.loadPixels();
  let pixInd = (img.width * mouseY + mouseX) * 4;
  let redChan = img.pixels[pixInd + 0];
  let grnChan = img.pixels[pixInd + 1];
  let bluChan = img.pixels[pixInd + 2];
  let alphChan = img.pixels[pixInd + 3];

  fill(redChan, grnChan, bluChan, alphChan);
  rect(mouseX, mouseY, 50, 50);
}
