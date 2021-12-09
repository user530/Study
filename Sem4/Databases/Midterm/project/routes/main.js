const { cleanQuery, ajaxReq } = require("../functions");
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
    const queryStr = `SELECT * FROM devices_base`;
    // Execute query
    db.query(queryStr, (err, dbResult) => {
      // Handle possible error
      if (err) {
        // Log error and redirect to the main page
        console.error(err);
        res.redirect(`/`);
      }
      // Render page if there is no error
      res.render(`list.html`, { devices: cleanQuery(dbResult) });
    });
  });

  app.get(`/deviceAdd`, (req, res) => {
    if (req.query.show) {
      // Request to get new properties list
      const reqNewProper = `SELECT * FROM devices_base WHERE type=?`;
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
        res.send(cleanQuery(resNewProper));
      });
    } else {
      const reqTypes = `SELECT type FROM devices_base`;
      db.query(reqTypes, (err, resTypes) => {
        // Handle error
        if (err) {
          console.error(err);
          res.redirect(`/`);
        }

        // Get properties of 1st device
        const reqInitProper = `SELECT * FROM devices_base LIMIT 1`;
        db.query(reqInitProper, (err2, resProper) => {
          // Handle error
          if (err2) {
            console.error(err2);
            res.redirect(`/`);
          }

          // Render page
          res.render(`deviceAdd.html`, {
            types: resTypes,
            properties: cleanQuery(resProper),
          });
        });
      });
    }
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
