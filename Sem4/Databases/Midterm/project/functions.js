module.exports = {
  /** Function to clean result from null properties
   * @param {object} sqlQueryResult - result of the mysql query
   */
  cleanQuery(sqlQueryResult) {
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
  },
  dataToForm(dataObj) {
    // Check for correct argument
    if (
      Object.getPrototypeOf(dataObj) === Object.prototype &&
      Object.keys(dataObj).length !== 0
    ) {
      // Iterate over key's
      for (const key in dataObj) {
        if (key !== `type`) {
          // make input depending on key/value
          createInput(key, dataObj[key]);
        }
      }
    }
  },
  propertyGetName(propertyString) {
    let propertyName = propertyString.slice(0, propertyString.indexOf(`[`));
    propertyName = propertyName.split(`_`);
    propertyName = propertyName.join(` `);
    propertyName = propertyName[0].toUpperCase() + propertyName.slice(1);
    return propertyName;
  },
  propertyGetInput(propertyString) {
    const propertyInputStr = propertyString.slice(
      propertyString.indexOf(`[`) + 1,
      propertyString.indexOf(`]`)
    );
    return propertyInputStr;
  },
  parseValue(value) {
    const res = value.split(`,`);
    console.log(res);
    return res.map((str) => {
      str = str.trim();
      return str.slice(1, str.length - 1);
    });
  },
  createInput(key, value) {
    const name = propertyGetName(key);
    const input = propertyGetInput(key);
    const properties = parseValue(value);
    // console.log(`Name - ${name}, input - ${input}, prop - ${properties}`);
    let html = `<div id="${name}">`;
    switch (input) {
      case `radio`:
        properties.forEach((option) => {
          html += `<input type="${input}" name="${name}" value="${option}">`;
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
  },
};
