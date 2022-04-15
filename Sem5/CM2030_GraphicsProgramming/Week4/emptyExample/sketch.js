var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;
MouseConst = Matter.MouseConstraint;
Mouse = Matter.Mouse;

let engine, ground1;
let boxes = [];
let canvas;

let constraint;
let poly1A;
let poly1B;

let poly2;
let constraint2;

let poly3;
let constraint3;

function setup() {
  canvas = createCanvas(900, 600);

  // Create engine
  engine = Engine.create();

  ground1 = Bodies.rectangle(width / 2, height - 20, width, 10, {
    isStatic: true,
  });

  poly1A = Bodies.polygon(700, 100, 6, 20);
  poly1B = Bodies.polygon(700, 250, 1, 50);
  constraint = Constraint.create({
    bodyA: poly1A,
    pointA: { x: 0, y: 0 },
    bodyB: poly1B,
    pointB: { x: -10, y: -10 },
    stiffness: 0.01,
  });

  poly2 = Bodies.polygon(300, 200, 5, 40);
  poly3 = Bodies.polygon(400, 100, 8, 30);

  constraint2 = Constraint.create({
    pointA: { x: 150, y: 50 },
    bodyB: poly2,
    pointB: { x: -10, y: -20 },
  });

  constraint3 = Constraint.create({
    pointA: { x: 330, y: 200 },
    bodyB: poly3,
    pointB: { x: 0, y: 0 },
    stiffness: 0.001,
  });

  World.add(engine.world, [
    ground1,
    poly1A,
    poly1B,
    constraint,
    poly2,
    constraint2,
    poly3,
    constraint3,
  ]);

  let mouse = Mouse.create(canvas.elt);
  let mouseParams = {
    mouse: mouse,
  };
  let mouseConstraint = MouseConst.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, [mouseConstraint]);
}

function draw() {
  background(0);
  Engine.update(engine);

  fill(125);
  drawVertices(ground1.vertices);

  fill(255);
  drawVertices(poly1A.vertices);

  fill(255);
  drawVertices(poly1B.vertices);

  push();
  stroke(255);
  strokeWeight(3);
  drawConstraint(constraint);
  pop();

  fill(255, 0, 0);
  drawVertices(poly2.vertices);

  push();
  stroke(255);
  strokeWeight(3);
  drawConstraint(constraint2);
  pop();

  fill(0, 255, 0);
  drawVertices(poly3.vertices);

  push();
  stroke(255);
  strokeWeight(3);
  drawConstraint(constraint3);
  pop();
}

function generateObjects(x, y) {
  let b = Bodies.rectangle(x, y, random(10, 30), random(10, 30), {
    restitution: 0.8,
    friction: 0.5,
  });

  boxes.push(b);

  World.add(engine.world, [b]);
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function isOffscreen(body) {
  let pos = body.position;
  return pos.y > height || pos.x < 0 || pos.x > width;
}

function drawConstraint(constr) {
  let offsetA = constr.pointA;
  let posA = { x: 0, y: 0 };
  if (constr.bodyA) {
    posA = constr.bodyA.position;
  }

  let offsetB = constr.pointB;
  let posB = { x: 0, y: 0 };
  if (constr.bodyB) {
    posB = constr.bodyB.position;
  }

  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}
