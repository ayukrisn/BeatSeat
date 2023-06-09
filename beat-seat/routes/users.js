// Variabel router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();
// const mongoose = require('mongoose');
// export controller yang digunakan
const usersController = require("../controllers/usersController");

// endpoint
router.get("/", usersController.viewUsers); // untuk view
router.post("/", usersController.addUsers); // tambah user
router.put("/", usersController.editUsers); // edit user
router.delete("/:id", usersController.deleteUsers); // edit user

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
