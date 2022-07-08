function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(125);

  normalMaterial();

  camera(0, -200, height, 0, 0, 0, 0, 1, 0);
  perspective(
    60 /**FOV**/,
    width / height /**Aspect Ratio**/,
    mouseY /**Near Plane**/,
    mouseX /**FarP lane**/
  );

  for (var i = -600; i <= 600; i += 150) {
    push();
    translate(i, 0, 0);
    box(80, 80, 500);
    pop();
  }
}
