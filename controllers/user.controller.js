const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { sendEmail } = require("../utilities/sendEmail")

/*
admin can use this endpoint to add staff for contracting authority 
just need to pass role as contracting authority
*/
exports.addUser = () => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    companyId: req.body.companyId //contracting authority business id
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
            const emailText = `Hello. Your account has been created. Email: ${user.email} Password: ${req.body.password}`;
            const emailTextHTML = `<p>Hello,</p><br/> <p>Account created.</p> <br /> <p>Email: <em>${user.email}</em></p> <br/> <p>Password: <strong>${req.body.password}</strong></p><br/><p>Thank You.</p><br/><br/><p><em>Please do not share password with anyone. In case of any queries contact Zabuni team.</em></p>`;
            sendEmail(req.body.email, "muchokileon@gmail.com", "ACCOUNT CREATED", emailText,emailTextHTML);
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

exports.findUserById = (req, res) => {
  return User.findOne(req.params.userId, {include: ["business"]})
    .then((user) => {
      return res.status(200).send({user});
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
      res.status(500).send({ message: err.message });
    });
};



exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};