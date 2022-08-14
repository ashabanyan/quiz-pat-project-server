const db = require("../db");
const QuizDTO = require("../dtos/quiz-dto");
const tokenService = require("./token-service");

class QuizService {
  async getOneQuiz(id) {
    const data = await db.query("SELECT * FROM quiz WHERE id=$1", [id]);
    return data.rows[0];
  }

  async getQuizCover(id) {
    const data = await db.query("SELECT * FROM files WHERE id=$1", [id]);
    return data.rows[0];
  }

  async createQuizInfo(quizObj, accessToken) {
    const access_roles_id = [1, 2, 3];

    const { name, roundCount, category_id, level_id, cover_id } = quizObj;
    const { id: creator_id } = tokenService.validateAccessToken(accessToken);
    const newQuizReq = await db.query(
      "INSERT INTO quiz (name, roundcount, category_id, level_id, creator_id, cover_id, access_roles_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        name,
        roundCount,
        category_id,
        level_id,
        creator_id,
        cover_id,
        access_roles_id,
      ]
    );
    const newQuiz = new QuizDTO(newQuizReq.rows[0]);
    return newQuiz;
  }

  async createQuizRounds(rounds, quizId) {
    for (let i = 0; i < rounds.length; i++) {
      console.log(`Раунд ${i} ----- `, rounds[i]);
      const { name, questions } = rounds[i];

      const round = await db.query(
        "INSERT INTO quizround (quiz_id, name) VALUES ($1, $2) RETURNING *",
        [quizId, name]
      );

      const roundId = round.rows[0].id;

      for (let i = 0; i < questions.length; i++) {
        const question = await this.createQuizQuestions(questions[i], roundId);
      }
    }
  }

  async createQuizQuestions(questionInfo, roundId) {
    const { question, answer } = questionInfo;
    const questionData = await db.query(
      "INSERT INTO quizquestion (round_id, question, answer) VALUES ($1, $2, $3) RETURNING *",
      [roundId, question, answer]
    );
  }
}

module.exports = new QuizService();
