const QuizService = require("../service/quiz-service");
const jwt = require("jsonwebtoken");
const tokenService = require("../service/token-service");

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

  async createQuizInfo(req, res, next) {
    const quizObj = { ...req.body, creator_id: req.user.id };
    const data = await QuizService.createQuizInfo(quizObj);
    res.json(data);
  }

  async createQuiz(req, res, next) {
    const authorizationHeader = req.headers.authorization.split(" ")[1];
    const { quizInfo, quizRound } = req.body;
    const quizData = await QuizService.createQuizInfo(
      quizInfo,
      authorizationHeader
    );

    const quizRoundData = await QuizService.createQuizRounds(
      quizRound,
      quizData.id
    );

    res.json({});
  }
}

module.exports = new QuizController();
