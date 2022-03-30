const controller = require("../controllers/businessDocument.controller");
const { authJwt } = require("../middleware");
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post(
    "/api/business/documents",
    [authJwt.verifyToken, authJwt.isSupplier, uploadStrategy],
    controller.createBusinessDocument
  );

  app.get("/api/business/documents/:businessId", controller.findBusinessDocuments);
};