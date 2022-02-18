//https://www.taniarascia.com/node-express-postgresql-heroku/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createInitialRoles } = require("./utilities/Roles");
const { createInitialSectors } = require("./utilities/sectors");

const app = express();
var corsOptions = {
  origin: "https://zabunike.herokuapp.com"//"http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
//db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  //initial();
  createInitialRoles();
  createInitialSectors();
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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
