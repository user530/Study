module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/search`, (req, res) => {
    res.render(`search.html`);
  });

  app.get(`/search-result`, (req, res) => {
    res.send(`This is the search value - ${req.query.keyword}.`);
  });

  app.get(`/register`, (req, res) => {
    res.render(`register.html`);
  });

  app.post(`/registered`, (req, res) => {
    res.send(
      `<h2>Hello ${req.body.first} ${req.body.last}, you are now registered!</h2>`
    );
  });
};
