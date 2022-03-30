const controller = require("../controllers/tenderBidDocument.controller");
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
    "/api/tender/bid/documents",
    [authJwt.verifyToken, authJwt.isContractingAuthorityOrAdmin, uploadStrategy],
    controller.createTenderBidDocument
  );

  app.get("/api/tender/bid/documents/:tenderBidId", controller.findTenderBidDocuments);
};