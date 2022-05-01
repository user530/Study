var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;
Body = Matter.Body;
MouseConst = Matter.MouseConstraint;

let engine, ground, propeller;
let propAngle = 0;
let angleSpeed = 0.5;
let boxes = [];

function setup() {
  canvas = createCanvas(900, 600);

  engine = Engine.create();

  propeller = Bodies.rectangle(width / 2, height / 2, 100, 10, {
    isStatic: true,
    angle: propAngle,
  });

  ground = Bodies.rectangle(width / 2, height - 10, 500, 10, {
    isStatic: true,
  });

  World.add(engine.world, [ground, propeller]);
}

function draw() {
  background(255);

  Engine.update(engine);

  if (boxes.length < 500) createBox();

  for (const boxObj of boxes) {
    push();
    fill(boxObj["color"]);
    drawVertices(boxObj["box"].vertices);
    pop();
  }

  drawVertices(propeller.vertices);
  propAngle += angleSpeed;
  Body.setAngle(propeller, propAngle);
  Body.setAngularVelocity(propeller, angleSpeed);
  drawVertices(ground.vertices);
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function createBox() {
  let box = Bodies.rectangle(width / 2, 50, random(10, 30), random(10, 30), {
    angle: PI * random(0, 1),
  });

  boxes.push({
    box: box,
    color: color(random(0, 255), random(0, 255), random(0, 255)),
  });

  World.add(engine.world, [box]);
}
