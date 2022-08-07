const Router = require("express").Router;
// const nsiController = require("../controllers/nsi-controller");
const router = new Router();
// const { body } = require("express-validator");
// const authMiddleware = require("../middleware/auth-middleware");
const upload = require("../service/file-service");
const fs = require("fs");
const getFileType = require("file-type");

router.post(
  "/files",
  // Указываем multer в каком поле брать файл
  upload.single("file"),
  (req, res) => {
    // console.log(res);
    res.json({ status: "Saved" });
  }
);

const getFileHandler = async (req, res) => {
  const { params } = req;
  fs.readFile(
    "./files/aaf09010-7e30-4cbb-84d3-beda44ee483e.jpeg",
    function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data); // Send the file data to the browser.
    }
  );
};

router.get("/files/:path([\\w\\W]+)", getFileHandler);

module.exports = router;
