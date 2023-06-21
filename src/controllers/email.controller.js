const { forgetPassword, resetPassword } = require("../services/email.service");

const handleForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await forgetPassword(email);

    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      DT: [],
    });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { email } = req.user;
    const { password } = req.body;
    console.log(email, password);
    const data = await resetPassword(email, password);

    return res.status(200).json({
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Error from server",
      DT: [],
    });
  }
};

module.exports = {
  handleForgetPassword,
  handleResetPassword,
};
