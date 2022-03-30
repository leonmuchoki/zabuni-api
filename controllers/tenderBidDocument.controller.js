const db = require("../models");
const Document = db.tenderBidDocument;

const { uploadDocumentToAzure } = require("../utilities/uploadDocAzure")

exports.createTenderBidDocument = async(req, res) => {
  if (!req.file) {
    return res.status(400).send("No file received.");
  }

  if(!req.body.tenderBidId) return res.status(400).send("Please add tender bid id.");

  const result = await uploadDocumentToAzure(req.file.originalname,req.file.buffer);

  console.log("result..." + JSON.stringify(result));
  if(result.upload_status) {
    return Document.create({
      name: req.file.originalname,
      blobName: result.blobName,
      extension: req.file.mimetype,
      fileSize: req.file.size,
      tenderBidId: req.body.tenderBidId
    })
      .then((document) => {
          res.send({ message: "Document was created successfully!", document });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    return res.status(200).send({ message: "Document was uploaded successfully!" });
  } else {
    return res.status(400).send({ message: result.message });
  }

};

exports.findTenderBidDocuments = (req, res) => {
    return Document.findAll({
            where: {
                tenderBidId: req.params.tenderBidId 
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