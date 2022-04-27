const controller = require("../controllers/supplierProfile.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/supplier/stats", [authJwt.verifyToken, authJwt.isSupplier], controller.getSupplierProfileStats);
  };