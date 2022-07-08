////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true,
    angle: 0,
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle: angle,
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push();
  // your code here
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  fill(255);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95,
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);

  // Increment counter
  birdsUsed++;
  console.log(birdsUsed);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
  push();
  //your code here
  for (const bird of birds) drawVertices(bird.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
  //you code here

  // Create tower as stack of boxes
  let stack = Composite.stack(
    ground.position.x,
    ground.position.y - 20 - 6 * 80,
    3,
    6,
    0,
    0,
    function (x, y) {
      return Bodies.rectangle(x, y, 80, 80);
    }
  );
  // Add this stack to the world
  World.add(engine.world, [stack]);

  // Copy individual boxes to the array
  boxes = stack.bodies;

  // Generate colors and store in the collors array
  for (const box of boxes)
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  //your code here
  for (const boxInd in boxes) {
    fill(colors[boxInd]);
    drawVertices(boxes[boxInd].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
  //your code here

  // Create Slingshot bird
  slingshotBird = Bodies.circle(200, 150, 20, {
    friction: 0,
    restitution: 0.95,
  });
  // Adjust mass
  Body.setMass(slingshotBird, slingshotBird.mass * 10);

  // Create constraint
  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 100 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001,
  });

  // Add both to the world
  World.add(engine.world, [slingshotBird, slingshotConstraint]);

  // Increment counter
  birdsUsed++;
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  // your code here
  fill(255, 150, 0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 },
  };
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
