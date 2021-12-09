/** Function to clean result from null properties
 * @param {object} sqlQueryResult - result of the mysql query
 */
function cleanQuery(sqlQueryResult) {
  // Result variable
  const devices = new Array();

  // Iterate over result
  sqlQueryResult.forEach((row) => {
    // For each row create an object entry
    const item = new Object();
    // Check all keys
    for (const key in row) {
      // If the value is not null
      if (row[key] !== null) {
        // add it to item object
        item[key] = row[key];
      }
    }
    // Add filtered item row to the result variable
    devices.push(item);
  });

  // console.log(devices);
  return devices;
}
function dataToForm(dataObj) {
  // Check for correct argument
  if (
    Object.getPrototypeOf(dataObj) === Object.prototype &&
    Object.keys(dataObj).length !== 0
  ) {
    // Create form
    let formHtml = `<form action="" method="post" id="deviceAddForm">`;
    // Iterate over key's
    for (const key in dataObj) {
      if (key !== `type`) {
        // make input depending on key/value
        formHtml += createInput(key, dataObj[key]);
      }
    }
    formHtml += `<input type="submit" value="Add device"></form>`;
    return formHtml;
  }
}
function propertyGetName(propertyString) {
  let propertyName = propertyString.slice(0, propertyString.indexOf(`[`));
  propertyName = propertyName.split(`_`);
  propertyName = propertyName.join(` `);
  propertyName = propertyName[0].toUpperCase() + propertyName.slice(1);
  return propertyName;
}
function propertyGetInput(propertyString) {
  const propertyInputStr = propertyString.slice(
    propertyString.indexOf(`[`) + 1,
    propertyString.indexOf(`]`)
  );
  return propertyInputStr;
}
function parseValue(value) {
  const res = value.split(`,`);
  return res.map((str) => {
    return str.trim();
  });
}
function createInput(key, value) {
  const name = propertyGetName(key);
  const input = propertyGetInput(key);
  const properties = parseValue(value);
  let html = `<div id="${name}">${name}<br>`;
  switch (input) {
    case `radio`:
      properties.forEach((option, ind) => {
        // add radio buttons for all options (with labels)
        html += `<label><span>${option}</span>
            <input type="${input}" name="${name}" value="${option}"`;
        // set checked for last option
        if (ind === properties.length - 1) {
          html += ` checked`;
        }
        // finish radio input
        html += `></label>`;
      });
      break;
    case `time`:
      break;
    case `range`:
      break;
    case `color`:
      break;
    case `text`:
      break;
    case `datetime`:
      break;
  }
  html += `</div>`;
  return html;
}

module.exports = {
  cleanQuery: cleanQuery,
  dataToForm: dataToForm,
  propertyGetName: propertyGetName,
  propertyGetInput: propertyGetInput,
  parseValue: parseValue,
  createInput: createInput,
};
