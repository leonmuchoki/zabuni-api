const controller = require("../controllers/caDashboard.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/ca/stats/:businessId", [authJwt.verifyToken, authJwt.isContractingAuthority], controller.getContractingAuthorityDashboardStats);
  };