const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { sendEmail } = require("../utilities/sendEmail")

exports.signup = (req, res) => {
    console.log("req.body" + JSON.stringify(req.body));
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            const emailText = `Thank you for registering. Login to complete your business profile.`;
            sendEmail(req.body.email, "muchokileon@gmail.com", "ACCOUNT CREATED", emailText);
            res.send({ message: "User was registered successfully!", user });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!", user });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.CreateContractingAuthority = (req, res) => {
  console.log("req.body" + JSON.stringify(req.body));
  // check company id exists before creating CA user
  let company = Company.findByPk({where: {id:  req.body.companyId}});
  if(!company) return res.status(500).send({ message: "Company ID does not exist." });

  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    companyId: req.body.companyId
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!", user });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!", user });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signUpSupplier = (req, res) => {
  console.log("req.body" + JSON.stringify(req.body));
// Save User to Database
User.create({
  businessname: req.body.businessname,
  email: req.body.email,
  password: bcrypt.hashSync(req.body.password, 8)
})
  .then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          businessname: user.businessname,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};