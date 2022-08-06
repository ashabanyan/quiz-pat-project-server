const res = require("express/lib/response");
const nsiService = require("../service/nsi-service");

class NsiController {
  async getLevels(req, res, next) {
    try {
      const data = await nsiService.getLevels();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getCategories(req, res, next) {
    try {
      const data = await nsiService.getCategories();
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new NsiController();
