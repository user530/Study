document.addEventListener("DOMContentLoaded", function () {
  const asidePanel = document.querySelectorAll(".aside-panel");
  const asideMenu = document.querySelector(".aside-menu");
  const navIcon = document.querySelector(".nav-icon");
  const quizBtn = document.querySelectorAll("[data-quiz]");
  const quizBlock = document.querySelector("#quiz");
  const bodyEl = document.body;
  const overlay = document.querySelector("#overlay");
  if (asideMenu) {
    navIcon.addEventListener("click", function () {
      asideMenu.classList.add("active");
      overlay.classList.add("overlay--active");
      bodyEl.classList.add("noscroll");
    });
  }

  /***********quiz******** */
  if (quizBtn.length > 0) {
    for (let item of quizBtn) {
      item.addEventListener("click", function () {
        quizBlock.classList.add("active");
        overlay.classList.add("overlay--active");
        bodyEl.classList.add("noscroll");
      });
    }
  }
  if (asidePanel.length > 0) {
    for (let item of asidePanel) {
      const quizClose = item.querySelector(".btn-close");
      if (quizClose) {
        quizClose.addEventListener("click", function () {
          item.classList.remove("active");
          overlay.classList.remove("overlay--active");
          bodyEl.classList.remove("noscroll");
        });
      }
    }
  }

  /*===========input RANGE========= */

  var sheet = document.createElement("style"),
    $rangeInput = $(".range input"),
    prefs = ["webkit-slider-runnable-track", "moz-range-track", "ms-track"];

  $rangeInput.val("1");

  document.body.appendChild(sheet);

  var getTrackStyle = function (el) {
    var curVal = el.value,
      val = (curVal - 1) * 20,
      style = "";

    // Set active label
    $(".range-labels li").removeClass("active selected");

    var curLabel = $(".range-labels").find("li:nth-child(" + curVal + ")");

    curLabel.addClass("active selected");
    curLabel.prevAll().addClass("selected");

    // Change background gradient
    for (var i = 0; i < prefs.length; i++) {
      style +=
        ".range {background: linear-gradient(to right, #00B886 0%, #00B886 " +
        val +
        "%, #fff " +
        val +
        "%, #fff 100%)}";
      style +=
        ".range input::-" +
        prefs[i] +
        "{background: linear-gradient(to right, #00B886 0%, #00B886 " +
        val +
        "%, #DAE7EB " +
        val +
        "%, #DAE7EB 100%)}";
    }

    return style;
  };

  $rangeInput.on("input", function () {
    sheet.textContent = getTrackStyle(this);
  });

  $(".range-labels li").on("click", function () {
    var index = $(this).index();

    $rangeInput.val(index + 1).trigger("input");
    $(".range-results-wrap").html($(this).html());
  });

  /********RATING STARS****** */
  const ratingBlock = document.querySelectorAll(".rating-block");
  if (ratingBlock.length > 0) {
    for (let item of ratingBlock) {
      const ratingData = item.getAttribute("data-rating");
      const starItem = item.querySelectorAll("span");
      for (let i = 0; i < ratingData; i++) {
        starItem[i].classList.add("active");
      }
    }
  }

  // Quiz plates
  const quizPlates = document.querySelectorAll(".quiz-plate");
  const quiz = new Quiz();

  for (const [i, plate] of quizPlates.entries()) {
    const p = new QuizPlate(
      plate,
      plate.querySelector(".quiz-progress"),
      plate.querySelector(".quiz-progress").querySelector("span"),
      plate.querySelector("input").type,
      i,
      quizPlates.length
    );

    // Add next button
    const next = plate.querySelector("button[data-role='next']");
    if (next) p.addNextBtn(next, quizPlates[i + 1], quiz.getPlates());

    // Add prev button
    const prev = plate.querySelector("button[data-role='prev']");
    if (prev) p.addPrevBtn(prev, quizPlates[i - 1]);

    // Set strict mode for the 3rd plate
    if (i == 1) p.setStrict(true);

    // Initialize plate
    p.init();

    quiz.addPlate(p);
  }
});

class Quiz {
  constructor() {
    this.#plates = [];
  }

  // Add plate to the quiz
  addPlate(_plate) {
    this.#plates.push(_plate);
  }

  // Get access to the plates
  getPlates() {
    return this.#plates;
  }

  checkFilled(plateInd) {}

  getResults() {}

  // Private properties
  #plates;
}

class QuizPlate {
  constructor(_elem, _prBar, _pr, _type, _ind, _len) {
    this.#element = _elem;
    this.#progressBar = _prBar;
    this.#progress = _pr;
    this.#type = _type;
    this.#ind = _ind;
    this.#len = _len;
  }

  init() {
    if (this.verify()) {
      this.initProgWidth();
      this.collectInputs();
    }
  }

  // Returns true if all arguments are valid DOM elements
  verify() {
    return (
      this.#element instanceof HTMLElement &&
      this.#progressBar instanceof HTMLElement &&
      this.#progress instanceof HTMLElement
    );
  }

  // Add "next" button
  addNextBtn(_elem, _nextElem, _allPlates) {
    this.#nextBtn = _elem;

    // Basic functionality
    this.#nextBtn.onclick = () => {
      if (this.#filled && this.#ind != this.#len - 1) {
        this.#element.classList.remove("active");
        _nextElem.classList.add("active");
      }

      // For the last plate -> submit data
      if (this.#ind == this.#len - 1) {
        for (const plate of _allPlates) console.log(plate.getData());
      }
    };
  }

  // Add "prev" button
  addPrevBtn(_elem, _prevElem) {
    this.#prevBtn = _elem;

    // Basic functionality
    this.#prevBtn.onclick = () => {
      this.#element.classList.remove("active");
      _prevElem.classList.add("active");
    };
  }

  // Set initial progress bar width
  initProgWidth() {
    // Calculate one step width
    this.#progressBarWidth = parseInt(
      window.getComputedStyle(this.#progressBar).maxWidth
    );
    // Initial progress len
    this.setProgress((this.#ind * this.#progressBarWidth) / this.#len);
  }

  // Set progress width
  setProgress(_value) {
    if (typeof (_value == "number") && _value >= 0)
      this.#progress.style.width = _value + "px";
  }

  // Progress step
  progressStep() {
    // Show progress
    this.setProgress(((this.#ind + 1) * this.#progressBarWidth) / this.#len);
  }

  // Collect initial inputs
  collectInputs() {
    const inputs = this.#element.querySelectorAll("input");
    // Iterate over all inputs inside the element and add all inputs of the selected type
    for (const input of inputs) {
      if (input.type == this.#type) {
        // Add listener accordingly
        switch (this.#type) {
          // If plate consist of radio inputs
          case "radio":
            // Click make plate filled
            input.onclick = () => {
              this.#filled = true;

              // Store data
              this.#data[input.name] = input.nextElementSibling.innerText;

              // Show progress
              this.progressStep();
            };
            break;

          // If plate consist of text inputs
          case "text":
            input.onchange = () => {
              let allFilled = true;

              // If strict mode is activated, confirm that all fields filled
              if (this.#strict) {
                // Iterate over other text fields
                for (const inpEl of inputs) {
                  // If at least one is not filled -> toggle flag
                  if (inpEl.value == "") allFilled = false;
                }
              }

              // If all fields filled
              if (allFilled) {
                // Set filled state of the plate
                this.#filled = true;

                // Store data from each field
                for (const inpEl of inputs)
                  this.#data[inpEl.name] = inpEl.value;

                // Show progress
                this.progressStep();
              } else {
                this.#filled = false;
                // Reverse progress
                this.initProgWidth();
              }
            };
            break;

          // If plate consist of range inputs
          case "range":
            // Default range -> automatically set filled flag
            if (input.defaultValue != "") {
              this.#filled = true;

              // Store data
              this.#data[input.name] = input.value;

              this.progressStep();
            }
            // If no default value, then filled only on change
            else
              input.onchange = () => {
                this.#filled = true;
                // Store data
                this.#data[input.name] = input.value;
                // Show progress
                this.progressStep();
              };
            break;
        }

        // Add this inputs to the plate
        this.#inputs.push(input);
      }
    }
  }

  // Set "strict mode" setting
  setStrict(_bool) {
    this.#strict = Boolean(_bool);
  }

  // Set "flag" that user selected an answer
  setFilled(_filled) {
    this.#filled = Boolean(_filled);
  }

  // Get stored data
  getData() {
    return this.#data;
  }

  // Private fields
  #element;
  #progressBar;
  #progress;
  #type;
  #ind;
  #len;
  #data = {};
  #progressBarWidth = 0;
  #inputs = [];
  #nextBtn = null;
  #prevBtn = null;
  #filled = false;
  #strict = false;
}
