/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
var img;
///////////////////////////////////////////////////////
function preload() { // preload() runs once
    img = loadImage('assets/rockets.png');
}
//////////////////////////////////////////////////////
function setup() { // setup() waits until preload() is done
    createCanvas(600, 500);
}
/////////////////////////////////////////////////////
function draw() {
    image(img, 0, 0);
}
