const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { sendEmail } = require("../utilities/sendEmail")

/*
admin can use this endpoint to add staff for contracting authority 
just need to pass role as contracting authority
*/
exports.addUser = async(req, res) => {
  const userData = await User.findOne({where: {email: req.body.email}});
  if (userData) {
    res.status(400).send({message: "User already exists"});
    return;
  }
  const randomPassword = Math.random().toString(36).slice(-8);
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(randomPassword, 8),
    companyId: req.body.companyId, //contracting authority business id
    isAdmin: req.body.hasOwnProperty('isAdmin') ? req.body.isAdmin : false,
    username: req.body.hasOwnProperty('username') ? req.body.username : '',
    mobile: req.body.hasOwnProperty('mobile') ? req.body.mobile : ''
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
            const emailTextHTML = `<p>Hello,</p><br/> <p>Account created.</p> <br /> <p>Email: <em>${user.email}</em></p> <br/> <p>Password: <strong>${randomPassword}</strong></p><br/><p>Thank You.</p><br/><br/><p><em>Please do not share password with anyone. In case of any queries contact Zabuni team.</em></p>`;
            sendEmail(req.body.email, "muchokileon@gmail.com", "ACCOUNT CREATED", emailText,emailTextHTML);
            res.send({ message: "User was registered successfully!", user });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          const emailText = `Hello. Your account has been created. Email: ${user.email} Password: ${req.body.password}`;
          const emailTextHTML = `<p>Hello,</p><br/> <p>Account created.</p> <br /> <p>Email: <em>${user.email}</em></p> <br/> <p>Password: <strong>${randomPassword}</strong></p><br/><p>Thank You.</p><br/><br/><p><em>Please do not share password with anyone. In case of any queries contact Zabuni team.</em></p>`;
          sendEmail(req.body.email, "muchokileon@gmail.com", "ACCOUNT CREATED", emailText,emailTextHTML);
          res.send({ message: "User was registered successfully!", user });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findUserById = (req, res) => {
  return User.findOne({where: {id:  req.params.userId}}, {include: ["business"]})
    .then((user) => {
      return res.status(200).send({user});
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err);
      res.status(500).send({ message: err.message });
    });
};

exports.findBusinessUsers = (req, res) => {
  return User.findAll({where: {companyId:  req.params.businessId}})
    .then((users) => {
      return res.status(200).send({users});
    })
    .catch((err) => {
      console.log(">> Error while getting business users ", err);
      res.status(500).send({ message: err.message });
    });
};

exports.resetUserPassword = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const userUpdated = await User.update(
        { password: bcrypt.hashSync(randomPassword, 8) },
        { where: { id: req.params.userId } }
      );
      if(userUpdated) {
        const emailText = `Hello. Your account password has been reset. Email: ${userData.email} Password: ${randomPassword}`;
        const emailTextHTML = `<p>Hello,</p><br/> <p>Your Account Password has been reset successfully.</p> <br /> <p>Email: <em>${userData.email}</em></p> <br/> <p>New Password: <strong>${randomPassword}</strong></p><br/><p>Thank You.</p><br/><br/><p><em>Please do not share password with anyone. In case of any queries contact Zabuni team.</em></p>`;
        sendEmail(req.body.email, "muchokileon@gmail.com", "ACCOUNT PASSWORD RESET", emailText,emailTextHTML);
        res.send({ message: "User Password reset successfully!", userData });
      }
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};

exports.deleteUser = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const userUpdated = await User.update(
        { deleted: true},
        { where: { id: req.params.userId } }
      );
      if(userUpdated) {
        res.send({ message: "User deactivated successfully!", userData });
      } else {
        res.status(400).send({ message: "Unable to delete user", userData });
      }
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};

exports.setLastLogin = async(req, res) => {
  try {
    const userData = await User.findOne({where: {id:  req.params.userId}});
    if(userData) {
      const userUpdated = await User.update(
        { lastLogin: new Date()},
        { where: { id: req.params.userId } }
      );
      if(userUpdated) {
        res.send({ message: "User login updated successfully!", userData });
      } else {
        res.status(400).send({ message: "Unable to update user data", userData });
      }
    } else {
      res.status(400).send({ message: "User not found", userData });
    }
  } catch(err) {
    res.status(400).send({ message: err });
  }
};

/*
TODO:
Get contracting authority staff
*/



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