const db = require("../models");
const Business = db.business;
const { sendEmail } = require("../utilities/sendEmail")

exports.createBusiness = (req, res) => {
  //TODO: check user does not have another business
  Business.findOne({where: {userId:  req.body.userId}}).then((bus) => {
    if(bus) {
      console.log("business exists " + JSON.stringify(bus));
      return res.status(400).send("User already has an existing business.");
    } else {
      Business.create({
        name: req.body.name,
        registration_number: req.body.name,
        pin_number: req.body.pin_number,
        description: req.body.description,
        location: req.body.location,
        phone: req.body.phone,
        address: req.body.address,
        userId: req.body.userId,
        isContractingAuthority: req.body.isContractingAuthority,
        sectorId: req.body.sectorId
      })
        .then(business => {
          const emailText = `Business ${req.body.name} has been registered successfully. The Zabuni team will verify your details. Thank you`;
          const emailTextHTML = `Business <strong>${req.body.name}</strong> has been registered successfully! <br /> <p>The Zabuni team will verify your details.</p> <br/> <p>Thank you</p>`;
          sendEmail(req.body.email, "muchokileon@gmail.com", "BUSINESS REGISTRATION", emailText, emailTextHTML);
          res.send({ message: "Company was registered successfully!", business });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  });


};

exports.findBusinessById = (req, res) => {
    return Business.findOne({where: {id:  req.params.id}}, { include: ["sector", "businessDirectors"] })
      .then((business) => {
        return res.status(200).send({business});
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
        res.status(500).send({ message: err.message });
      });
  };

  exports.findSupplierBusiness = (req, res) => {
    return Business.findOne({where: {userId:  req.params.userId, isContractingAuthority: false}})
      .then((business) => {
        return res.status(200).send({business});
      })
      .catch((err) => {
        console.log(">> Error while finding business: ", err);
        res.status(500).send({ message: err.message });
      });
  };

  exports.getAllBusinesses = (req, res) => {
    return Business.findAll({
        include: ["sector", "businessDirectors"],
  }).then((businesses) => {
      return res.status(200).send({businesses});
  })
  .catch((err) => {
      console.log(">> Error while loading  businesses: ", err);
      res.status(500).send({ message: err.message });
      });;
  };

  exports.verifyBusiness = (req, res) => {
    Business.findOne({where: {id: req.params.businessId }})
        .then(bus => {
        if (!bus) {
            throw new Error('No record found')
        }
        
        let values = { verified : true};
        return bus.update(values).then( updatedRecord => {
            console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`);

            const emailText = `Congratulations. Your business details have been verified.`;
            const emailTextHTML = `Business verified! <br /> <p>Business details:</p> 
            <ul>
              <ol>Business name: ${bus.name}</ol>
              <ol>Registration number: ${bus.registration_number}</ol>
              <ol>KRA PIN Number: ${bus.pin_number}</ol>
            </ul>
            <br/> <p>Thank you</p>`;
            sendEmail(req.body.email, "muchokileon@gmail.com", "ACCOUNT CREATED", emailText, emailTextHTML);

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