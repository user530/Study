var speed;
let sun, earth, moon1, moon2, aster;

function setup() {
  createCanvas(900, 700);

  // Create sun
  sun = new CelestialObject(0, color(255, 150, 0), 200, 0, 1 / 3);

  // Create earth
  earth = new CelestialObject(300, color(0, 150, 255), 80, 1, 1);

  // Create first moon
  moon1 = new CelestialObject(100, color(255, 255, 255), 30, -2, 0);

  // Create asteroid
  aster = new CelestialObject(40, color(97, 255, 126), 15, 3, 1);

  // Create second moon
  moon2 = new CelestialObject(180, color(244, 48, 48), 25, -1.7, 0);

  // Setup objects hierarchy
  sun.putOnOrbit(earth);
  earth.putOnOrbit(moon1);
  earth.putOnOrbit(moon2);
  moon1.putOnOrbit(aster);
}

function draw() {
  // Update BG
  background(0);

  // Start from the center
  translate(width / 2, height / 2);

  // Update speed
  speed = frameCount;

  // Draw initial object
  sun.draw();
}

// Class for the celestial objects
class CelestialObject {
  constructor(_orbit, _color, _size, _orbSpeed, _spnSpeed) {
    this.orbit = _orbit;
    this.color = _color;
    this.size = _size;
    this.orbSpeedMod = _orbSpeed;
    this.spnSpeedMod = _spnSpeed;
    this.satelites = [];
  }

  // Draw celestial object
  draw() {
    push();
    {
      // Rotate around the center of gravity
      rotate(radians(this.orbSpeedMod * speed));

      // Move center to the orbit
      translate(this.orbit, 0);

      // Push, to save current center position
      push();
      {
        // Spin celestial object based
        rotate(radians(this.spnSpeedMod * speed));

        // Draw celestial object based on the center
        this.drawObject();
      }
      // Return to the center, non spinned
      pop();

      // Draw satelites of this celestial object
      this.drawSatelites();
    }
    pop();
  }

  // Draw ellipse for the object
  drawObject() {
    strokeWeight(5);
    fill(this.color);
    stroke(0);
    ellipse(0, 0, this.size, this.size);
    line(0, 0, this.size / 2, 0);
  }

  // Draw all satelites of the object
  drawSatelites() {
    // Iterate over the satelites list and draw each one
    for (const obj of this.satelites) {
      obj.draw();
    }
  }

  // Add another celestial object to the satelite list of this one
  putOnOrbit(_celestialObj) {
    this.satelites.push(_celestialObj);
  }
}
