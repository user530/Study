module.exports = (app) => {
  // Main page route - if non existing link is given, reroute to main
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/about`, (req, res) => {
    res.render(`about.html`);
  });

  app.get(`/list`, (req, res) => {
    res.render(`list.html`);
  });
  app.get(`/deviceAdd`, (req, res) => {
    res.render(`deviceAdd.html`);
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
