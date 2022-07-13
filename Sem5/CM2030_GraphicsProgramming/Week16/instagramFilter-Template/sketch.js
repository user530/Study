// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
];
/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(imgIn.width * 2, imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed() {
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img) {
  img.loadPixels();
  var resultImg = createImage(img.width, img.height);
  resultImg = sepiaFilter(img);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg);
  return resultImg;
}

// Sepia filter
function sepiaFilter(_img) {
  let sepia = createImage(_img.width, _img.height);
  sepia.loadPixels();

  for (let i = 0; i < sepia.width; ++i) {
    for (let j = 0; j < sepia.height; ++j) {
      const ind = 4 * (i + j * sepia.width);
      const oldRed = _img.pixels[ind + 0];
      const oldGreen = _img.pixels[ind + 1];
      const oldBlue = _img.pixels[ind + 2];

      sepia.pixels[ind + 0] =
        oldRed * 0.393 + oldGreen * 0.769 + oldBlue * 0.189;
      sepia.pixels[ind + 1] =
        oldRed * 0.349 + oldGreen * 0.686 + oldBlue * 0.168;
      sepia.pixels[ind + 2] =
        oldRed * 0.272 + oldGreen * 0.534 + oldBlue * 0.131;
      sepia.pixels[ind + 3] = 255;
    }
  }
  sepia.updatePixels();
  return sepia;
}

function darkCorners(_img) {
  let darkCorn = createImage(_img.width, _img.height);
  darkCorn.loadPixels();
  const maxDist = sqrt(
    pow(darkCorn.width / 2, 2) + pow(darkCorn.height / 2, 2)
  );

  for (let i = 0; i < darkCorn.width; ++i) {
    for (let j = 0; j < darkCorn.height; ++j) {
      const ind = 4 * (i + j * darkCorn.width);
      const pDist = dist(i, j, darkCorn.width / 2, darkCorn.height / 2);
      let dynLum = 1;

      if (pDist > 300 && pDist <= 450) dynLum = map(pDist, 301, 450, 1, 0.4);
      else if (pDist > 450) dynLum = map(pDist, 450, maxDist, 0.4, 0);

      dynLum = constrain(dynLum, 0, 1);

      darkCorn.pixels[ind + 0] = _img.pixels[ind + 0] * dynLum;
      darkCorn.pixels[ind + 1] = _img.pixels[ind + 1] * dynLum;
      darkCorn.pixels[ind + 2] = _img.pixels[ind + 2] * dynLum;
      darkCorn.pixels[ind + 3] = 255;
    }
  }
  darkCorn.updatePixels();
  return darkCorn;
}

function radialBlurFilter(_img) {
  let radBlured = createImage(_img.width, _img.height);
  radBlured.loadPixels();
  const matrixSize = matrix.length;

  for (let i = 0; i < _img.width; ++i) {
    for (let j = 0; j < _img.height; ++j) {
      const ind = 4 * (i + _img.width * j);
      const conv = convolution(i, j, matrix, matrixSize, _img);

      const dynBlur = constrain(
        map(dist(i, j, mouseX, mouseY), 100, 300, 0, 1),
        0,
        1
      );

      radBlured.pixels[ind] =
        conv[0] * dynBlur + _img.pixels[ind] * (1 - dynBlur);
      radBlured.pixels[ind + 1] =
        conv[1] * dynBlur + _img.pixels[ind + 1] * (1 - dynBlur);
      radBlured.pixels[ind + 2] =
        conv[2] * dynBlur + _img.pixels[ind + 2] * (1 - dynBlur);
      radBlured.pixels[ind + 3] = 255;
    }
  }
  radBlured.updatePixels();
  return radBlured;
}

function convolution(x, y, matrix, matrixSize, img) {
  let totalRed = 0;
  let totalGrn = 0;
  let totalBlu = 0;

  let offset = floor(matrixSize / 2);

  for (let i = 0; i < matrixSize; ++i) {
    for (let j = 0; j < matrixSize; ++j) {
      const xloc = x + i - offset;
      const yloc = y + j - offset;

      let ind = 4 * (img.width * yloc + xloc);
      ind = constrain(ind, 0, img.pixels.length - 1);
      totalRed += img.pixels[ind + 0] * matrix[i][j];
      totalGrn += img.pixels[ind + 1] * matrix[i][j];
      totalBlu += img.pixels[ind + 2] * matrix[i][j];
    }
  }

  return [totalRed, totalGrn, totalBlu];
}

function borderFilter(_img) {
  // Create buffer
  let buffer = createGraphics(_img.width, _img.height);
  // Setup
  push();
  const bordSize = 16;
  const bordR = 40;
  // Add image on to buffer
  buffer.image(_img, 0, 0);
  buffer.noFill();
  buffer.strokeWeight(bordSize);
  buffer.stroke(255, 255, 255);
  buffer.rectMode(CENTER);
  // Add round border rectangle
  buffer.rect(
    _img.width / 2,
    _img.height / 2,
    _img.width - bordSize / 2,
    _img.height - bordSize / 2,
    bordR
  );
  // Hide triangles using another rectangle
  buffer.rect(
    _img.width / 2,
    _img.height / 2,
    _img.width - bordSize / 2,
    _img.height - bordSize / 2
  );
  pop();
  return buffer;
}
