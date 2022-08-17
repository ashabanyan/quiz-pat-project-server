const Router = require("express").Router;
// const nsiController = require("../controllers/nsi-controller");
const router = new Router();
// const { body } = require("express-validator");
// const authMiddleware = require("../middleware/auth-middleware");
const fileController = require("../controllers/file-controller");
var fs = require("fs");
const saveFile = fileController.getMulter;

// const saveFile = require("../service/file-service");

const saveImages = saveFile("files/images/");

router.post("/saveimage", saveImages.single("file"), fileController.getResult);

const getFileHandler = async (req, res) => {
  const { params } = req;
  console.log(params);
  fs.readFile(`./files/${params.path}`, function (err, data) {
    if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data); // Send the file data to the browser.
  });
};

router.get("/files/:path([\\w\\W]+)", getFileHandler);

module.exports = router;
