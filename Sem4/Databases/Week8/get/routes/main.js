module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get("/search", (req, res) => {
    res.render(`search.html`);
  });

  app.get("/search-result", (req, res) => {
    // Searh in the database
    res.send(
      `This is the name of the field: '${
        Object.keys(req.query)[0]
      }'...<br> And this is the value entered - '${
        req.query[Object.keys(req.query)[0]]
      }'...`
    );
  });
};
