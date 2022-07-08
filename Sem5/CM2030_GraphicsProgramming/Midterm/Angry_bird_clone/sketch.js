// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
const Composite = Matter.Composites;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle = 0;
var angleSpeed = 0;
var canvas;
let time = 60;
let birdsUsed = 0;

////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create(); // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {
  background(0);

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();

  clearBirds();

  clearBoxes();

  updateTime();

  drawInterface();
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    //your code here
    angleSpeed += 0.01;
  } else if (keyCode == RIGHT_ARROW) {
    //your code here
    angleSpeed -= 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped() {
  //if 'b' create a new bird to use with propeller
  if (key === "b") {
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key === "r") {
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

function clearBirds() {
  // Clear out-of-screen balls
  for (let i = 0; i < birds.length; ++i) {
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      --i;
    }
  }
}

function clearBoxes() {
  // Clear out-of-screen boxes
  for (let i = 0; i < boxes.length; ++i) {
    if (isOffScreen(boxes[i])) {
      removeFromWorld(boxes[i]);
      boxes.splice(i, 1);
      colors.splice(i, 1);
      --i;
    }
  }
  // Victory
  if (boxes.length === 0) victory();
}

function updateTime() {
  time = 60 - int(frameCount / 60);

  if (time < 0) gameOver();
}

function drawInterface() {
  printBirds();
  printBoxes();
  printTime();
}

function printBirds() {
  push();
  fill(255, 0, 0);
  textSize(32);
  textAlign(RIGHT, CENTER);
  text("Birds used: " + birdsUsed, width - 50, 30);
  pop();
}

function printBoxes() {
  push();
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Boxes left: " + boxes.length, width / 2, 30);
  pop();
}

function printTime() {
  push();
  fill(255, 0, 0);
  textSize(32);
  textAlign(LEFT, CENTER);
  text("Time left: " + time, 50, 30);
  pop();
}

function gameOver() {
  push();
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("GAME OVER!", width / 2, height / 2);
  noLoop();
  pop();
}

function victory() {
  push();
  fill(255);
  textSize(64);
  textAlign(CENTER, CENTER);
  text("CONGRATULATIONS!", width / 2, height / 2);
  text("YOUR SCORE IS - " + birdsUsed, width / 2, height / 2 + 100);
  noLoop();
  pop();
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased() {
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body) {
  var pos = body.position;
  return pos.y < 0 || pos.y > height || pos.x < 0 || pos.x > width;
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = { x: 0, y: 0 };
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = { x: 0, y: 0 };
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
