const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { isContractingAuthorityOrAdmin } = require("../middleware/authJwt");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user", [authJwt.verifyToken, authJwt.isContractingAuthorityOrAdmin], controller.addUser);
  app.get("/api/users/:businessId",[authJwt.verifyToken], controller.findBusinessUsers);
  app.post("/api/user/delete/:userId",[authJwt.verifyToken, isContractingAuthorityAdminOrSysAdmin], controller.deleteUser);
  app.post("/api/user/reset/:userId",[authJwt.verifyToken, isContractingAuthorityAdminOrSysAdmin], controller.resetUserPassword);

  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  /* app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  ); */
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  //TODO: should only admin pull data
  app.get("/api/user/:userId",[authJwt.verifyToken], controller.findUserById);
};