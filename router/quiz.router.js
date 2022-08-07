const Router = require("express").Router;
const quizController = require("../controllers/quiz-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const fs = require("fs");

router.get("/quiz/:id", quizController.getOneQuiz);
router.get("/quizcover/:id", quizController.getQuizCover);

const getFileHandler = async (req, res) => {
  const { params } = req;
  fs.readFile(
    "./files/aaf09010-7e30-4cbb-84d3-beda44ee483e.jpeg",
    function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data); // Send the file data to the browser.
    }
  );
};

router.get("/files/:path([\\w\\W]+)", getFileHandler);

module.exports = router;
