const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const productController = require("../controllers/product.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
/* Main route */
router.get("/", (req, res, next) => res.send("JUICY WORLD"));

// auth
router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post("/signup",authMiddleware.isNotAuthenticated, authController.doSignup);

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated,authController.doLogin);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

// user

router.get("/home", authMiddleware.isAuthenticated, userController.home);
router.get("/profile", authMiddleware.isAuthenticated, userController.profile);

// products

router.get("/products", productController.list);
router.get("/products/create", authMiddleware.isAuthenticated, adminMiddleware.isAdmin, productController.create);
router.post("/products/create",authMiddleware.isAuthenticated, adminMiddleware.isAdmin, productController.doCreate);
router.get("/products/:id/edit", authMiddleware.isAuthenticated, adminMiddleware.isAdmin,productController.update);
router.post("/products/:id/edit",authMiddleware.isAuthenticated, adminMiddleware.isAdmin, productController.doUpdate);
router.post("/products/:id/delete", authMiddleware.isAuthenticated, adminMiddleware.isAdmin,productController.delete);
router.get("/products/:slug",productController.detail);

module.exports = router;
