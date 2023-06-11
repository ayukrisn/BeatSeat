const mongoose = require("mongoose");

// Variabel baru dengan nama konserScheme
const konserScheme = new mongoose.Schema({
    namaKonser: {
        //Tipe field nama konser
        type: String,
        //Tidak boleh kosong
        required: true,
    },
    kategoriKonser: {
        //Tipe field kategori konser
        type: String,
        enum: ['Rock', 'Pop', 'Jazz', 'Hip-hop', 'Indie'],
        //Tidak boleh kosong
        required: true,
    },
    deskripsiKonser: {
        //Tipe field deskripsi konser
        type: String,
        //Tidak boleh kosong
        required: true,
    },
    statusKonser: {
        //Tipe field status konser
        type: String,
        enum: ['Tersedia', 'Sold Out', 'Selesai'],
        //Tidak boleh kosong
        required: true,
    },
    alamatKonser: {
        //Tipe field alamat konser
        type: String,
        //Tidak boleh kosong
        required: true,
    },
    waktuKonser: {
        //Tipe field waktuKonser
        type: String,
        //Tidak boleh kosong
        required: true,
    },
});

// ekspor model dari konser sehingga bisa digunakan
module.exports=mongoose.model("Konser", konserScheme);