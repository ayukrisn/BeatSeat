// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();
const konserController = require("../controllers/konserController");
const authController = require("../controllers/authController");
// export autentikasi
const {ensureAuthenticated} = require("../config/auth.js");

router.get("/", ensureAuthenticated, function(req, res, next) {
    res.render("./public/index.ejs", {
      role: req.user.role
    });
  });

router.get("/konser", ensureAuthenticated, konserController.viewKonser);
router.get("/logout", authController.logout);

module.exports = router;