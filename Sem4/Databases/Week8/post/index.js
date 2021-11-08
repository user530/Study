const express = require(`express`);
const app = express();
const port = 8080;

// Setup body parser for POST requests
const parser = require(`body-parser`);
app.use(parser.urlencoded({ extended: true }));

// Connect routing script with the app
require(`./routing/main`)(app);

// Setup template engine
app.set(`views`, `${__dirname}\\templates`);

// Setup rendering engine -> EJS
app.set(`view engine`, `ejs`);

// Setup rendering of the HTML pages
app.engine(`html`, require(`ejs`).renderFile);

// Activate server
app.listen(port, () => {
  console.log(`Server is up and running at port ${port}...`);
});
