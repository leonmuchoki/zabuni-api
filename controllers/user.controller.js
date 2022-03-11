const db = require("../models");
const User = db.user;

exports.findUserById = (req, res) => {
  return User.findByPk(req.params.userId, {include: ["business"]})
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