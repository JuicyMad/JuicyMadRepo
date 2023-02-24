const router = require("express").Router();

const passport = require("passport");
const upload = require("./storage.config"); ///

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const adminMiddleware = require("../middlewares/admin.middleware");
const orderController = require("../controllers/order.controller")

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

/* Main route */
router.get("/", (req, res, next) => res.send("JUICY WORLD"));

// auth
router.get("/signup", authMiddleware.isNotAuthenticated, authController.signup);
router.post(
  "/signup",
  authMiddleware.isNotAuthenticated,
  authController.doSignup
);

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddleware.isNotAuthenticated,
  authController.doLogin
);

router.get("/logout", authMiddleware.isAuthenticated, authController.doLogout);

// user

router.get("/home", userController.home);
router.get("/profile", authMiddleware.isAuthenticated, userController.profile);

//Sign with google
router.get(
  "/login/google",
  passport.authenticate("google-auth", { scope: GOOGLE_SCOPES })
);
router.get("/auth/google/callback", authController.doLoginGoogle);

// products

router.get("/products", productController.list);
router.get(
  "/products/create",
  authMiddleware.isAuthenticated,
  adminMiddleware.isAdmin,
  productController.create
);
router.post(
  "/products/create",
  authMiddleware.isAuthenticated,
  adminMiddleware.isAdmin,
  productController.doCreate
);
router.get(
  "/products/:id/edit",
  authMiddleware.isAuthenticated,
  adminMiddleware.isAdmin,
  productController.update
);
router.post(
  "/products/:id/edit",
  authMiddleware.isAuthenticated,
  adminMiddleware.isAdmin,
  productController.doUpdate
);
router.post(
  "/products/:id/delete",
  authMiddleware.isAuthenticated,
  adminMiddleware.isAdmin,
  productController.delete
);
router.get("/products/:slug", productController.detail);

// cart
router.get("/me/cart", cartController.myCart);
router.get("/cart", cartController.cart);
router.post(
  "/:id/addToCart",
  authMiddleware.isAuthenticated,
  cartController.editCart
); 

 
router.put("/cart/products/:productId", 
authMiddleware.isAuthenticated,
cartController.editCart );

// order

router.post("/user/order", authMiddleware.isAuthenticated, orderController.newOrder);



module.exports = router;
