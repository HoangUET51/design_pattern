const {
  handleCreateStation,
  handleGetAllStation,
  handleUpdateStation,
  handleDeleteStation,
} = require("../controllers/station.controller");

const stationApi = (router) => {
  router.post("/station", handleCreateStation);
  router.get("/station", handleGetAllStation);
  router.put("/station/:id", handleUpdateStation);
  router.delete("/station/:id", handleDeleteStation);
};

module.exports = stationApi;
