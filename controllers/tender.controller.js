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
    sectorId: req.body.sectorId,
    tenderCategoryId: req.body.tenderCategoryId,
    tenderSecurity: req.body.tenderSecurity
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
    return Tender.findByPk({where: {id:  req.params.id}}, { include: ["sector", "tenderCategory","company"] })
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
        include: ["sector", "tenderCategory","company"],
}).then((tenders) => {
    return res.status(200).send({tenders});
})
.catch((err) => {
    console.log(">> Error while loading  tenders: ", err);
    res.status(500).send({ message: err.message });
    });;
};

exports.updateViews = (req, res) => {
  Tender.findOne({where: {id: req.params.tenderId }})
      .then(tender => {
      if (!tender) {
          throw new Error('No record found')
      }
      console.log("tender::updateViews " + JSON.stringify(tender));
      let updated_views = +tender.views + 1;
      let values = { views : updated_views };
      return tender.update(values).then( updatedRecord => {
          return res.send({ message: "Tender views updated successfully!", updatedRecord });
      }).catch((err) => {
          console.log(">> Error while viewing tender: ", err);
          return res.status(500).send({ message: err.message });
        });
      
      })
      .catch((error) => {
      // do seomthing with the error
      return res.status(500).send({ message: err.message });
      })
}