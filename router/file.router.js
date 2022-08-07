const Router = require("express").Router;
// const nsiController = require("../controllers/nsi-controller");
const router = new Router();
// const { body } = require("express-validator");
// const authMiddleware = require("../middleware/auth-middleware");
const fileController = require("../controllers/file-controller");

const saveFile = fileController.getMulter;

// const saveFile = require("../service/file-service");

const saveQuizCover = saveFile("files/quizcover/");
const questionCover = saveFile("files/questioncover/");

router.post(
  "/quizcover",
  saveQuizCover.single("file"),
  fileController.getResult
);

router.post(
  "/questioncover",
  questionCover.single("file"),
  function (req, res, next) {
    res.json({ result: "Saved" });
  }
);

module.exports = router;
