const handleGetStation = (req, res) => {
  try {
    return res.status(200).json({
      EM: "Get All stations",
      DT: [],
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

module.exports = {
  handleGetStation,
};
