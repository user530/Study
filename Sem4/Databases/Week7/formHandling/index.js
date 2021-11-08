const express = require(`express`);
const app = express();
const port = 8080;

// routing script
require(`./routes/main.js`)(app);

// Set template path to dir/views
app.set(`views`, `${__dirname}\\views`);

// Set view engine to ejs
app.set(`view engine`, `ejs`);

// Setup engine page rendering
app.engine(`html`, require(`ejs`).renderFile);

// Activate server
app.listen(port, () => {
  console.log(`Express server is started, port: ${port}. Running...`);
});
