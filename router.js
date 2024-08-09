const userController = require("./controllers/userController");

const router = require("express").Router();


router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router