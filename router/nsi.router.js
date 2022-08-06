const Router = require("express").Router;
const nsiController = require("../controllers/nsi-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");

router.get("/levels", nsiController.getLevels);
router.get("/categories", nsiController.getCategories);

module.exports = router;
