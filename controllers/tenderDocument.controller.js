const db = require("../models");
const TenderDocument = db.tenderDocument;

const { uploadDocumentToAzure, getBlobSasUrl } = require("../utilities/uploadDocAzure")

exports.createTenderDocument = async(req, res) => {
  if (!req.file) {
    return res.status(400).send("No file received.");
  }
  if(!req.body.tenderId) return res.status(400).send("Please add tender id.");

  const result = await uploadDocumentToAzure(req.file.originalname,req.file.buffer);
  if(result.upload_status) {
    TenderDocument.create({
      name: req.file.originalname,
      blobName: result.blobName,
      extension: req.file.mimetype,
      fileSize: req.file.size,
      tenderId: req.body.tenderId
    })
      .then((tenderDoc) => {
          res.send({ message: "Tender Document was created successfully!", "tender document": tenderDoc });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
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

exports.getTenderDocumentUrl = (req, res) => {
  return TenderDocument.findOne({where: {tenderId: req.params.tenderId}}).then((tenderDoc) => {
    if(tenderDoc) {
      const blobUrl = getBlobSasUrl(tenderDoc.blobName);
      console.log("blobUrl " + blobUrl);
      return res.status(200).send({blobUrl: blobUrl, tenderDoc});
    } else {
      return res.status(400).send({message: "document not found"});
    }
})
.catch((err) => {
  console.log(">> Error while getting document ", err);
  res.status(400).send({ message: err.message });
  });
};