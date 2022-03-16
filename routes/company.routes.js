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
    "/api/companies",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createCompany
  );

  app.get("/api/companies", controller.findAllCompanies);
  //TODO: Add verification and post method
  app.get("/api/company/verify/:companyId",[authJwt.verifyToken, authJwt.isAdmin], controller.verifyCompany);
};