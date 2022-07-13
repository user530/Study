let img;
const matrix = [
  [1 / 16, 2 / 16, 1 / 16],
  [2 / 16, 4 / 16, 2 / 16],
  [1 / 16, 2 / 16, 1 / 16],
];

function preload() {
  img = loadImage("assets/seaNettles.jpg");
}

function setup() {
  createCanvas(img.width * 2, img.height);
  pixelDensity(1);
}

function draw() {
  image(img, 0, 0);
  image(blurFilter(img), img.width, 0);
  noLoop();
}

function blurFilter(_img) {
  let res = createImage(_img.width, _img.height);

  _img.loadPixels();
  res.loadPixels();

  for (let i = 0; i < _img.height; ++i) {
    for (let j = 0; j < _img.width; ++j) {
      const ind = 4 * (i * _img.width + j);
      const matrixSize = matrix.length;
      let conv = convolution(j, i, matrix, matrixSize, _img);

      res.pixels[ind] = conv[0];
      res.pixels[ind + 1] = conv[1];
      res.pixels[ind + 2] = conv[2];
      res.pixels[ind + 3] = 255;
    }
  }
  res.updatePixels();
  return res;
}

function convolution(x, y, matrix, matrixSize, imgIn) {
  let totalRed = 0;
  let totalGrn = 0;
  let totalBlu = 0;

  let offset = floor(matrixSize / 2);

  for (let i = 0; i < matrixSize; ++i) {
    for (let j = 0; j < matrixSize; ++j) {
      const xloc = x + i - offset;
      const yloc = y + j - offset;

      let ind = 4 * (imgIn.width * yloc + xloc);
      ind = constrain(ind, 0, imgIn.pixels.length - 1);
      totalRed += imgIn.pixels[ind + 0] * matrix[i][j];
      totalGrn += imgIn.pixels[ind + 1] * matrix[i][j];
      totalBlu += imgIn.pixels[ind + 2] * matrix[i][j];
    }
  }

  return [totalRed, totalGrn, totalBlu];
}
