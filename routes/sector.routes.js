const controller = require("../controllers/sector.controller");
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
    "/api/sectors",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createSector
  );
  
  app.get("/api/sectors", controller.getAllSectors);
};