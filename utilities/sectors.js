const db = require("../models");
const Sector = db.sector;
// ["PUBLIC", "PRIVATE", "NGO","INSTITUTION","PARASTATAL", "CHURCH", "SACCO"];
exports.createInitialSectors = () => {
    Sector.create({
        name: "PUBLIC",
        description: "public entity"
    });
    Sector.create({
        name: "PRIVATE"
    });
    Sector.create({
        name: "NGO"
    });
    Sector.create({
        name: "INSTITUTION"
    });
    Sector.create({
        name: "PARASTATAL"
    });
    Sector.create({
        name: "CHURCH"
    });
    Sector.create({
        name: "SACCO"
    });
  };