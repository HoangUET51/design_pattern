const {
  userLogin,
  userRegister,
  activateAccount,
} = require("../services/auth.service");
const { destroyToken } = require("../services/jwt.service");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userLogin(email, password);

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

const handleRegister = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const data = await userRegister(name, phone, email, password);

    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

const handleActivateAccount = async (req, res) => {
  try {
    const data = await activateAccount(req.body.token);
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

const handleLogout = (req, res) => {
  try {
    destroyToken(req.token);
    return res.status(200).json({
      EM: "logout user successfully",
      DT: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      DT: [],
    });
  }
};

module.exports = {
  handleLogin,
  handleRegister,
  handleActivateAccount,
  handleLogout,
};
