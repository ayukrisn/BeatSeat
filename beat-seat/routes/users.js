// Konstanta router dengan require variabel
// express dan menggunakan metode router
const router = require("express").Router();

// export controller yang digunakan
const usersController = require("../controllers/usersController");

// export autentikasi
const {ensureAuthenticatedAsAdmin} = require("../config/auth.js")

// endpoint
router.get("/", ensureAuthenticatedAsAdmin, usersController.viewUsers); // untuk view
router.post("/", ensureAuthenticatedAsAdmin, usersController.addUsers); // tambah user
router.put("/", ensureAuthenticatedAsAdmin, usersController.editUsers); // edit user
router.delete("/:id", ensureAuthenticatedAsAdmin, usersController.deleteUsers); // edit user

module.exports = router;
