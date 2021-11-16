(function () {
  /** Class for a single hover menu item
   * @param {string} _btnDataAtr Data attribute for the hover menu button, default value = "data-role";
   * @param {string} _menuDataAtr - Data attribute for the dropdown menu element, default value = "data-content";
   * @param {string} _menuActiveClassName - Class name of the visible elements, default value = "active";
   * @param {boolean} _btnHighlight - If true adds _menuActiveClassName to the button when menu is opened, default value = "true";
   * @param {boolean} _overlayOn - If true adds overlay to the body while menu is active, default value = "true";
   * @param {string} _overlayId - ID name of the overlay element (if overlayOn is ON), default value = "overlay";
   * @param {boolean} _lockBodyScroll - If true locks body when menu is active, default value = "true";
   * @param {string} _scrollBlockClass - Class name that will be added to the body to block scroll (if lockBodyScroll is ON), default value = "noscroll";
   * */
  class HoverMenuItem {
    #btnDataAtr;
    #menuDataAtr;
    #menuActiveClassName;
    #btnHighlight;
    #overlay;
    #overlayOn;
    #overlayId;
    #lockBodyScroll;
    #scrollBlockClass;
    #btnEl;
    #menuEl;

    /** Constructor method */
    constructor(
      _btnDataAtr = "data-role",
      _menuDataAtr = "data-content",
      _menuActiveClassName = "active",
      _btnHighlight = true,
      _overlayOn = true,
      _overlayId = "overlay",
      _lockBodyScroll = true,
      _scrollBlockClass = "noscroll"
    ) {
      this.#btnDataAtr = _btnDataAtr;
      this.#menuDataAtr = _menuDataAtr;
      this.#menuActiveClassName = _menuActiveClassName;
      this.#btnHighlight = _btnHighlight;
      this.#overlayOn = _overlayOn;
      this.#overlayId = _overlayId;
      this.#lockBodyScroll = _lockBodyScroll;
      this.#scrollBlockClass = _scrollBlockClass;
    }

    /** Method to initialize single hover menu item */
    initBtn(_btnVal, _menuVal) {
      // Selectors for further user
      const btnSelector = `[${this.#btnDataAtr}="${_btnVal}"]`;
      const menuSelector = `[${this.#menuDataAtr}="${_menuVal}"]`;

      // Btn and menu elements
      this.#btnEl = document.querySelector(btnSelector);
      this.#menuEl = document.querySelector(menuSelector);

      // Optional overlay
      if (this.#overlayOn) {
        this.#overlay = document.querySelector(`#${this.#overlayId}`);
      }

      // Initialize hover menu functionality on btn element
      this.#handleHover();
    }

    /** Method to test if point is in target square area */
    #isInArea(x, y, left, top, right, bot) {
      return x >= left && x <= right && y >= top && y <= bot;
    }

    /** Method that handles menu activation and other options */
    #toggleOnAll() {
      // Show menu
      this.#menuEl.classList.add(this.#menuActiveClassName);

      // Show overlay if option is turned on
      if (this.#overlayOn) {
        this.#overlay.classList.add(this.#menuActiveClassName);
      }

      // Highlight button if option is turned on
      if (this.#btnHighlight) {
        this.#btnEl.classList.add(this.#menuActiveClassName);
      }

      // Block body scroll if option is turned on
      if (this.#lockBodyScroll) {
        document.body.classList.add(this.#scrollBlockClass);
      }
    }

    /** Method that handles menu deactivation and other options */
    #toggleOffAll() {
      //   Clear menu
      this.#menuEl.classList.remove(this.#menuActiveClassName);

      // Clear overlay if option is activated
      if (this.#overlayOn) {
        this.#overlay.classList.remove(this.#menuActiveClassName);
      }

      // Clear btn highlight if option is activated
      if (this.#btnHighlight) {
        this.#btnEl.classList.remove(this.#menuActiveClassName);
      }

      // Clear scrolllock if option is activated
      if (this.#lockBodyScroll) {
        document.body.classList.remove(this.#scrollBlockClass);
      }
    }

    /** Method to toggle off menu if mouse leaves element and safezone */
    #handleOnLeave(event, handler, safeLeft, safeTop, safeRight, safeBot) {
      event.preventDefault();
      event.stopPropagation();

      // Check if mouse is inside the safe zone after mouseleave
      const safeSpot = this.#isInArea(
        event.x,
        event.y,
        safeLeft,
        safeTop,
        safeRight,
        safeBot
      );

      // If mouse leaved element and not in safezone -> clear all and remove listener
      if (!safeSpot) {
        this.#toggleOffAll();
        event.target.removeEventListener("mouseleave", handler);
      }
    }

    /** Method to handle hover menu functionality */
    #handleHover() {
      // Create listener on button element
      this.#btnEl.addEventListener("mouseover", () => {
        // Refference to the menu item object
        const here = this;
        // Only react if menu is not already present
        if (!this.#menuEl.classList.contains(this.#menuActiveClassName)) {
          // Toggle menu and all optional elements
          this.#toggleOnAll();

          // Hide menu on resize
          window.addEventListener("resize", function resizeListener() {
            // Remove visibility from all elements
            here.#toggleOffAll();
            // Remove listener
            window.removeEventListener("resize", resizeListener);
          });

          // Add leave handle for btn
          this.#btnEl.addEventListener("mouseleave", function menuLeave(ev) {
            // Menu coordinates
            const menuRect = here.#menuEl.getBoundingClientRect();

            // Handle leave from btn
            here.#handleOnLeave(
              ev,
              menuLeave,
              menuRect.left,
              menuRect.top,
              menuRect.right,
              menuRect.bottom
            );
          });

          // Add leave handle for menu
          this.#menuEl.addEventListener("mouseleave", function btnLeave(ev) {
            // Btn coordinates
            const btnRect = here.#btnEl.getBoundingClientRect();
            // Handle leave from menu
            here.#handleOnLeave(
              ev,
              btnLeave,
              btnRect.left,
              btnRect.top,
              btnRect.right,
              btnRect.bottom
            );
          });
        }
      });
    }
  }

  /** Class for all hover menu buttons
   * @param {Array} menuOptions - array of menu options, if "default" or "" passed, will initialize with default arguments...
   * @param {string} _btnDataAtr - Option#1:Data attribute for the hover menu button, default value = "data-role";
   * @param {string} _menuDataAtr - Option#2:Data attribute for the dropdown menu element, default value = "data-content";
   * @param {string} _menuActiveClassName - Option#3:Class name of the visible elements, default value = "active";
   * @param {boolean} _btnHighlight - Option#4:If true adds _menuActiveClassName to the button when menu is opened, default value = "true";
   * @param {boolean} _overlayOn - Option#5:If true adds overlay to the body while menu is active, default value = "true";
   * @param {string} _overlayId - Option#6:ID name of the overlay element (if overlayOn is ON), default value = "overlay";
   * @param {boolean} _lockBodyScroll - Option#7:If true locks body when menu is active, default value = "true";
   * @param {string} _scrollBlockClass - Option#8:Class name that will be added to the body to block scroll (if lockBodyScroll is ON), default value = "noscroll";
   * @param {...number} btnInfoPairs - spread of 2 element arrays...
   * @param {string} _btnDataAtr - 1st argument of the array, data attribute of the button;
   * @param {string} _menuDataAtr - 2nd argument of the array, data attribute of the menu;
   */
  class HoverMenu {
    #menuBtns = [];

    /** Constructor */
    constructor(menuOptions, ...btnInfoPairs) {
      try {
        // Iterate over all passed btn arguments
        for (let [arg1, arg2] of btnInfoPairs) {
          let btnItm;
          // Deffault initialization
          if (menuOptions === "default" || menuOptions === "") {
            btnItm = new HoverMenuItem();
          }
          // Custom option initialization
          if (typeof menuOptions === "object" && menuOptions.length === 8) {
            btnItm = new HoverMenuItem(...menuOptions);
          }

          // initialize each button based on the passed arguments
          btnItm.initBtn(arg1, arg2);
          // Add them to the menu
          this.#menuBtns.push(btnItm);
        }
      } catch (error) {
        // Error message
        console.log(
          "HoverMenu Error - Wrong argument!\nObject not initialized!"
        );
      }
    }
  }

  // Initialize Hover menu
  const menu = new HoverMenu("default", [1, 1], [6, 6]);

  //   //   Test custom Hover menu
  //   const menu = new HoverMenu(
  //     ["data-role", "data-content", "active", false, false, "", false, ""],
  //     [1, 1],
  //     [6, 6],
  //     [5, 1]
  //   );
})();
