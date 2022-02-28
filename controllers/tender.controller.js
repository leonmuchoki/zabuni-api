const db = require("../models");
const config = require("../config/auth.config");
const Tender = db.tender;
const Sector = db.sector;
const Op = db.Sequelize.Op;

exports.createTender = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body));
  // Save User to Database
  Tender.create({
    name: req.body.name,
    description: req.body.description,
    closing_date: req.body.closing_date,
    companyId: req.body.companyId,
    sectorId: req.body.sectorId
  })
    .then(tender => {
        res.send({ message: "Tender was registered successfully!", tender: tender });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findTenderByName = (req, res) => {
  Tender.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(tender => {
      if (!tender) {
        return res.status(404).send({ message: "Tender Not found." });
      }
      
      return res.status(200).send(tender);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findTenderById = (req, res) => {
    return Tender.findByPk({where: {id:  req.params.id}}, { include: ["company"] })
      .then((tender) => {
        //return tender;
        return res.status(200).send({tender});
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
        res.status(500).send({ message: err.message });
      });
  };

exports.getAllTenders = (req, res) => {
    return Tender.findAll({
        include: ["sector"],
}).then((tenders) => {
    return res.status(200).send({tenders});
})
.catch((err) => {
    console.log(">> Error while loading  tenders: ", err);
    res.status(500).send({ message: err.message });
    });;
};