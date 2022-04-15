// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;

var engine;
var ground;

var ball1;
var ball2;

var catapult;
var catapultSpacer;
var constraint;

const catapultHeight = 25;
const catapultWidth = 600;
const spacerHeight = 60;
const hover = 100;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create(); // create an engine
  setupCatapult();
  setupBalls();
  setupGround();
}
/////////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);
  drawBalls();
  drawCatapult();
  drawGround();
}
/////////////////////////////////////////////////////////////
function setupCatapult() {
  // your code here
  catapult = Bodies.rectangle(
    width / 2,
    height - 10 - 25 / 2 - spacerHeight - catapultHeight / 2,
    catapultWidth,
    catapultHeight
  );

  constraint = Constraint.create({
    bodyA: catapult,
    pointA: { x: 0, y: 0 },
    pointB: { x: catapult.position.x, y: catapult.position.y },
    stiffness: 1,
    length: 0,
  });

  catapultSpacer = Bodies.rectangle(
    width / 2 - 180,
    catapult.position.y + catapultHeight / 2 + spacerHeight / 2,
    30,
    spacerHeight
  );

  World.add(engine.world, [catapult, constraint, catapultSpacer]);
}
/////////////////////////////////////////////////////////////
function drawCatapult() {
  // your code here
  push();
  fill(255);
  drawVertices(catapult.vertices);
  fill(255, 0, 0);
  drawVertices(catapultSpacer.vertices);
  pop();
}
/////////////////////////////////////////////////////////////
function setupBalls() {
  // your code here
  ball1 = Bodies.circle(catapult.position.x + catapultWidth / 2, 0, 80, {
    density: 0.01,
  });

  ball2 = Bodies.circle(
    catapult.position.x - catapultWidth / 2 + 10,
    catapult.position.y - catapultHeight / 2 - 30,
    30
  );

  World.add(engine.world, [ball1, ball2]);
}
/////////////////////////////////////////////////////////////
function drawBalls() {
  // your code here
  push();
  fill(0, 0, 255);
  drawVertices(ball1.vertices);
  drawVertices(ball2.vertices);
  pop();
}
/////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(400, height - 10, 810, 25, { isStatic: true });
  World.add(engine.world, [ground]);
}
/////////////////////////////////////////////////////////////
function drawGround() {
  noStroke();
  fill(128);
  drawVertices(ground.vertices);
}
////////////////////////////////////////////////////////////////
// ******* HELPER FUNCTIONS *********
// DO NOT WRITE BELOW HERE
/////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
