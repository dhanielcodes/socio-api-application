const userController = require("./controllers/userController");
const userMiddleware = require("./middlewre/userAuthenticationMiddleware");

const router = require("express").Router();

router.get("/", userController.home);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", userMiddleware.authenticateUser, userController.profile);

module.exports = router;
