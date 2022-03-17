const db = require("../models");
const Document = db.businessDocument;

exports.createBusinessDocument = (req, res) => {
  // Save doc type to Database
  Document.create({
    name: req.body.name,
    description: req.body.description,
    extension: req.body.extension,
    fileSize: req.body.fileSize,
    file: req.body.file,
    businessId: req.body.businessId
  })
    .then((document) => {
        res.send({ message: "Document was created successfully!", document });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findBusinessDocuments = (req, res) => {
    return Document.findAll({
            where: {
                businessId: req.params.businessId 
            }
        })
        .then((docs) => {
            return res.status(200).send({docs});
        })
        .catch((err) => {
            console.log(">> Error while finding business document: ", err);
            res.status(500).send({ message: err.message });
        });
};