const express = require("express");
const bodyParser = require("body-parser");
var argv = require('minimist')(process.argv.slice(2));
const cors = require("cors");
var swagger = require("swagger-node-express");
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/catalogo.routes.js")(app);
require("./app/routes/catalogobydato.routes.js")(app);
require("./app/routes/puntoatencion.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/roles.routes.js")(app);
require("./app/routes/tipoquejas.routes.js")(app);
require("./app/routes/bancoquejas.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
