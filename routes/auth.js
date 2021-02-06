const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

//Route To Render Log In Page
router.get('/login', AuthController.renderLogInPage);

//Route To Render Register User Page
router.get('/register', AuthController.renderRegisterPage);

//Route To Register User
router.post('/register', AuthController.registerUser);

module.exports = router;