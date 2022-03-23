const db = require("../models");
const BusinessDirector = db.businessDirector;

exports.createBusinessDirector = (req, res) => {
  BusinessDirector.create({
    name: req.body.name,
    id_number: req.body.id_number,
    businessId: req.body.businessId
  })
    .then((bussDirector) => {
        res.send({ message: "Business Director was created successfully!", bussDirector });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findBusinessDirectors = (req, res) => {
    return Document.findAll({
            where: {
                businessId: req.params.businessId 
            }
        })
        .then((directors) => {
            return res.status(200).send({directors});
        })
        .catch((err) => {
            console.log(">> Error while finding business directors: ", err);
            res.status(500).send({ message: err.message });
        });
};