const controller = require("../controllers/businessDirector.controller");
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
    "/api/business/directors",
    [authJwt.verifyToken, authJwt.isSupplier],
    controller.createBusinessDirector
  );

  app.get("/api/business/directors/:businessId", controller.findBusinessDirectors);
};