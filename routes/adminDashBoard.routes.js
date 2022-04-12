const controller = require("../controllers/adminDashboard.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admin/stats", [authJwt.verifyToken, authJwt.isAdmin], controller.getAdminDashboardStats);
  };