// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();

// export autentikasi
const {ensureAuthenticated} = require("../config/auth.js");

router.get("/", ensureAuthenticated, function(req, res, next) {
    res.render("./public/index.ejs");
  });

module.exports = router;