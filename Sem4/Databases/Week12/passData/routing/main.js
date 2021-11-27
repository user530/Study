module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });
  app.get(`/list`, (req, res) => {
    const queryStr = `SELECT * FROM test1`;
    db.query(queryStr, (err, result) => {
      if (err) {
        res.redirect(`/`);
      }
      res.render(`list.html`, { availableBooks: result });
    });
  });
};
