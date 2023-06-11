// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();

// Konstanta untuk menggunakan authenticateUser
const { authenticateUser } = require("../authUser");

// const mongoose = require('mongoose');
// export controller yang digunakan
const konserController = require("../controllers/konserController");

// endpoint
router.get("/", authenticateUser, konserController.viewKonser); // untuk view
router.post("/", authenticateUser, konserController.addKonser); // tambah konser
router.put("/", authenticateUser, konserController.editKonser); // edit konser
router.delete("/:id", authenticateUser, konserController.deleteKonser); // edit konser

module.exports = router;
