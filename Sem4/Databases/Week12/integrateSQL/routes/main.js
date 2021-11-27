module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });
  app.get(`/search`, (req, res) => {
    res.render(`search.html`);
  });
  app.get(`/search-result`, (req, res) => {
    let a = req.query;
    let str = "";
    Object.keys(a).forEach((key) => {
      str += `<h3>${key}</h3><p>${a[key]}</p><br>`;
    });

    res.send(str);
  });

  app.get(`/register`, (req, res) => {
    res.render(`register.html`);
  });

  app.post(`/register-result`, (req, res) => {
    let str = "<h1>Registration succesfull</h1><br>";
    Object.keys(req.body).forEach((key) => {
      str += `<h3>${key}</h3><p>${req.body[key]}</p><br>`;
    });
    res.send(str);
  });

  // MYSQL
  app.get(`/list`, function (req, res) {
    const selectAll = `SELECT * FROM test1`;
    // redirect if there is error or return query result for the get request /list
    db.query(selectAll, (err, result) => {
      if (err) {
        res.redirect(`/`);
      }
      res.send(result);
    });
  });
};
