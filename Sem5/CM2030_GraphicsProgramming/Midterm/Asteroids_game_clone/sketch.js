var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
let score;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);

  // Game score
  score = 0;
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

  // Draw game score
  drawScore();
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
  //spaceship-2-asteroid collisions
  for (const ind in asteroids.locations) {
    if (
      isInside(
        asteroids.locations[ind],
        asteroids.diams[ind],
        spaceship.location,
        spaceship.size
      )
    )
      gameOver();
  }
  //YOUR CODE HERE (2-3 lines approx)
  for (const ind in asteroids.locations) {
    if (
      isInside(
        asteroids.locations[ind],
        asteroids.diams[ind],
        earthLoc,
        earthSize.x
      )
    )
      gameOver();
  }
  //YOUR CODE HERE (2-3 lines approx)
  if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x))
    gameOver();
  //YOUR CODE HERE (1-2 lines approx)
  if (
    isInside(
      spaceship.location,
      spaceship.size,
      atmosphereLoc,
      atmosphereSize.x
    )
  )
    spaceship.setNearEarth();
  //bullet collisions
  for (const bllt of spaceship.bulletSys.bullets)
    for (const ind in asteroids.locations) {
      if (
        isInside(
          asteroids.locations[ind],
          asteroids.diams[ind],
          bllt,
          spaceship.bulletSys.diam
        )
      ) {
        // Delete asteroid
        asteroids.destroy(ind);

        // Increment score
        ++score;
      }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  return locA.dist(locB) <= sizeA / 2 + sizeB / 2;
}

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) {
    // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  drawBoom();

  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}

function drawScore() {
  push();
  textSize(64);
  textAlign(CENTER);
  fill(255, 0, 0);
  text("Planet saved " + score + " times", width / 2, height);
  pop();
}

function drawBoom() {
  push();
  translate(spaceship.location.x, spaceship.location.y);
  fill(255, 255, 0);
  beginShape();
  vertex(0, 60);
  vertex(20, 20);
  vertex(60, 40);
  vertex(40, 0);
  vertex(60, -40);
  vertex(20, -20);
  vertex(0, -60);
  vertex(-20, -20);
  vertex(-60, -40);
  vertex(-40, 0);
  vertex(-60, 40);
  vertex(-20, 20);
  endShape(CLOSE);
  pop();
}
