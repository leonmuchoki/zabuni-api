const db = require("../models");
const Document = db.documents;
const DocumentType = db.documentTypes;
const Op = db.Sequelize.Op;

exports.createDocument = (req, res) => {
  // Save doc type to Database
  Document.create({
    name: req.body.name,
    description: req.body.description,
    extension: req.body.extension,
    fileSize: req.body.fileSize,
    file: req.body.file,
    userId: req.body.userId
  })
    .then((document) => {
        if (req.body.documentTypes) {
            DocumentType.findAll({
              where: {
                name: {
                  [Op.or]: req.body.documentTypes
                }
              }
            }).then(documentTypes => {
                document.setDocumentTypes(documentTypes).then(() => {
                res.send({ message: "Document was created successfully!" });
              });
            });
          } else {
            // user sector = 1
            document.setDocumentTypes([1]).then(() => {
              res.send({ message: "Document was created successfully!" });
            });
          }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllDocuments = (req, res) => {
    return Document.findAll().then((docs) => {
    return res.status(200).send({docs});
})
.catch((err) => {
    console.log(">> Error while loading  document: ", err);
    res.status(500).send({ message: err.message });
    });
};

exports.findUserDocuments = (req, res) => {
    return Document.findAll({
            where: {
                userId: req.params.userId 
            }
        })
        .then((docs) => {
            return res.status(200).send({docs});
        })
        .catch((err) => {
            console.log(">> Error while finding user document: ", err);
            res.status(500).send({ message: err.message });
        });
};