const md5 = require("md5");

/** Function to clean result from null properties
 * @param {Array.<object>} sqlQueryResult array of objects, result of the mysql query
 * @returns {Array.<object>} array of objects, cleared from keys with null values
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
    let formHtml = `<form action="/deviceAdd" method="post" id="deviceAddForm">`;

    // Iterate over key's
    for (const key in dataObj) {
      if (key !== `id` && key !== `type`) {
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
 *  @returns {Array.<string>} array of properties
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
  // Current time
  const nowTime = new Date().toLocaleTimeString(`en-GB`, {
    hour: `2-digit`,
    minute: `2-digit`,
  });
  return nowTime;
}

/** Function to get current date and time
 *  @param {number=0} addMin optional: offset from current date in minutes
 * @returns {string} date:time in form of YYYY:MM:DD HH:MM
 */
function getDateTime(addMin = 0) {
  // Current date
  let nowDate = new Date();
  const offset = nowDate.getTimezoneOffset();
  nowDate = new Date(nowDate.getTime() + addMin * 60000 - offset * 60 * 1000);

  // Format string
  return `${nowDate.toISOString().slice(0, 16)}`;
}

/** Function to create input(-s) fields from data pair
 * @param {string} key property string, containing property name and required input type
 * @param {string} value property valid values, limits or ranges
 * @returns {string} input fields in html string form
 */
function createInput(key, value) {
  // Get data from key-value pair
  const name = propertyGetName(key);
  const formName = key.slice(0, key.indexOf(`[`));
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
            <input type="${input}" name="${formName}" value="${option}"`;
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
      html += `<input type="${input}" name="${formName}" value="${getTime()}">`;
      break;
    case `range`:
      // Create range input, based on the properties
      html += `<input type="${input}" name="${formName}" min="${
        properties[0]
      }" max="${properties[1]}" step="${
        properties[2]
      }" oninput="this.nextSibling.innerText=this.value"><span>${Math.floor(
        (+properties[0] + +properties[1]) / 2
      )}</span>`;
      break;
    case `color`:
      // Create color input
      html += `<input type="${input}" name="${formName}" value="${properties[0]}">`;
      break;
    case `text`:
      // Create text input, based on the properties
      html += `<input type="${input}" name="${formName}" maxlength="${properties[1]}" value="${properties[0]}">`;
      break;
    case `datetime`:
      // Create date-time input, based on the properties
      html += `<input type="${input}-local" name="${formName}" min="${getDateTime()}" value="${getDateTime(
        5
      )}">`;
      break;
  }
  // Finish and return input form wrapper
  html += `</div>`;
  return html;
}

/** Function to create insert prepared sql statement template
 * @param {number} dataLength number of params to be inserted
 * @param {Array.<string>} keys array of row names (strings)
 * @returns {string} sql insert prepared statement template
 */
function insertTemplate(dataLength, keys) {
  // Check that request is not empty
  if (dataLength > 0) {
    // param string base
    let str = `?,`;
    // Make str of repeated number of params, delete last coma
    str = str.repeat(dataLength).slice(0, -1);
    // Insert query template
    let sqlInsert = `INSERT INTO devices(`;
    // Iterate over keys
    keys.forEach((key) => {
      // because our row names include special characters we need to add backticks
      sqlInsert += `\`${key}\`,`;
    });
    // finish insert statement string and return it
    sqlInsert = `${sqlInsert.slice(0, -1)}) VALUES (${str})`;
    return sqlInsert;
  }
}

/** Function to prepare message object for cookies
 * @param {string} msg message, that will be stored and used for check
 * @param {boolean} status message status: true - Success message, false - Error message
 * @returns {object.<string>} object of strings that store request code, sets up status and message info
 */
function prepareMessage(msg, status) {
  const result = {};
  switch (msg) {
    case `deviceAdd`:
      // Code req
      result.req = md5(md5(msg));
      if (status === true) {
        // Set status
        result.status = `Success`;
        // Set msg
        result.msg = `New device successfully added.`;
      } else if (status === false) {
        // Set status
        result.status = `Error`;
        // Set msg
        result.msg = `Failed to add new device, please check your data!`;
      }
      break;
    case `data`:
      // Code req
      result.req = md5(md5(msg));
      if (status === false) {
        // Set status
        result.status = `Error`;
        // Set msg
        result.msg = `Failed to load data, please check your request and try again!`;
      }
      break;
  }
  return result;
}

module.exports = {
  cleanQuery: cleanQuery,
  dataToForm: dataToForm,
  propertyGetName: propertyGetName,
  propertyGetInput: propertyGetInput,
  parseValue: parseValue,
  createInput: createInput,
  insertTemplate: insertTemplate,
  prepareMessage: prepareMessage,
};
