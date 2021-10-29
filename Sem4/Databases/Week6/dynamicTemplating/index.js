const express = require("express");
const app = express();
const port = 8080;

require("./routes/main")(app);

app.set("views", __dirname + "\\views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => {
  console.log(`Express server is up and running at port ${port}`);
});
