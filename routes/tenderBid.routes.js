const controller = require("../controllers/tenderBid.controller");
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
    "/api/tender/bid",
    [authJwt.verifyToken, authJwt.isSupplier],
    controller.createTenderBid
  );
  
  app.get("/api/tender/bid/:tenderId",[authJwt.verifyToken], controller.findBidByTenderId);
  app.get("/api/bid/:id", [authJwt.verifyToken], controller.findTenderBidById);
  app.get("/api/business/bid/:businessId", [authJwt.verifyToken], controller.findBidByBusinessId);
};