const {
  createStation,
  getAllStation,
  updateStation,
  deleteStation,
} = require("../services/station.service");

const handleCreateStation = async (req, res) => {
  try {
    const { name, address, province } = req.body;
    const data = await createStation(name, address, province);
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

const handleGetAllStation = async (req, res) => {
  try {
    const data = await getAllStation();
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

const handleUpdateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, province } = req.body;
    const data = await updateStation(id, name, address, province);
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

const handleDeleteStation = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteStation(id);
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
  handleCreateStation,
  handleGetAllStation,
  handleUpdateStation,
  handleDeleteStation,
};
