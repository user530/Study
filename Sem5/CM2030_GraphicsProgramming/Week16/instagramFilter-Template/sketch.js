// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
let filter = 0;
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
var edgeV = [
  [-1, -1, 0, 1, 1],
  [-1, -1, 0, 1, 1],
  [-1, -2, 0, 2, 1],
  [-1, 1, 0, 1, 1],
  [-1, 1, 0, 1, 1],
];
var edgeH = [
  [1, 1, 1, 1, 1],
  [1, 1, 2, 1, 1],
  [0, 0, 0, 0, 0],
  [-1, -1, -2, -1, -1],
  [-1, -1, -1, -1, -1],
];
var myKernel = [
  [0, 0, -1, 0, 0],
  [0, -1, -2, -1, 0],
  [-1, -2, 17, -2, -1],
  [0, -1, 2, -1, 0],
  [0, 0, -1, 0, 0],
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
  drawImg();
  noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed() {
  loop();
}

function keyPressed() {
  if (keyCode === TAB) {
    filter = (filter + 1) % 5;
    drawImg();
  }
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
  // Create image and load pixels
  let sepia = createImage(_img.width, _img.height);
  sepia.loadPixels();

  // Iterate over pixels
  for (let i = 0; i < sepia.width; ++i) {
    for (let j = 0; j < sepia.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + j * sepia.width);
      // Channel values of the current pixel
      const oldRed = _img.pixels[ind + 0];
      const oldGreen = _img.pixels[ind + 1];
      const oldBlue = _img.pixels[ind + 2];

      // Set new sepia values
      sepia.pixels[ind + 0] =
        oldRed * 0.393 + oldGreen * 0.769 + oldBlue * 0.189;
      sepia.pixels[ind + 1] =
        oldRed * 0.349 + oldGreen * 0.686 + oldBlue * 0.168;
      sepia.pixels[ind + 2] =
        oldRed * 0.272 + oldGreen * 0.534 + oldBlue * 0.131;
      sepia.pixels[ind + 3] = 255;
    }
  }
  // Update the image and return image
  sepia.updatePixels();
  return sepia;
}

// Vignette filter
function darkCorners(_img) {
  // Create image and load pixels
  let darkCorn = createImage(_img.width, _img.height);
  darkCorn.loadPixels();

  // Calculate max distance from the center to the corners
  const maxDist = sqrt(
    pow(darkCorn.width / 2, 2) + pow(darkCorn.height / 2, 2)
  );

  // Iterate over pixels
  for (let i = 0; i < darkCorn.width; ++i) {
    for (let j = 0; j < darkCorn.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + j * darkCorn.width);
      // Calculate the distance from the center to the pixel
      const pDist = dist(i, j, darkCorn.width / 2, darkCorn.height / 2);
      // Prepare dynamic luminance variable
      let dynLum = 1;

      // Adjust dynamic luminance based on the distance
      if (pDist > 300 && pDist <= 450) dynLum = map(pDist, 301, 450, 1, 0.4);
      else if (pDist > 450) dynLum = map(pDist, 450, maxDist, 0.4, 0);

      // Safety constraint
      dynLum = constrain(dynLum, 0, 1);

      // Set new vignette pixel values
      darkCorn.pixels[ind + 0] = _img.pixels[ind + 0] * dynLum;
      darkCorn.pixels[ind + 1] = _img.pixels[ind + 1] * dynLum;
      darkCorn.pixels[ind + 2] = _img.pixels[ind + 2] * dynLum;
      darkCorn.pixels[ind + 3] = 255;
    }
  }
  // Update the image and return image
  darkCorn.updatePixels();
  return darkCorn;
}

// Radial blur filter
function radialBlurFilter(_img) {
  // Create image and load pixels
  let radBlured = createImage(_img.width, _img.height);
  radBlured.loadPixels();

  // Calculate and prepare matrix size
  const matrixSize = matrix.length;

  // Iterate over pixels
  for (let i = 0; i < _img.width; ++i) {
    for (let j = 0; j < _img.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + _img.width * j);
      // Calculate convolution using kernel matrix
      const conv = convolution(i, j, matrix, matrixSize, _img);

      // Calculate dynamic blur based on the distance from the mouse
      const dynBlur = constrain(
        map(dist(i, j, mouseX, mouseY), 100, 300, 0, 1),
        0,
        1
      );

      // Set new pixel values using range blur
      radBlured.pixels[ind] =
        conv[0] * dynBlur + _img.pixels[ind] * (1 - dynBlur);
      radBlured.pixels[ind + 1] =
        conv[1] * dynBlur + _img.pixels[ind + 1] * (1 - dynBlur);
      radBlured.pixels[ind + 2] =
        conv[2] * dynBlur + _img.pixels[ind + 2] * (1 - dynBlur);
      radBlured.pixels[ind + 3] = 255;
    }
  }
  // Update the image and return image
  radBlured.updatePixels();
  return radBlured;
}

// Convolution function
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

// Filter to add borders
function borderFilter(_img) {
  // Create buffer
  let buffer = createGraphics(_img.width, _img.height);
  // Add image on to buffer
  buffer.image(_img, 0, 0);
  // Border setup
  push();
  const bordSize = 16;
  const bordR = 40;
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
  // Return image
  return buffer;
}

function invertFilter(_img) {
  const invertImg = createImage(_img.width, _img.height);
  invertImg.loadPixels();

  // Iterate over pixels
  for (let i = 0; i < _img.width; ++i) {
    for (let j = 0; j < _img.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + _img.width * j);

      invertImg.pixels[ind] = 255 - _img.pixels[ind];
      invertImg.pixels[ind + 1] = 255 - _img.pixels[ind + 1];
      invertImg.pixels[ind + 2] = 255 - _img.pixels[ind + 2];
      invertImg.pixels[ind + 3] = 255;
    }
  }
  invertImg.updatePixels();
  return invertImg;
}

function grayscaleFilter(_img) {
  const grayImg = createImage(_img.width, _img.height);
  grayImg.loadPixels();

  // Iterate over pixels
  for (let i = 0; i < _img.width; ++i) {
    for (let j = 0; j < _img.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + _img.width * j);
      const gray =
        _img.pixels[ind] * 0.3 +
        _img.pixels[ind + 1] * 0.59 +
        _img.pixels[ind + 2] * 0.11;

      grayImg.pixels[ind] = gray;
      grayImg.pixels[ind + 1] = gray;
      grayImg.pixels[ind + 2] = gray;
      grayImg.pixels[ind + 3] = 255;
    }
  }
  grayImg.updatePixels();
  return grayImg;
}

function edgeFilter(_img) {
  // Create image and load pixels
  const edgyImg = createImage(_img.width, _img.height);
  edgyImg.loadPixels();

  // Iterate over pixels
  for (let i = 0; i < _img.width; ++i) {
    for (let j = 0; j < _img.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + _img.width * j);

      // Calculate vertical and horizontal edges
      const convV = convolution(i, j, edgeV, edgeV.length, _img);
      const convH = convolution(i, j, edgeH, edgeH.length, _img);
      const cV = map(abs(convV[0]), 0, 1020, 0, 255);
      const cH = map(abs(convH[0]), 0, 1020, 0, 255);

      // Set pixel values based on the edges
      edgyImg.pixels[ind] = cH + cV;
      edgyImg.pixels[ind + 1] = cH + cV;
      edgyImg.pixels[ind + 2] = cH + cV;
      edgyImg.pixels[ind + 3] = 255;
    }
  }
  edgyImg.updatePixels();
  return edgyImg;
}

function myFilter(_img) {
  // Create image and load pixels
  const someImg = createImage(_img.width, _img.height);
  someImg.loadPixels();

  // Iterate over pixels
  for (let i = 0; i < _img.width; ++i) {
    for (let j = 0; j < _img.height; ++j) {
      // Calculate index of the pixel in the pixel map array
      const ind = 4 * (i + _img.width * j);

      // Calculate vertical and horizontal edges
      const conv = convolution(i, j, myKernel, myKernel.length, _img);
      const pixR = map(abs(conv[0]), 0, 255 * 4, 0, 255);
      const pixG = map(abs(conv[1]), 0, 255 * 4, 0, 255);
      const pixB = map(abs(conv[2]), 0, 255 * 4, 0, 255);

      // Set pixel values based on the edges
      someImg.pixels[ind] = pixR;
      someImg.pixels[ind + 1] = pixG;
      someImg.pixels[ind + 2] = pixB;
      someImg.pixels[ind + 3] = 255;
    }
  }
  someImg.updatePixels();
  return someImg;
}

function drawImg() {
  console.log(filter);
  switch (filter) {
    case 0:
      image(earlyBirdFilter(imgIn), imgIn.width, 0);
      break;
    case 1:
      image(invertFilter(imgIn), imgIn.width, 0);
      break;
    case 2:
      image(grayscaleFilter(imgIn), imgIn.width, 0);
      break;
    case 3:
      image(edgeFilter(grayscaleFilter(imgIn)), imgIn.width, 0);
      break;
    case 4:
      image(myFilter(imgIn), imgIn.width, 0);
      break;
  }
}
