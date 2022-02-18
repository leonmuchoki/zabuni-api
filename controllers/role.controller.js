const db = require("../models");
const Role = db.role;

exports.createRole = (req, res) => {
    Role.create({
        name: req.body.name,
        description: req.body.description
      }).then(role => {
        res.send({ message: "Role was registered successfully!", role: role });
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.getAllRoles = (req, res) => {
    return Role.findAll().then((roles) => {
        return res.status(200).send({roles});
})
.catch((err) => {
    console.log(">> Error while loading  tenders: ", err);
    res.status(500).send({ message: err.message });
    });;
};