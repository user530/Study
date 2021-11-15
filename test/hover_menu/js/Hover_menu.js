const a = document.querySelectorAll("[data-role]");
const b = document.querySelectorAll("[data-content]");

const btnDataAtr = "data-role";
const menuDataAtr = "data-content";
const btnVal = 1;
const menuVal = 1;
const menuActiveClassName = "active";

const largeMenu = document.querySelector(".large-menu");

function hoverMenu(
  _btnVal,
  _menuVal,
  _btnDataAtr = "data-role",
  _menuDataAtr = "data-content",
  _menuActiveClassName = "active"
) {
  const btnSelector = `[${_btnDataAtr}="${_btnVal}"]`;
  const menuSelector = `[${_menuDataAtr}="${_menuVal}"]`;

  const btnEl = document.querySelector(btnSelector);
  const menuEl = document.querySelector(menuSelector);

  btnEl.addEventListener("mouseover", () => {
    if (!menuEl.classList.contains(_menuActiveClassName)) {
      menuEl.classList.add(_menuActiveClassName);
    }
  });

  menuEl.addEventListener("mouseleave", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const btnRect = btnEl.getBoundingClientRect();

    const onPoint = isInArea(
      ev.x,
      ev.y,
      btnRect.x,
      btnRect.y,
      btnRect.width,
      menuEl.getBoundingClientRect().top - btnRect.top
    );

    console.log(new MouseEvent());

    if (!onPoint) {
      menuEl.classList.remove(_menuActiveClassName);
      menuEl.removeEventListener("mouseleave");
    }
  });

  window.addEventListener("resize", () => {
    menuEl.classList.remove(_menuActiveClassName);
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
