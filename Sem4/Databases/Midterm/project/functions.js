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
};
