const controller = require("../controllers/tenderType.controller");
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
    "/api/tender/types",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createTenderType
  );

  app.get("/api/tender_types", controller.getAllTenderTypes);
};