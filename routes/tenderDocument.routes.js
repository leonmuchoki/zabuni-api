const controller = require("../controllers/tenderDocument.controller");
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
    "/api/tender/documents",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createTenderDocument
  );

  app.get("/api/tender/documents", controller.getAllTenderDocuments);
};