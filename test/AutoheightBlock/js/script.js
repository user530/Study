/** Функция для "выравнивания" стилей двух элементов
 * @param {string} selectorToThisStyle - "Квери селектор" для выбора эталонного элемента;
 * @param {string} selectorThisElement - "Квери селектор" для выбора элемента приводимого к эталону;
 * @param {string} style - название JS свойства стиля;
 */
function adjustStyle(selectorToThisStyle, selectorThisElement, style) {
  const elem1 = document.querySelector(selectorToThisStyle);
  const elem2 = document.querySelector(selectorThisElement);
  if (elem1 != undefined && elem2 != undefined) {
    const styles = window.getComputedStyle(elem1);
    if (styles[style]) {
      elem2.style[style] = styles[style];
    } else {
      console.warn(`AdjustStyle function - Стиль не найден!`);
    }
  } else {
    console.warn(`AdjustStyle function - Не найден элемент(-ы)!`);
  }
}

adjustStyle(`.autoHeight-left`, `.autoHeight-right`, `height`);
