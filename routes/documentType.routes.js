const controller = require("../controllers/documentType.controller");
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
    "/api/document/types",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createDocumentType
  );

  app.get("/api/document/types", controller.getAllDocumentTypes);
};