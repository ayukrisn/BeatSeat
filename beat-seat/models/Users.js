const mongoose = require("mongoose");

// Variabel baru dengan nama usersScheme
const usersScheme = new mongoose.Schema({
    email: {
        // Tipe field email
        type: String,
        // Data tidak boleh kosong
        required: true,
    },
    password: {
            // Tipe field password
            type: String,
            // Data tidak boleh kosong
            required: true,
    },
    nama: {
        // Tipe field nama
        type: String,
        // Data tidak boleh kosong
        required: true,
    },
    noTelp: {
        // Tipe field nomor telepon
        type: String,
        // Data tidak boleh kosong
        required: true,
    },
    role: {
        // Tipe field role
        type: String,
        // Data tidak boleh kosong
        required: true,
    },
});

// ekspor model dari users sehingga bisa digunakan
module.exports=mongoose.model("Users", usersScheme);