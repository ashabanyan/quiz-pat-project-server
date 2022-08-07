var multer = require("multer");
const uuid = require("uuid");
const fileController = require("../service/file-service");

class FileController {
  getMulter(path) {
    const multerObject = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path);
      },
      filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, fileController.getUuidFileName(originalname));
      },
    });

    return multer({ storage: multerObject });
  }

  async getResult(req, res, next) {
    const data = await fileController.saveFileInfo(res.req.file);
    res.json(data);
  }
}

module.exports = new FileController();
