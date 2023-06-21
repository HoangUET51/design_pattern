const {
  handleCreateTrip,
  handleGetAllTrip,
  handleUpdateTrip,
  handleDeleteTrip,
  handleGetTripWithUser,
  handleTripWithUser,
  handleGetPassengerCarByTrip,
} = require("../controllers/trip.controller");

const tripApi = (router) => {
  router.post("/trip", handleCreateTrip);
  router.get("/trip", handleGetAllTrip);
  router.put("/trip/:id", handleUpdateTrip);
  router.delete("/trip/:id", handleDeleteTrip);
  router.get("/trip-with-user", handleGetTripWithUser);
  router.get("/trip-user/:id", handleTripWithUser);
  router.get("/passenger-car-trip", handleGetPassengerCarByTrip);
};

module.exports = tripApi;
