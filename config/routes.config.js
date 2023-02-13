const router = require('express').Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

/* Main route */
router.get('/', (req, res, next) => res.send('JUICY WORLD'))

// auth
router.get('/signup', authMiddleware.isNotAuthenticated, authController.signup);
router.post('/signup', authMiddleware.isNotAuthenticated, authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/logout', authMiddleware.isAuthenticated, authController.doLogout);

// user

router.get("/home", authMiddleware.isAuthenticated, userController.home);
router.get('/profile', authMiddleware.isAuthenticated, userController.profile);



module.exports = router;


