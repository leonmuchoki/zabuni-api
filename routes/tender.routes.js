const controller = require("../controllers/tender.controller");
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
    "/api/tenders",
    [authJwt.verifyToken, authJwt.isContractingAuthorityOrAdmin],
    controller.createTender
  );
  
  app.get("/api/tenders", controller.getAllTenders);
  app.post("/api/tender/views/:tenderId", controller.updateViews);
};