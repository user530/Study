module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/search`, (req, res) => {
    res.render(`search.html`);
  });
};
