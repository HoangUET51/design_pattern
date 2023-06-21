const db = require("../../models/index");

const handleUpLoadFile = async (req, res) => {
  try {
    const { file, user } = req;
    const urlImage = `http://localhost:8000/${file.path}`;

    const userFound = await db.User.findOne({
      where: {
        email: user.email,
      },
    });

    if (userFound) {
      await userFound.update({
        avatar: urlImage,
      });

      return res.status(200).json({
        EM: "The following file was uploaded successfully",
        EC: 0,
        DT: userFound,
      });
    }

    return res.status(200).json({
      EM: "User not found",
      EC: 0,
      DT: [],
    });
  } catch (error) {
    return res.status(500).json({
      EM: `Unable to upload the file`,
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  handleUpLoadFile,
};
