// Express
const express = require(`express`);
const app = express();

// Body-parser
const parser = require(`body-parser`);

// Mysql
const mysql = require(`mysql`);

// Express sanitizer
const sanitizer = require(`express-sanitizer`);

// MD5
const md5 = require(`md5`);

// Setup body-parser
app.use(parser.urlencoded({ extended: true }));

// Setup express sanitizer
app.use(sanitizer());

// Port
const port = 8089;

// Database connection
const connection = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `express_project`,
});

// Routing script
require(`./routes/main`)(app);

// Setup server
// Set template folder
app.set(`views`, `${__dirname}\\templates`);
// Set rendering engine
app.set(`view engine`, `ejs`);
// Setup rendering engine to render html pages
app.engine(`html`, require(`ejs`).renderFile);
// Activate server
app.listen(port, () => {
  console.log(`Express server is up and running at port ${port}`);
});

// Connect to database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Database connection established successfully...`);
});

// Make database available from everywhere
global.db = connection;
