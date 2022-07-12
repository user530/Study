var imgs = [];
var avgImg;
var numOfImages = 30;
let curPhotoInd = 0;

//////////////////////////////////////////////////////////
function preload() {
  // Load all images and add them to the array
  for (let i = 0; i < numOfImages; ++i) {
    let img = loadImage(`assets/${i}.jpg`);
    imgs.push(img);
  }
}
//////////////////////////////////////////////////////////
function setup() {
  // Create and setup canvas
  createCanvas(imgs[0].width * 2, imgs[0].height);
  pixelDensity(1);
  // Create 2nd Image for the Avg portrait
  avgImg = createGraphics(imgs[0].width, imgs[0].height);
  // Load pixels from all pictures
  loadAll();
  // Chose and draw the left portrait
  setRndImg();
}
//////////////////////////////////////////////////////////
function draw() {
  // Create and draw the right portrait based on the mouse X
  makeAvgPortrait();
  // Prevent looping
  noLoop();
}

// Helper function to load all pixel maps
function loadAll() {
  // Load pixels of the right image
  avgImg.loadPixels();

  // Load pixels of all images
  for (let i = 0; i < imgs.length; ++i) {
    imgs[i].loadPixels();
  }
}

// Helper function to calculate avg channels for the certain pixel
function getAvgChannels(pxInd) {
  // Prepare variables for different channels
  let sumR = 0,
    sumG = 0,
    sumB = 0;

  // Iterate over all images and find the sum
  for (let i = 0; i < imgs.length; ++i) {
    sumR += imgs[i].pixels[pxInd];
    sumG += imgs[i].pixels[pxInd + 1];
    sumB += imgs[i].pixels[pxInd + 2];
  }

  // Return average channel values
  return [sumR / imgs.length, sumG / imgs.length, sumB / imgs.length];
}

// Helper function to create and draw the right portrait
function makeAvgPortrait() {
  // Loop over every pixel in the right image
  for (let i = 0; i < width / 2; ++i) {
    for (let j = 0; j < height; ++j) {
      // Calculate pixel index and find average channels
      const pInd = ((i * width) / 2 + j) * 4;
      const pAvg = getAvgChannels(pInd);

      // Set channel values based on the mouseX
      avgImg.pixels[pInd] = lerp(
        imgs[curPhotoInd].pixels[pInd],
        pAvg[0],
        map(mouseX, 0, width, 0, 1)
      );
      avgImg.pixels[pInd + 1] = lerp(
        imgs[curPhotoInd].pixels[pInd + 1],
        pAvg[1],
        map(mouseX, 0, width, 0, 1)
      );
      avgImg.pixels[pInd + 2] = lerp(
        imgs[curPhotoInd].pixels[pInd + 2],
        pAvg[2],
        map(mouseX, 0, width, 0, 1)
      );
      avgImg.pixels[pInd + 3] = 255;

      // Set avg channel values
      // avgImg.pixels[pInd] = pAvg[0];
      // avgImg.pixels[pInd + 1] = pAvg[1];
      // avgImg.pixels[pInd + 2] = pAvg[2];
      // avgImg.pixels[pInd + 3] = 255;
    }
  }
  // Update data
  avgImg.updatePixels();
  // Draw the right image
  image(avgImg, width / 2, 0);
}

// Helper function to chose and draw the random portrait to the left
function setRndImg() {
  curPhotoInd = Math.floor(random(0, 30));
  image(imgs[curPhotoInd], 0, 0);
  // Update the right portrait because of the change
  makeAvgPortrait();
}

// Helper function to redraw the right portrait
function drawAvgPortrait() {
  makeAvgPortrait();
  loop();
}

// Functions to handle the user interactions
function keyPressed() {
  // Update the left portrait and right (based on the left)
  setRndImg();
  drawAvgPortrait();
}

function mouseMoved() {
  // Redraw the right portrait
  drawAvgPortrait();
}
