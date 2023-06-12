// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();

// export autentikasi
const {ensureAuthenticatedAsAdmin} = require("../config/auth.js");

router.get("/", ensureAuthenticatedAsAdmin, function(req, res, next) {
    res.render("./admin_dashboard.ejs", {
      role: req.user.role
    }
    );
  });

module.exports = router;