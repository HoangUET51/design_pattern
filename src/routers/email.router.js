const {
  handleForgetPassword,
  handleResetPassword,
} = require("../controllers/email.controller");

const emailApi = (router) => {
  router.post("/forget-password", handleForgetPassword);
  router.get("/reset-password", handleResetPassword);
};

module.exports = emailApi;
