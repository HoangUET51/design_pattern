const {
  handleCreateUser,
  handleGetAllUser,
  handleGetUserDetail,
  handleUpdateUser,
  handleDeleteUser,
} = require("../controllers/user.controller");

const userApi = (router) => {
  router.get("/user", handleGetAllUser);
  router.get("/user/:id", handleGetUserDetail);
  router.post("/user", handleCreateUser);
  router.put("/user/:id", handleUpdateUser);
  router.delete("/user/:id", handleDeleteUser);
};

module.exports = userApi;
