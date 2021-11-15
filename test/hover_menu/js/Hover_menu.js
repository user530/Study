// const a = document.querySelectorAll("[data-role]");
// const b = document.querySelectorAll("[data-content]");

// const btnDataAtr = "data-role";
// const menuDataAtr = "data-content";
// const btnVal = 1;
// const menuVal = 1;
// const menuActiveClassName = "active";
// const overlayId = "overlay";

function hoverMenu(
  _btnVal,
  _menuVal,
  _btnDataAtr = "data-role",
  _menuDataAtr = "data-content",
  _menuActiveClassName = "active",
  _btnHiglight = true,
  _overlayOn = true,
  _overlayId = "overlay",
  _lockBodyScroll = true,
  _scrollBlockClass = "noscroll"
) {
  // Selector's for further user
  const btnSelector = `[${_btnDataAtr}="${_btnVal}"]`;
  const menuSelector = `[${_menuDataAtr}="${_menuVal}"]`;

  // Btn and menu elements
  const btnEl = document.querySelector(btnSelector);
  const menuEl = document.querySelector(menuSelector);

  // Optional overlay
  let overlay;

  if (_overlayOn) {
    overlay = document.querySelector(`#${_overlayId}`);
  }

  // Create listener on button element
  btnEl.addEventListener("mouseover", function activateMenu() {
    // Only react if menu is not already present
    if (!menuEl.classList.contains(_menuActiveClassName)) {
      // Show menu
      menuEl.classList.add(_menuActiveClassName);

      // Show overlay if option is turned on
      if (_overlayOn) {
        overlay.classList.add(_menuActiveClassName);
      }

      // Highlight button if option is turned on
      if (_btnHiglight) {
        btnEl.classList.add(_menuActiveClassName);
      }

      //   Block body scroll if option is turned on
      if (_lockBodyScroll) {
        document.body.classList.add(_scrollBlockClass);
      }

      // Hide menu on resize
      window.addEventListener("resize", function hideMenu() {
        // Remove visibility from all elements
        menuEl.classList.remove(_menuActiveClassName);
        overlay.classList.remove(_menuActiveClassName);
        btnEl.classList.remove(_menuActiveClassName);
        document.body.classList.remove(_scrollBlockClass);
        window.removeEventListener("resize", hideMenu);
      });

      const btnRect = btnEl.getBoundingClientRect();
      const menuRect = menuEl.getBoundingClientRect();

      btnEl.addEventListener("mouseleave", function destroyMenu(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const onPoint = isInArea(
          ev.x,
          ev.y,
          menuRect.x,
          menuRect.y,
          menuRect.width,
          menuRect.y + menuRect.height
        );

        if (!onPoint) {
          menuEl.classList.remove(_menuActiveClassName);
          overlay.classList.remove(_menuActiveClassName);
          btnEl.classList.remove(_menuActiveClassName);
          document.body.classList.remove(_scrollBlockClass); //aaaa
          btnEl.removeEventListener("mouseleave", destroyMenu);
        }
      });

      menuEl.addEventListener("mouseleave", function destroyMenu(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        const onPoint = isInArea(
          ev.x,
          ev.y,
          btnRect.x,
          btnRect.y,
          btnRect.width,
          btnRect.y + btnRect.height
        );

        if (!onPoint) {
          menuEl.classList.remove(_menuActiveClassName);
          overlay.classList.remove(_menuActiveClassName);
          btnEl.classList.remove(_menuActiveClassName);
          document.body.classList.remove(_scrollBlockClass); //aaaa
          menuEl.removeEventListener("mouseleave", destroyMenu);
        }
      });
    }
  });
}

/** Function to test if point is in target square area */
function isInArea(_x, _y, _areaX, _areaY, _areaWidth, _areaHeight) {
  return (
    _x >= _areaX &&
    _x <= _areaX + _areaWidth &&
    _y >= _areaY &&
    _y <= _areaY + _areaHeight
  );
}

// hoverMenu(1, 1);
// hoverMenu(6, 6);

class HoverMenu {
  #btnDataAtr;
  #menuDataAtr;
  #menuActiveClassName;
  #btnHighlight;
  #overlayOn;
  #overlayId;
  #lockBodyScroll;
  #scrollBlockClass;
  #btnEl;
  #menuEl;

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

  addMenuElement(_btnVal, _menuVal) {
    // Selectors for further user
    const btnSelector = `[${this.#btnDataAtr}="${_btnVal}"]`;
    const menuSelector = `[${this.#menuDataAtr}="${_menuVal}"]`;

    // Btn and menu elements
    this.#btnEl = document.querySelector(btnSelector);
    this.#menuEl = document.querySelector(menuSelector);

    // Optional overlay
    let overlay;
    if (this.#overlayOn) {
      overlay = document.querySelector(`#${this.#overlayId}`);
    }

    // Initialize hover menu functionality on btn element
    this.#handleHover();
  }

  /** Method to test if point is in target square area */
  #isInArea(x, y, left, top, right, bot) {
    return x >= left && x <= right && y >= top && y <= bot;
  }

  #toggleOnAll() {
    // Show menu
    this.#menuEl.classList.add(this.#menuActiveClassName);

    // Show overlay if option is turned on
    if (this.#overlayOn) {
      overlay.classList.add(this.#menuActiveClassName);
    }

    // Highlight button if option is turned on
    if (this.#btnHighlight) {
      this.#btnEl.classList.add(this.#menuActiveClassName);
    }

    //   Block body scroll if option is turned on
    if (this.#lockBodyScroll) {
      document.body.classList.add(this.#scrollBlockClass);
    }
  }

  #toggleOffAll() {
    //   Clear menu
    this.#menuEl.classList.remove(this.#menuActiveClassName);

    // Clear overlay if option is activated
    if (this.#overlayOn) {
      overlay.classList.remove(this.#menuActiveClassName);
    }

    // Clear overlay if option is activated
    if (this.#btnHighlight) {
      this.#btnEl.classList.remove(this.#menuActiveClassName);
    }

    // Clear overlay if option is activated
    if (this.#lockBodyScroll) {
      document.body.classList.remove(this.#scrollBlockClass);
    }
  }

  #handleOnLeave(event, safeLeft, safeTop, safeRight, safeBot) {
    event.preventDefault();
    event.stopPropagation();

    const safeSpot = this.#isInArea(
      event.x,
      event.y,
      safeLeft,
      safeTop,
      safeRight,
      safeBot
    );

    if (!safeSpot) {
      this.#toggleOffAll();
    }
  }

  #handleHover() {
    // Create listener on button element
    this.#btnEl.addEventListener("mouseover", () => {
      // Only react if menu is not already present
      if (!this.#menuEl.classList.contains(this.#menuActiveClassName)) {
        // Toggle menu and all optional elements
        this.#toggleOnAll();

        // Hide menu on resize
        window.addEventListener("resize", () => {
          // Remove visibility from all elements
          this.#toggleOffAll();
        });

        // Btn and menu coordinates
        const btnRect = this.#btnEl.getBoundingClientRect();
        const menuRect = this.#menuEl.getBoundingClientRect();

        // Add leave handle for btn
        this.#btnEl.addEventListener("mouseleave", (ev) => {
          this.#handleOnLeave(
            ev,
            menuRect.left,
            menuRect.top,
            menuRect.right,
            menuRect.bottom
          );
        });

        // Add leave handle for menu
        this.#menuEl.addEventListener("mouseleave", (ev) => {
          this.#handleOnLeave(
            ev,
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

const a = new HoverMenu();
a.addMenuElement(1, 1);
