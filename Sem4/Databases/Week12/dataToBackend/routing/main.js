module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/list`, (req, res) => {
    const queryStr = `SELECT * FROM test1`;
    connection.query(queryStr, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect(`/`);
      }
      res.render(`list.html`, { backendData: result });
    });
  });

  app.get(`/addBook`, (req, res) => {
    res.render(`addBook.html`);
  });

  app.post(`/addBook`, (req, res) => {
    const addBookQuery = `INSERT INTO test1(name,price) VALUES (?,?)`;
    const name = req.body.bookName;
    const price = req.body.bookPrice;
    const userData = [name, price];
    connection.query(addBookQuery, userData, (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.send(
        `<h1>Book added</h1>
        New book - ${req.body.bookName} added, price is set to - ${req.body.bookPrice}<br>
        <a href="/">Main page</a><br>
        <a href="/list">Check all items</a>`
      );
    });
  });
};
