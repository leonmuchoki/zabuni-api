const controller = require("../controllers/tenderCategory.controller");
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
    "/api/tender_categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createTenderCategory
  );

  app.get("/api/tender_categories", controller.getAllTenderCategories);
  app.delete("/api/tender_categories/:id", controller.deleteTenderCategory);
};