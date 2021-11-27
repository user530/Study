const express = require(`express`);
const app = express();
const parser = require(`body-parser`);
const mysql = require(`mysql`);
const port = 8080;

app.use(parser.urlencoded({ extended: true }));

require(`./routing/main`)(app);

app.set(`views`, `${__dirname}\\templates`);
app.set(`view engine`, `ejs`);
app.engine(`html`, require(`ejs`).renderFile);
app.listen(port, () => {
  console.log(`Server is up and running at port ${port}...`);
});

const connection = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `express_project`,
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Database connection established successfully...`);
});
global.connection = connection;
