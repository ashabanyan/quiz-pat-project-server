const multer = require("multer");
const uuid = require("uuid");

const fileuuid = uuid.v4();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // '/files' это директория в которую будут сохранятся файлы
    cb(null, "files/");
  },
  filename: (req, file, cb) => {
    // Возьмем оригинальное название файла, и под этим же названием сохраним его на сервере
    const { originalname } = file;
    const extension = originalname.split(".").reverse()[0];
    const fileName = `${fileuuid}.${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
