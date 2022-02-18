const controller = require("../controllers/company.controller");
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
    "/api/company",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createCompany
  );

  app.get("/api/companies", controller.findAllCompanies);
  app.get("/api/company/verify/:companyId", controller.verifyCompany);
};