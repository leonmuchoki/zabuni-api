const db = require("../models");
const DocumentType = db.documentType;
const Op = db.Sequelize.Op;

exports.createDocumentType = (req, res) => {
  // Save doc type to Database
  DocumentType.create({
    name: req.body.name,
    description: req.body.description
  })
    .then(() => {
        res.send({ message: "DocumentType was created successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllDocumentTypes = (req, res) => {
    return DocumentType.findAll().then((documentTypes) => {
    return res.status(200).send({documentTypes});
})
.catch((err) => {
    console.log(">> Error while loading  document types: ", err);
    res.status(500).send({ message: err.message });
    });;
};