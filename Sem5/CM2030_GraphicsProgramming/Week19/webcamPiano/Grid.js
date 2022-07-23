class newGrid {
  constructor(_w, _h, oscilator) {
    // Grid dimensions and characteristics
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 10;
    this.cols = _w / this.noteSize;
    this.rows = _h / this.noteSize;
    // Array of notes
    this.notes = [];
    // Oscilator to control sound
    this.oscilator = oscilator;

    // Add note to every cell of the grid
    for (let i = 0; i < this.rows * this.cols; ++i) {
      this.notes.push(
        new Note(
          i,
          (i % this.cols) * this.noteSize + this.noteSize / 2,
          int(i / this.cols) * this.noteSize + this.noteSize / 2,
          this.noteSize,
          0
        )
      );
    }
  }

  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes();
  }

  findActiveNotes(img) {
    // Iterate over the image and for every pixel calculate to which cell it relates
    for (let i = 0; i < img.width; ++i) {
      for (let j = 0; j < img.height; ++j) {
        const noteCol = int(
          map(i, 0, img.width, 0, this.gridWidth) / this.noteSize
        );
        const noteRow = int(
          map(j, 0, img.height, 0, this.gridHeight) / this.noteSize
        );
        // Calculate note index for this pixel
        const noteInd = (noteRow * this.gridWidth) / this.noteSize + noteCol;
        // Shortcut to note
        const note = this.notes[noteInd];

        // If pixels note is not already set to 1
        if (note.state != 1) {
          // Calculate pixel index and pixel color
          const ind = 4 * (i + j * img.width);
          const col = img.pixels[ind];

          // If pixel is black set initial state
          if (col == 0) {
            note.state = 1;
          }
        }
      }
    }
  }

  drawActiveNotes() {
    // Setup stroke and prepare variables
    noStroke();

    let avgX = 0;
    let avgY = 0;
    let num = 0;

    // Iterate over every note
    for (let i = 0; i < this.notes.length; ++i) {
      // If state is not zero - calculate color and draw rect
      if (this.notes[i].state > 0) {
        const c1 = map(this.notes[i].x, 0, this.gridWidth, 0, 255);
        const c2 = map(this.notes[i].y, 0, this.gridHeight, 0, 255);
        const c3 = map(this.notes[i].state, 0, 1, 0, 255);

        push();
        fill(c1, c2, c3);
        rect(
          this.notes[i].x,
          this.notes[i].y,
          this.noteSize * this.notes[i].state,
          this.noteSize * this.notes[i].state
        );
        pop();

        // Increment variables
        avgX += this.notes[i].x;
        avgY += this.notes[i].y;
        num++;
      }

      // Decrease the state and constrain it
      this.notes[i].state -= 0.05;
      this.notes[i].state = constrain(this.notes[i].state, 0, 1);
    }

    // Calculate average if there is any active notes
    if (num != 0) {
      avgX = avgX / num;
      avgY = avgY / num;
    }

    // Calculate frequency parts based on the avgX and avgY and amplitude based on the number of active notes
    const fh = map(avgX, 0, this.gridWidth, 200, 500);
    const fv = map(avgY, 0, this.gridHeight, 0, 100);
    const a = map(num, 0, this.notes.length / 2, 0, 1);

    // Set frequency and the amplitude to play sound
    osc.freq(fv + fh);
    osc.amp(a);
  }
}
