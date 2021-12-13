const { query } = require("express");
const functions = require(`../functions`);

module.exports = (app) => {
  // Main page route - if non existing link is given, reroute to main
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/about`, (req, res) => {
    res.render(`about.html`);
  });

  app.get(`/list`, (req, res) => {
    // Query string to select all information from devices table
    const queryStr = `SELECT * FROM devices`;
    // Execute query
    db.query(queryStr, (err, dbResult) => {
      // Handle possible error
      if (err) {
        // Log error and redirect to the main page
        console.error(err);
        res.redirect(`/`);
      }
      // Render page if there is no error
      res.render(`list.html`, { devices: functions.cleanQuery(dbResult) });
    });
  });

  app.get(`/deviceAdd`, (req, res) => {
    // When user selects input
    if (req.query.show) {
      // Request to get new properties list
      const reqNewProper = `SELECT * FROM properties WHERE type=?`;
      // Sanitized input - type of the device to get properties
      const sanitInp = req.sanitize(req.query.show);

      // DB Request
      db.query(reqNewProper, sanitInp, (err, resNewProper) => {
        // handle errors
        if (err) {
          console.error(err);
          res.redirect(`/`);
        }
        // if no errors, send new data back
        const info = functions.cleanQuery(resNewProper);
        res.send(functions.dataToForm(info[0]));
      });
    }
    // On initial load
    else {
      const reqTypes = `SELECT type FROM properties`;
      db.query(reqTypes, (err, resTypes) => {
        // Handle error
        if (err) {
          console.error(err);
          res.redirect(`/`);
        }

        // Get properties of 1st device
        const reqInitProper = `SELECT * FROM properties LIMIT 1`;
        db.query(reqInitProper, (err2, resProper) => {
          // Handle error
          if (err2) {
            console.error(err2);
            res.redirect(`/`);
          }

          // Render page
          res.render(`deviceAdd.html`, {
            types: resTypes,
            form: functions.dataToForm(functions.cleanQuery(resProper)[0]),
          });
        });
      });
    }
  });

  app.post(`/deviceAdd`, (req, res) => {
    // Keys from data object passed through post request
    const bodyKeys = Object.keys(req.body);
    // Prepare statement template
    const template = functions.insertTemplate(bodyKeys.length, bodyKeys);
    // Prepare params
    const sqlParams = [];
    // Iterate over all keys
    bodyKeys.forEach((key) => {
      // Sanitize data passed and add to the param array
      sqlParams.push(req.sanitize(req.body[key]));
    });

    // Query to new device data
    db.query(template, sqlParams, (sqlErr, insertRes) => {
      // Handle errors
      if (sqlErr) {
        console.error(sqlErr);
        res.redirect(`/`);
      }
      // Render page
      res.render(`index.html`, { message: insertRes });
    });
  });

  app.get(`/deviceDelete`, (req, res) => {
    res.render(`deviceDelete.html`);
  });
  app.get(`/deviceStatus`, (req, res) => {
    res.render(`deviceStatus.html`);
  });
  app.get(`/deviceUpdate`, (req, res) => {
    res.render(`deviceUpdate.html`);
  });

  // Handle 404 requests -> Show
  app.use((req, res) => {
    res.status(404).render(`404.html`);
  });

  // Handle error
  app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send(`Unexpected error`);
  });
};
