const db = require("../models");
const TenderCategory = db.tenderCategory;

exports.createTenderCategory = (req, res) => {
  // Save doc type to Database
  TenderCategory.create({
    name: req.body.name,
    description: req.body.description
  })
    .then((tenderCategory) => {
        res.send({ message: "Tender Category was created successfully!", "tender category": tenderCategory });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllTenderCategories = (req, res) => {
    return TenderCategory.findAll().then((tenderCategory) => {
    return res.status(200).send({tenderCategory});
})
.catch((err) => {
    console.log(">> Error while loading  tender categories: ", err);
    res.status(500).send({ message: err.message });
    });;
};