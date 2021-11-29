module.exports = (app) => {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/test`, (req, res) => {
    res.render(`test.html`);
  });

  app.post(`/test`, (req, res) => {
    const sanitized_inp = req.sanitize(req.body.input);
    res.send({ lel: sanitized_inp });
  });

  app.get(`/list`, (req, res) => {
    const sql = `SELECT * FROM test1`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(`No results!`);
      }
      res.render(`list.html`, { dbData: result });
    });
  });
};
