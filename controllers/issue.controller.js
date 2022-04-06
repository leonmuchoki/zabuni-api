const db = require("../models");
const Issue = db.issue;
const User = db.user;
const { sendEmail } = require("../utilities/sendEmail")

exports.createIssue = (req, res) => {
    Issue.create({
        description: req.body.description,
        userId: req.body.userId
      })
        .then(issue => {
          try {
            User.findByPk(req.userId).then((user) => {
              const emailText = `Hello, Issue has been reported successfully. The Zabuni team will look into it. Thank you`;
              const emailTextHTML = `<p>Hello,</p><br/> <p>Issue, number <strong>${issue.id}</strong> has been reported successfully!</p> <br /> <p>The Zabuni team is looking into it.</p> <br/> <p>Thank you</p>`;
              sendEmail(user.email, "muchokileon@gmail.com", "ISSUE RAISED", emailText, emailTextHTML);
            })
          }
          catch(ex) {}
          res.send({ message: "Issue posted successfully!", issue });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};

exports.findIssueById = (req, res) => {
    return Issue.findOne({where: {id:  req.params.id}}, { include: ["user"] })
      .then((issue) => {
        return res.status(200).send({issue});
      })
      .catch((err) => {
        console.log(">> Error while finding comment: ", err);
        res.status(500).send({ message: err.message });
      });
  };

  exports.getAllIssues = (req, res) => {
    return Issue.findAll({
        include: ["user"],
  }).then((issues) => {
      return res.status(200).send({issues});
  })
  .catch((err) => {
      console.log(">> Error while loading  issues: ", err);
      res.status(500).send({ message: err.message });
      });;
  };
