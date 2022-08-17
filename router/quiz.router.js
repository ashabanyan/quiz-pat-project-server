const Router = require("express").Router;
const quizController = require("../controllers/quiz-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const fs = require("fs");

router.get("/quiz", authMiddleware, quizController.getAllQuizInfo);
router.get("/quiz/:id", quizController.getOneQuiz);
router.get("/quizcover/:id", quizController.getQuizCover);
// router.post("/quizinfo", authMiddleware, quizController.createQuizInfo);
router.post("/quiz", authMiddleware, quizController.createQuiz);

module.exports = router;
