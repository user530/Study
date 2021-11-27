const express = require(`express`); // Load express module
const app = express(); // Initialize the express application
const bodyParser = require(`body-parser`); // Load body-parser module
const mysql = require(`mysql`);
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

require(`./routing/main`)(app);

app.set(`views`, `${__dirname}\\templates`);
app.set(`view engine`, `ejs`);
app.engine(`html`, require(`ejs`).renderFile);
app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

const db = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `express_project`,
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Database connection established...`);
});
global.db = db;
