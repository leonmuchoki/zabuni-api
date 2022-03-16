const db = require("../models");
const TenderDocument = db.tenderDocument;

exports.createTenderDocument = (req, res) => {
  TenderDocument.create({
    name: req.body.name,
    description: req.body.description,
    tenderId: req.body.tenderId
  })
    .then((tenderDoc) => {
        res.send({ message: "Tender Document was created successfully!", "tender document": tenderDoc });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllTenderDocuments = (req, res) => {
    return TenderDocument.findAll().then((tenderDocuments) => {
    return res.status(200).send({tenderDocuments});
})
.catch((err) => {
    console.log(">> Error while loading  tender categories: ", err);
    res.status(500).send({ message: err.message });
    });;
};