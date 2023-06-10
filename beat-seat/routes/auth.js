const router = require("express").Router();

const authController = require("../controllers/authController");

// Login route
router.get("/", authController.getLoginPage);
router.post("/", authController.login);

// Signup route
router.get("/signup", authController.getSignupPage);
router.post("/signup", authController.signup);

module.exports = router;
