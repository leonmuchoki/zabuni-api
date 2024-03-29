const controller = require("../controllers/tenderDocument.controller");
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
    "/api/tender/documents",
    [authJwt.verifyToken, authJwt.isContractingAuthorityOrAdmin, uploadStrategy],
    controller.createTenderDocument
  );

  app.get("/api/tender/documents", controller.getAllTenderDocuments);
  app.get("/api/tender/document/:tenderId", controller.getTenderDocumentUrl);
};