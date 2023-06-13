// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();
const konserController = require("../controllers/konserController");
const authController = require("../controllers/authController");
// export autentikasi
const {ensureAuthenticated} = require("../config/auth.js");
const usersController = require("../controllers/usersController");

// mendapatkan halaman utama
router.get("/", ensureAuthenticated, function(req, res, next) {
    res.render("./public/index.ejs", {
      role: req.user.role
    });
  });

// mendapatkan halaman profile
router.get("/profile", ensureAuthenticated, usersController.viewProfile);
// edit profile
router.put("/profile", ensureAuthenticated, usersController.editUsers); // edit user

// mendapatkan halaman konser
router.get("/konser", ensureAuthenticated, konserController.viewKonser);

// log out
router.get("/logout", authController.logout);

module.exports = router;