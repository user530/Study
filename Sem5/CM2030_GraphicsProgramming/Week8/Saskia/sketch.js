function setup() {
  createCanvas(900, 600);
  background(0);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  fill(255, 0, 0);

  let freq = 5;
  let rows = 25;
  let cols = 4;

  let rectW = width / (cols + 1);
  let rectH = rectW / 10;

  translate(rectW, 150);

  for (let i = 0; i < cols; ++i) {
    for (let j = 0; j < rows; ++j) {
      fill(255, 0, 0);
      rect(
        rectW * i,
        j * rectH * 0.55,
        rectW * 0.55 +
          sin(
            (frameCount * 6) / freq +
              (j % 2) * 180 +
              (360 / (rows - 1)) * j +
              i * (360 / cols)
          ) *
            rectW *
            0.45,
        rectH * 0.55 +
          cos((frameCount * 6) / freq + (j % 2) * 180) * rectH * 0.45,
        10
      );
    }
  }
}
