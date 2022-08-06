const db = require("../db");

class NsiService {
  async getLevels() {
    const levels = await db.query("SELECT * FROM level");
    return levels.rows;
  }

  async getCategories() {
    const categories = await db.query("SELECT * FROM category");
    return categories.rows;
  }
}

module.exports = new NsiService();
