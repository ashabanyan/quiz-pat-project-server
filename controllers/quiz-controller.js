const QuizService = require("../service/quiz-service");
class QuizController {
  async getOneQuiz(req, res, next) {
    const { id } = req.params;
    const data = await QuizService.getOneQuiz(id);
    res.json(data);
  }

  async getQuizCover(req, res, next) {
    const { id } = req.params;
    const data = await QuizService.getQuizCover(id);
    res.json(data);
  }
}

module.exports = new QuizController();
