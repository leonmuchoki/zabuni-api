const controller = require("../controllers/document.controller");
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
    "/api/documents",
    [authJwt.verifyToken],
    controller.createDocument
  );

  app.get("/api/documents", controller.getAllDocuments);
  app.get("/api/documents/:userId", controller.findUserDocuments);
};