const express = require(`express`);
const bodyParser = require(`body-parser`);
const mysql = require(`mysql`);
const app = express();
const port = 8087;
const db = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `express_project`,
});

app.use(bodyParser.urlencoded({ extended: true }));

require(`./routes/main`)(app);

app.set(`views`, `${__dirname}\\views`);
app.set(`view engine`, `ejs`);
app.engine(`html`, require(`ejs`).renderFile);
app.listen(port, () => {
  console.log(`Server is up and running ${port}...`);
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Database connection established...`);
});
global.db = db;
