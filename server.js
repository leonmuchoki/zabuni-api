//https://www.taniarascia.com/node-express-postgresql-heroku/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");

const { swaggerOptions } = require("./swagger/options")
const { createInitialRoles } = require("./utilities/Roles");
const { createInitialSectors } = require("./utilities/sectors");
const { createInitialTenderTypes } = require("./utilities/tenderTypes");
const { createInitialTenderCategories } = require("./utilities/tenderCategories");
const { createInitialDocumentTypes } = require("./utilities/documentTypes");

const app = express();
var corsOptions = {
  origin: "https://zabunike.herokuapp.com"//"http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.json("Hello world!");
});


const specs = swaggerJsondoc(swaggerOptions);
app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);


const db = require("./models");
const { createTenderCategory } = require("./controllers/tenderCategory.controller");
const Role = db.role;
//db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  //--initial();
  //createInitialRoles();
  //createInitialSectors();
  //createInitialTenderTypes();
  //createInitialTenderCategories();
  //createInitialDocumentTypes();
}).catch((err) => {
  console.log(">> Error resyncing db: ", err);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zabuni application!" });
});
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/company.routes')(app);
require('./routes/document.routes')(app);
require('./routes/documentType.routes')(app);
require('./routes/tender.routes')(app);
require('./routes/role.routes')(app);
require('./routes/sector.routes')(app);
require('./routes/tenderType.routes')(app);
require('./routes/tenderCategory.routes')(app);
require('./routes/tenderBid.routes')(app);
require('./routes/tenderDocument.routes')(app);
require('./routes/business.routes')(app);
require('./routes/businessDirector.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
