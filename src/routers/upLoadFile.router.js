const { handleUpLoadFile } = require("../controllers/upLoadFile.controller");
const { upLoadImage } = require("../middleware/upLoadFile.middleware");

const upLoadFileAPI = (router) => {
  router.post("/upload-file", upLoadImage("avatar"), handleUpLoadFile);
};

module.exports = upLoadFileAPI;
