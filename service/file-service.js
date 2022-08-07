const uuid = require("uuid");
const db = require("../db");

class FileService {
  getFileExtension(name) {
    return name.split(".").reverse()[0];
  }

  getUuidFileName(originalname) {
    const extension = this.getFileExtension(originalname);
    const newUuid = uuid.v4();
    return `${newUuid}.${extension}`;
  }

  async saveFileInfo(file) {
    const { originalname, destination, filename, size } = file;
    const extension = this.getFileExtension(originalname);
    const fileRequest = await db.query(
      "INSERT INTO files (originalname, filename, destination, extension, size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [originalname, filename, destination, extension, size]
    );
    // console.log(fileRequest);
    const newFile = fileRequest.rows[0];

    return newFile;
  }
}

module.exports = new FileService();
