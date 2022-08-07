const db = require("../db");

class QuizService {
  async getOneQuiz(id) {
    const data = await db.query("SELECT * FROM quiz WHERE id=$1", [id]);
    return data.rows[0];
  }

  async getQuizCover(id) {
    const data = await db.query("SELECT * FROM files WHERE id=$1", [id]);
    return data.rows[0];
  }
}

module.exports = new QuizService();
