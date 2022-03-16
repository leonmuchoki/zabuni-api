const controller = require("../controllers/role.controller");
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
    "/api/roles",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createRole
  );
  
  //TODO: ensure is admin
  app.get("/api/roles",  controller.getAllRoles);
};