const express = require("express");
const {
  handleLogin,
  handleRegister,
  handleActivateAccount,
  handleLogout,
} = require("../controllers/auth.controller");
const { handleGetStation } = require("../controllers/stations.controller");
const { isAuth, checkPermission } = require("../middleware/auth.middleware");
const emailApi = require("./email.router");
const stationApi = require("./station.router");
const tripApi = require("./trip.router");
const upLoadFileAPI = require("./upLoadFile.router");
const userApi = require("./user.router");
const router = express.Router();

const initApiRoutes = (app) => {
  router.all("*", isAuth, checkPermission);

  router.get("/", handleGetStation);
  router.post("/login", handleLogin);
  router.post("/register", handleRegister);
  router.post("/activate-account", handleActivateAccount);
  router.post("/logout", handleLogout);

  userApi(router);
  emailApi(router);
  upLoadFileAPI(router);
  stationApi(router);
  tripApi(router);

  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
