// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();

// const mongoose = require('mongoose');
// export controller yang digunakan
const konserController = require("../controllers/konserController");

// export autentikasi
const {ensureAuthenticated} = require("../config/auth.js")

// endpoint
router.get("/", ensureAuthenticated, konserController.viewKonser); // untuk view
router.post("/", ensureAuthenticated, konserController.addKonser); // tambah konser
router.put("/", ensureAuthenticated, konserController.editKonser); // edit konser
router.delete("/:id", ensureAuthenticated, konserController.deleteKonser); // edit konser

module.exports = router;