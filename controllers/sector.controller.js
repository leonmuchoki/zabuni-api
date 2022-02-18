const db = require("../models");
const Sector = db.sector;

exports.createSector = (req, res) => {
    Sector.create({
        name: req.body.name,
        description: req.body.description
      }).then(sector => {
        res.send({ message: "Sector was registered successfully!", sector: sector });
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getAllSectors = (req, res) => {
    return Sector.findAll().then((sector) => {
        return res.status(200).send({sector});
})
.catch((err) => {
    console.log(">> Error while loading  tenders: ", err);
    res.status(500).send({ message: err.message });
    });;
};