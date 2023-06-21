const {
  createUser,
  getAllUser,
  getUserDetail,
  updateUser,
  deleteUser,
} = require("../services/user.service");

const handleCreateUser = async (req, res) => {
  try {
    let { name, phone, email, type, password } = req.body;
    const data = await createUser(name, phone, email, type, password);
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

const handleGetAllUser = async (req, res) => {
  try {
    const data = await getAllUser();
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

const handleGetUserDetail = async (req, res) => {
  try {
    const data = await getUserDetail(req.params.id);
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

const handleUpdateUser = async (req, res) => {
  try {
    const { name, phone, type, password } = req.body;
    const data = await updateUser(req.params.id, name, phone, type, password);
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

const handleDeleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await deleteUser(req.params.id);
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
  handleCreateUser,
  handleGetAllUser,
  handleGetUserDetail,
  handleUpdateUser,
  handleDeleteUser,
};
