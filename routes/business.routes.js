const controller = require("../controllers/business.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post(
    "/api/business",
    [authJwt.verifyToken],
    controller.createBusiness
  );

  app.get("/api/business", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllBusinesses);
  app.get("/api/business/:userId",[authJwt.verifyToken], controller.findSupplierBusiness);
  app.get("/api/business/verify/:businessId",[authJwt.verifyToken, authJwt.isAdmin], controller.verifyBusiness);
};