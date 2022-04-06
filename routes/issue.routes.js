const controller = require("../controllers/issue.controller");
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
    "/api/issue",
    [authJwt.verifyToken],
    controller.createIssue
  );

  app.put("/api/issue/:id", [authJwt.verifyToken], controller.findIssueById);
  app.get("/api/issue", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllIssues);
};