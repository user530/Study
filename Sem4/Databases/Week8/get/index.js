const express = require("express");
const app = express();
const port = 8080;

// connect routing script and mobile app
require(`./routes/main`)(app);

// set template dir -> views
app.set(`views`, `${__dirname}\\views`);

// set view engine -> we using ejs
app.set(`view engine`, `ejs`);

// setup engine to render html using EJS
app.engine(`html`, require(`ejs`).renderFile);

// activate server
app.listen(port, () => {
  console.log(`Server up and running at the port ${port}... `);
});
