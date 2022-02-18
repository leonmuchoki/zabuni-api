const db = require("../models");
const Role = db.role;

exports.createInitialRoles = () => {
    Role.create({
        id: 1,
        name: "organization"
    });
    Role.create({
        id: 2,
        name: "supplier"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
  };