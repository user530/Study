const { render } = require("ejs");
const { query } = require("express");

module.exports = function (app) {
  app.get(`/`, (req, res) => {
    res.render(`index.html`);
  });

  app.get(`/addBook`, (req, res) => {
    res.render(`addBook.html`);
  });

  app.post(`/addBook`, (req, res) => {
    const query = `INSERT INTO test1(name, price) VALUES(?, ?)`;
    const userInput = [req.body.bookName, req.body.bookPrice];
    connection.query(query, userInput, (err, result) => {});
  });

  app.get(`/search`, (req, res) => {
    res.render(`search.html`);
  });

  app.get(`/list`, (req, res) => {
    if (req.query.bookName) {
      const searchItem = `%${req.query.bookName.trim()}%`;
      const query = `SELECT * FROM test1 WHERE name LIKE ?`;
      connection.query(query, [searchItem], (err, result) => {
        if (err) {
          return console.error(err.message);
        }
        res.render(`list.html`, { data: result, search: true });
      });
    } else {
      const query = `SELECT * FROM test1`;
      connection.query(query, (err, result) => {
        if (err) {
          console.error(`No files found...`);
        }
        res.render(`list.html`, { data: result, search: false });
      });
    }
  });
};
