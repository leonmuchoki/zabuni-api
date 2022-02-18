const db = require("../models");
const config = require("../config/auth.config");
const Company = db.company;
const Sector = db.sector;
const Op = db.Sequelize.Op;

exports.createCompany = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body));
  // Save User to Database
  Company.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    website: req.body.website,
    phone: req.body.phone,
    address: req.body.address,
    sectorId: req.body.sectorId
  })
    .then(company => {
      /* if (req.body.sectors) {
        Sector.findAll({
          where: {
            name: {
              [Op.or]: req.body.sectors
            }
          }
        }).then(sectors => {
            company.setSectors(sectors).then(() => {
            res.send({ message: "Company was registered successfully!" });
          });
        });
      } else {
        // user sector = 1
        company.setSectors([1]).then(() => {
          res.send({ message: "Company was registered successfully!" });
        });
      } */
      res.send({ message: "Company was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findCompanyByName = (req, res) => {
  Company.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(company => {
      if (!company) {
        return res.status(404).send({ message: "Company Not found." });
      }
      
      var tenders = [];
      company.getTenders().then(tenders => {
        for (let i = 0; i < tenders.length; i++) {
          tenders.push("TENDER: " + tenders[i].name.toUpperCase());
        }
        res.status(200).send({
          id: company.id,
          name: company.name,
          description: company.description,
          website: company.website,
          location: company.location,
          address: company.address,
          tenders: tenders
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllCompanies = (req, res) => {
    return Company.findAll({
      include: ["tenders"],
    }).then((companies) => {
        return res.status(200).send({companies: companies});
    })
    .catch((err) => {
        console.log(">> Error while finding comment: ", err);
        res.status(500).send({ message: err.message });
      });;
  };

  exports.findCompanyById = (req, res) => {
    return Company.findByPk({where: {id:  req.params.id}}, { include: ["tenders"] })
      .then((company) => {
        return res.status(200).send({company: company});
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
        res.status(500).send({ message: err.message });
      });
  };

  exports.verifyCompany = (req, res) => {
    Company.findOne({where: {id: req.params.companyId }})
        .then(company => {
        if (!company) {
            throw new Error('No record found')
        }
        
        console.log(`retrieved record ${JSON.stringify(record,null,2)}`) 
        
        let values = { verified : true};
        return company.update(values).then( updatedRecord => {
            console.log(`updated record ${JSON.stringify(updatedRecord,null,2)}`)
            return res.send({ message: "Company was verified successfully!" });
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