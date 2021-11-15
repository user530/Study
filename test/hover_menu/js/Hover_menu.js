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

hoverMenu(1, 1);
hoverMenu(6, 6);
