const Router = require("express").Router;
const quizController = require("../controllers/quiz-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.get("/levels", nsiController.getLevels);

module.exports = router;
