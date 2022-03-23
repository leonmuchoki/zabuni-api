const db = require("../models");
const {ROLES} = require("../utilities/Roles");//db.ROLES;
const User = db.user;
checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }
    next();
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;