// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();

// Konstanta untuk menggunakan authenticateUser
const { authenticateUser } = require("../authUser");

// const mongoose = require('mongoose');
// export controller yang digunakan
const usersController = require("../controllers/usersController");

// endpoint
router.get("/", authenticateUser, usersController.viewUsers); // untuk view
router.post("/", authenticateUser, usersController.addUsers); // tambah user
router.put("/", authenticateUser, usersController.editUsers); // edit user
router.delete("/:id", authenticateUser, usersController.deleteUsers); // edit user

module.exports = router;
