const db = require("../models");
const Business = db.business;
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const { sendEmail } = require("../utilities/sendEmail");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createBusiness = (req, res) => {
  //TODO: check user does not have another business
  Business.findOne({where: {userId:  req.body.userId}}).then((bus) => {
    if(bus) {
      console.log("business exists " + JSON.stringify(bus));
      return res.status(400).send("User already has an existing business.");
    } else {
      Business.create({
        name: req.body.name,
        registration_number: req.body.registration_number,
        pin_number: req.body.pin_number,
        description: req.body.description,
        location: req.body.location,
        phone: req.body.phone,
        address: req.body.address,
        userId: req.body.userId,
        isContractingAuthority: req.body.hasOwnProperty('isContractingAuthority') ? req.body.isContractingAuthority : false,
        sectorId: req.body.sectorId
      })
        .then(business => {
          try {
            User.findByPk(req.userId).then((user) => {
              const emailText = `Business ${req.body.name} has been registered successfully. The Zabuni team will verify your details. Thank you`;
              const emailTextHTML = `<p>Hello,</p><br/> <p>Business <strong>${req.body.name}</strong> has been registered successfully!</p> <br /> <p>The Zabuni team will verify your business details.</p> <br/> <p>Thank you</p>`;
              sendEmail(user.email, "muchokileon@gmail.com", "BUSINESS REGISTRATION", emailText, emailTextHTML);
            })
          }
          catch(ex) {}
          res.send({ message: "Company was registered successfully!", business });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  });
};

exports.createContractingAuthorityBusiness = async(req, res) => {
  /*
  -creating by admin
  -auto create account
  -auto create password
  -send email with login details
  */
  const userData = await User.findOne({where: {email:  req.body.email}});
  if(userData) {
    console.log("userData  " + JSON.stringify(userData));
    res.status(400).send({ message: "Organization email already registered to another business/organization" });
    return;
  }
  const randomPassword = Math.random().toString(36).slice(-8);
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(randomPassword, 8)
  })
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then((roles) => {
        user.setRoles(roles);
      });
    } else {
      // user role = 1
      user.setRoles([1]);
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
    return;
  })
  .then((user) => {
    console.log("user.....<<< " + JSON.stringify(user));
    Business.create({
      name: req.body.name,
      registration_number: req.body.name,//TODO
      pin_number: req.body.name,//TODO
      description: req.body.description,
      location: req.body.location,
      phone: req.body.phone,
      address: req.body.address,
      userId: user.id,
      isContractingAuthority: req.body.hasOwnProperty('isContractingAuthority') ? req.body.isContractingAuthority : true,
      sectorId: req.body.sectorId
    })
      .then(business => {
        try {
          console.log("req.userid " + req.userId);
          User.findByPk(req.userId).then((user) => {
            const emailText = `Business ${req.body.name} has been registered successfully. Thank you`;
            const emailTextHTML = `<p>Hello,</p><br/> <p>Organization <strong>${req.body.name}</strong> has been registered in Zabuni successfully!</p> <br /> <p>Organization login details:</p> <p>Organization Email: <em>${req.body.email}</em></p><p>Password: <em>${randomPassword}</em></p> <br/> <p>Thank you</p>`;
            sendEmail(req.body.email, "muchokileon@gmail.com", "Contracting Authority REGISTRATION", emailText, emailTextHTML);
          });
        }
        catch(ex) {
          console.error(ex);
        }
        res.send({ message: "Company was registered successfully!", business });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  })
  .catch((err) => res.status(400).send({message: "error creating user account " + err.message}));
};

exports.updateBusiness = (req, res) => {
  //TODO: check user does not have another business
  Business.findByPk(req.params.id).then((bus) => {
    if(bus) {
      let updatedValues = {
        name: req.body.hasOwnProperty('name') ? req.body.name : bus.name,
        registration_number: req.body.hasOwnProperty('registration_number') ? req.body.registration_number : bus.registration_number,
        pin_number: req.body.hasOwnProperty('pin_number') ? req.body.pin_number : bus.pin_number,
        description: req.body.hasOwnProperty('description') ? req.body.description : bus.description,
        location: req.body.hasOwnProperty('location') ?  req.body.location : bus.location,
        phone: req.body.hasOwnProperty('phone') ?  req.body.phone : bus.phone,
        address: req.body.hasOwnProperty('address') ?  req.body.address : bus.address,
        userId: req.body.hasOwnProperty('userId') ?  req.body.userId : bus.userId,
        isContractingAuthority: req.body.hasOwnProperty('isContractingAuthority') ?  req.body.isContractingAuthority : bus.isContractingAuthority,
        sectorId: req.body.hasOwnProperty('sectorId') ?  req.body.sectorId : bus.sectorId
      }
      return bus.update(updatedValues).then((updatedRecord) => {
        try {
          User.findByPk(req.userId).then((user) => {
            const emailText = `Hello. Your business details have been udpated.`;
            const emailTextHTML = `<p>Hello,</p><br/>Your business details have been <strong><span style="green">updated</span>!</strong> <br /> <p>Business details:</p> 
            <ul>
              <ol>Business name: <em>${updatedRecord.name}</em></ol>
              <ol>Registration number:<em>${updatedRecord.registration_number}</em></ol>
              <ol>KRA PIN Number: <em>${updatedRecord.pin_number}</em></ol>
              <ol>location: <em>${updatedRecord.location}</em></ol>
              <ol>phone: <em>${updatedRecord.phone}</em></ol>
              <ol>address: <em>${updatedRecord.address}</em></ol>
            </ul>
            <br/> <p>Thank you</p>`;
            sendEmail(user.email, "muchokileon@gmail.com", "BUSINESS VERIFIED", emailText, emailTextHTML);
          })
        }
        catch(ex) {}
        return res.status(200).send({ message: "Business Details  updated successfully!", bussiness: updatedRecord });
      })
    } else {
      return  res.status(400).send({ message: "business not found" });
    }
  }).catch((err) => res.status(500).send({ message: err.message }));
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
            try {
              User.findByPk(req.userId).then((user) => {
                const emailText = `Congratulations. Your business details have been verified.`;
                const emailTextHTML = `<p>Hello,</p><br/>Your business has been <strong><span style="green">verified</span>!</strong> <br /> <p>Business details:</p> 
                <ul>
                  <ol>Business name: <em>${bus.name}</em></ol>
                  <ol>Registration number:<em>${bus.registration_number}</em></ol>
                  <ol>KRA PIN Number: <em>${bus.pin_number}</em></ol>
                </ul>
                <br/> <p>Thank you</p>`;
                sendEmail(user.email, "muchokileon@gmail.com", "BUSINESS VERIFIED", emailText, emailTextHTML);
              })
            }
            catch(ex) {}
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