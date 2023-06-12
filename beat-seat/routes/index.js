var express = require('express');
var router = express.Router();

/* GET Login Page page. */
router.get('/', function(req, res, next) {
  res.redirect("/auth/login");
});

module.exports = router;
