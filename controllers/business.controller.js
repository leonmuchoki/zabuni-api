const db = require("../models");
const Business = db.business;

exports.createBusiness = (req, res) => {
  Business.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    phone: req.body.phone,
    address: req.body.address,
    userId: req.body.userId
  })
    .then(business => {
      res.send({ message: "Company was registered successfully!", business });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findBusinessById = (req, res) => {
    return Business.findByPk({where: {id:  req.params.id}})
      .then((business) => {
        return res.status(200).send({business});
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
        res.status(500).send({ message: err.message });
      });
  };

  exports.verifyBusiness = (req, res) => {
    Business.findOne({where: {id: req.params.businessId }})
        .then(bus => {
        if (!bus) {
            throw new Error('No record found')
        }
        
        let values = { verified : true};
        return bus.update(values).then( updatedRecord => {
            console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
            return res.send({ message: "Company was verified successfully!", bussiness: updatedRecord });
        }).catch((err) => {
            console.log(">> Error while verifying company: ", err);
            return res.status(500).send({ message: err.message });
          });
        
        })
        .catch((error) => {
        // do seomthing with the error
        return res.status(500).send({ message: err.message });
        })
  }