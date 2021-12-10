/** Function to clean result from null properties
 * @param {array} sqlQueryResult array of objects, result of the mysql query
 * @returns {array} array of objects, cleared from keys with null values
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

  return devices;
}

/** Function to create input form from the data object
 * @param {object} dataObj data object describing one device entity
 * @returns {string} html string
 */
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
    // Finish and return form
    formHtml += `<input type="submit" value="Add device"></form>`;
    return formHtml;
  }
}

/** Function to get formated name string from the property string format
 * @param {string} propertyString property string containing name and input type
 * @returns {string} properly formated name string of device property
 */
function propertyGetName(propertyString) {
  // Slice off input part
  let propertyName = propertyString.slice(0, propertyString.indexOf(`[`));
  // Split words and recconect them with white space
  propertyName = propertyName.split(`_`);
  propertyName = propertyName.join(` `);
  // Change format to first char upper case and return proper name
  propertyName = propertyName[0].toUpperCase() + propertyName.slice(1);
  return propertyName;
}

/** Function to get input type from the property string format
 * @param {string} propertyString property string containing name and input type
 * @returns {string} input type string for device property input form
 */
function propertyGetInput(propertyString) {
  // Get type string from brackets
  const propertyInputStr = propertyString.slice(
    propertyString.indexOf(`[`) + 1,
    propertyString.indexOf(`]`)
  );
  return propertyInputStr;
}

/** Function to get values
 *  @param {string} value string value containing additional information about device
 *  @returns {array} array of properties
 */
function parseValue(value) {
  const res = value.split(`,`);
  return res.map((str) => {
    return str.trim();
  });
}

/** Function to get current time
 *  @returns {string} current time in format HH:MM
 */
function getTime() {
  // Current date
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

/** Function to get current date and time
 *  @param {number=0} offsetYears optional: offset from current date in years
 * @returns {string} date:time in form of YYYY:MM:DD HH:MM
 */
function getDateTime(offsetYears = 0) {
  // Current date
  const now = new Date();
  return `${
    now.getFullYear() + offsetYears
  }-${now.getMonth()}-${now.getDay()}T${now.getHours()}:${now.getMinutes()}`;
}

/** Function to create input(-s) fields from data pair
 * @param {string} key property string, containing property name and required input type
 * @param {string} value property valid values, limits or ranges
 * @returns {string} input fields in html string form
 */
function createInput(key, value) {
  // Get data from key-value pair
  const name = propertyGetName(key);
  const input = propertyGetInput(key);
  const properties = parseValue(value);
  // Create input form wrapper and fill it with appropriate content
  let html = `<div id="${name}"><span>${name}: </span>`;
  switch (input) {
    case `radio`:
      // For each property stored
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
      // Create appropriate input, default - current time
      html += `<input type="${input}" name="${name}" value="${getTime()}">`;
      break;
    case `range`:
      // Create range input, based on the properties
      html += `<input type="${input}" name="${name}" min="${
        properties[0]
      }" max="${properties[1]}" step="${
        properties[2]
      }" oninput="this.nextSibling.innerText=this.value"><span>${
        (+properties[0] + +properties[1]) / 2
      }</span>`;
      break;
    case `color`:
      // Create color input
      html += `<input type="${input}" name="${name}">`;
      break;
    case `text`:
      // Create text input, based on the properties
      html += `<input type="${input}" name="${name}" maxlength="${properties}">`;
      break;
    case `datetime`:
      // Create date-time input, based on the properties
      html += `input type="${input}-local" name="${name}" min="${getDateTime()}" max="${getDateTime(
        1
      )}"`;
      break;
  }
  // Finish and return input form wrapper
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
