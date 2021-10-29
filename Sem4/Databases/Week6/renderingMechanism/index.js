const express = require(`express`);
const app = express();
const port = 8080;

// Require the main.js file inside route folder passing express app as an argument 
require(`./routes/main`)(app);

// Set the path to the views folder for the EJS(Embedded Javascript Templating) engine. All html files will be placed here later
app.set(`views`, __dirname + `\\views`);

// We tell Express to use the EJS as the templating engine for this app
app.set(`view engine`, `ejs`);

// We tell Express to render html pages
app.engine(`html`, require(`ejs`).renderFile);

// Activate the server at the defined port and show system message
app.listen(port, ()=>{console.log(`Express server is up and running at port ${port}...`);});

