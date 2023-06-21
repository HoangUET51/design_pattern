const {
  createTrip,
  getAllTrip,
  updateTrip,
  deleteTrip,
  getAllTripWithUser,
  getTripWithUser,
  getPassengerCarByTrip,
} = require("../services/trip.service");

const handleCreateTrip = async (req, res) => {
  try {
    const { fromStation, toStation, startTime, price } = req.body;
    const data = await createTrip(fromStation, toStation, startTime, price);
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleGetAllTrip = async (req, res) => {
  try {
    const data = await getAllTrip();
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleUpdateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { fromStation, toStation, startTime, price } = req.body;
    const data = await updateTrip(id, fromStation, toStation, startTime, price);
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleDeleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTrip(id);
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleGetTripWithUser = async (req, res) => {
  try {
    const data = await getAllTripWithUser();
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleTripWithUser = async (req, res) => {
  try {
    const data = await getTripWithUser(req.params.id);
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleGetPassengerCarByTrip = async (req, res) => {
  try {
    const { fromStation, toStation } = req.body;
    const data = await getPassengerCarByTrip(fromStation, toStation);
    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

module.exports = {
  handleCreateTrip,
  handleGetAllTrip,
  handleUpdateTrip,
  handleDeleteTrip,
  handleGetTripWithUser,
  handleTripWithUser,
  handleGetPassengerCarByTrip,
};
