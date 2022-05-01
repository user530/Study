const wr = document.querySelector(".content");

const objs = [
  { key1: "ТекущиеA1", key2: "ТекущиеA2", key3: "ТекущиеA3" },
  { key1: "ТекущиеB1", key2: "ТекущиеB2", key3: "ТекущиеB3" },
  { key1: "ТекущиеC1", key2: "ТекущиеC2", key3: "ТекущиеC3" },
];

const objs2 = [
  { key1: "СтарыеA1", key2: "СтарыеA2", key3: "СтарыеA3" },
  { key1: "СтарыеB1", key2: "СтарыеB2", key3: "СтарыеB3" },
  { key1: "СтарыеC1", key2: "СтарыеC2", key3: "СтарыеC3" },
];

const btnTable = document.querySelector("#btnTable");
const btnCards = document.querySelector("#btnCards");
const btnCurData = document.querySelector("#btnCurData");
const btnOldData = document.querySelector("#btnOldData");

let data = objs;
let visTable = true;

btnCards.onclick = () => {
  visTable = false;
  fillWrapper(wr);
};
btnTable.onclick = () => {
  visTable = true;
  fillWrapper(wr);
};

btnCurData.onclick = () => {
  data = objs;
  fillWrapper(wr);
};
btnOldData.onclick = () => {
  data = objs2;
  fillWrapper(wr);
};

createTable(data, wr);

function fillWrapper(wrapperElem) {
  // Clear wrapper
  wrapperElem.replaceChildren();

  // Check current settings
  if (visTable) createTable(data, wrapperElem);
  else createCard(data, wrapperElem);
}

function createTable(objs, wrapperElem) {
  // Prepare table and header elements
  const table = document.createElement("table");
  const header = document.createElement("tr");

  // Iterate over every object index in object list
  for (const objInd in objs) {
    // Prepare row element
    const row = document.createElement("tr");

    // Iterate over every key in the object
    for (const key in objs[objInd]) {
      // Shortcut for the object
      const obj = objs[objInd];

      // While iterating over 1st object we also prepare header
      if (objInd == 0) {
        // Create column and add to the header
        const col = document.createElement("th");
        col.textContent = key;
        header.appendChild(col);
      }

      // Create data entry and add to the row
      const entry = document.createElement("td");
      entry.textContent = obj[key];
      row.appendChild(entry);
    }

    // Add complete row to the table
    table.appendChild(row);
  }
  // Add complete header to the top of the table
  table.insertBefore(header, table.children[0]);

  // Add table to the wrapper
  wrapperElem.appendChild(table);
}

function createCard(objs, wrapperElem) {
  // Iterate over objects
  for (let obj of objs) {
    // Prepare card element
    const card = document.createElement("div");

    // Iterate over keys of the object
    for (let key in obj) {
      // Prepare row element
      const row = document.createElement("div");

      // Prepare span for the key
      const span1 = document.createElement("span");
      span1.textContent = key + " - ";

      // Prepare span for the value
      const span2 = document.createElement("span");
      span2.textContent = obj[key];

      // Add key-value to the row
      row.appendChild(span1);
      row.appendChild(span2);

      // Add row to the card
      card.appendChild(row);
    }
    // Add card to the wrapper
    wrapperElem.appendChild(card);
  }
}
