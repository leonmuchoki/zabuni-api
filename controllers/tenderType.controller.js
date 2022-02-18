const db = require("../models");
const TenderType = db.tenderType;

exports.createTenderType = (req, res) => {
  // Save doc type to Database
  TenderType.create({
    name: req.body.name,
    description: req.body.description
  })
    .then((tenderType) => {
        res.send({ message: "Tender Type was created successfully!", tenderType: tenderType });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllTenderTypes = (req, res) => {
    return TenderType.findAll().then((tenderTypes) => {
    return res.status(200).send({tenderTypes});
})
.catch((err) => {
    console.log(">> Error while loading  document types: ", err);
    res.status(500).send({ message: err.message });
    });;
};