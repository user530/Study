function setup() {
  createCanvas(900, 600, WEBGL);
}

function draw() {
  background(0);
  noStroke();
  normalMaterial();

  for (let i = 0; i < 6; i++) {
    push();

    translate(-300 + 300 * (i % 3), -150 + 150 * int(i / 3));

    rotateX(frameCount / 50);
    rotateY(frameCount / 50);
    rotateZ(frameCount / 50);

    switch (i) {
      case 0:
        plane();
        break;
      case 1:
        box();
        break;
      case 2:
        cylinder();
        break;
      case 3:
        cone();
        break;
      case 4:
        torus();
        break;
      case 5:
        sphere();
    }
    pop();
  }
}
