const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  console.log("is ca or admin " + req.userId)
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isStaff = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "staff") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Staff Role!"
      });
      return;
    });
  });
};

isContractingAuthority = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "contracting authority") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require contracting authority Role!"
      });
      return;
    });
  });
};

isSupplier = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "supplier") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Supplier Role!"
      });
    });
  });
};
isBusiness = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "business") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Require Business Role!"
        });
      });
    });
  };
isContractingAuthorityOrAdmin = (req, res, next) => {
  console.log("is ca or admin " + req.userId)
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "contracting authority") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Contracting Authority or Admin Role!"
      });
    });
  });
};

isContractingAuthorityAdminOrSysAdmin = (req, res, next) => {
  console.log("is ca or admin " + req.userId)
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "contracting authority" && user.isAdmin) {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Contracting Authority or Admin Role!"
      });
    });
  });
};

isStaffOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "staff") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Contracting Authority or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin,
  isContractingAuthorityOrAdmin,
  isContractingAuthorityAdminOrSysAdmin,
  isBusiness,
  isSupplier,
  isStaffOrAdmin,
  isStaff,
  isContractingAuthority
};
module.exports = authJwt;