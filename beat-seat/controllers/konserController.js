// Variabel Konser dan import dari model Konser
const Konser = require("../models/Konser");

// const mongoose = require("mongoose");

// Export module yang ada pada object
module.exports = {
    // Membuat view untuk konser
    viewKonser: async (req, res) => {
        try {
            // Membuat variabel konser dan menunda eksekusi hingga proses async selesai
            // lalu mengambil model konser dan menggunakan method find untuk mengambil collection
            // pada database
            const konser = await Konser.find();
            // Variabel untuk alertMessage dan alertStatus
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            // Variabel bersifat object dan memiliki pesan dari variabel alert di atas
            const alert = { message: alertMessage, status: alertStatus};
            // Render view pada file index, tampilkan data dan destracturkan,
            // lalu panggil variabel konser di atas.
            // Render alert yang sudah dideclare
            res.render("konser/index", { 
                konser,
                alert,
                title: "BeatSeat",
                role: req.user.role
            });
        } catch (error) {
            // Jika eror, redirect ke route konser dan print error
            console.error(error);
            req.flash("alertMessage", "Login error");
            req.flash("alertStatus", "warning");
            res.redirect("/konser");
        }
    },
    
    // Membuat create data untuk konser dan membuat fungsi untuk
    // menambahkan data di form dan menggunakan async wait
    addKonser: async (req, res) => {
        // validasi untuk input kosong
        try {
            // konstanta dari yang akan diambil pada form
            const {namaKonser, kategoriKonser, deskripsiKonser, statusKonser, alamatKonser, waktuKonser} = req.body;
            console.log("Konser Data:", req.body);
            // kembalikan fungsi dan buat data dari scheme konser
            await Konser.create({namaKonser, kategoriKonser, deskripsiKonser, statusKonser, alamatKonser, waktuKonser});
            // notifikasi bila add data sukses
            req.flash("alertMessage", "Data konser berhasil ditambahkan");
            req.flash("alertStatus", "success");
            res.redirect("/konser");
        } catch (error) {
            console.log("Error:", error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/konser");
        }
    },

    // Membuat update data untuk konser
    editKonser: async (req, res) => {
        try {
            // Variabel yang menerima id dan nama dari req body
            const {id, namaKonser, kategoriKonser, deskripsiKonser, statusKonser, alamatKonser, waktuKonser} = req.body;
            // Mencari variabel yang dideklarasikan dan cek id pada database
            // untuk dicocokkan sesuai input
            const konser = await Konser.findOne({_id:id});
            // Ambil data user
            konser.namaKonser = namaKonser;
            konser.kategoriKonser = kategoriKonser;
            konser.deskripsiKonser=deskripsiKonser;
            konser.statusKonser=statusKonser;
            konser.alamatKonser=alamatKonser;
            konser.waktuKonser=waktuKonser;
            // Simpan data ke database
            await konser.save();
            // Jika edit berhasil, berikan notifikasi
            req.flash("alertMessage", "Data konser berhasil diedit");
            req.flash("alertStatus", "success");
            // Redirect ke /konser
            res.redirect("/konser");
        } catch (error) {
            // Jika edit data eror, berikan notifikasi erornya
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputan kosong maka redirect kehalaman (/konser)
            res.redirect("/konser");
        }
    },

    // Membuat delete data untuk konser
    deleteKonser: async (req, res) => {
        try {
            // Variabel yang menerima id yang didapat dari parameter
            const {id} = req.params;
            // cek data konser yang ingin dihapus
            const konser = await Konser.findOne({_id: id});
            // langsung hapus data
            await konser.deleteOne({_id: id});
            // berikan notifikasi bahwa data sudah dihapus
            req.flash("alertMessage", "Data konser sudah didelete");
            req.flash("alertStatus", "warning");
            // redirect ke konser
            res.redirect("/konser");
        } catch (error) {
            // jika ternyata eror, berikan notifikasi
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputan kosong, redirect kehalaman
            res.redirect("/konser");
        }
    },

    // Search data for konser
    searchKonser: async (req, res) => {
    try {
      const { search } = req.query;
      const konser = await Konser.find({ $text: { $search: search } });
  
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
  
      res.render("konser/index", {
        konser,
        alert,
        title: "BeatSeat",
        role: req.user.role,
      });
    } catch (error) {
      console.error(error);
      req.flash("alertMessage", "Error searching konser");
      req.flash("alertStatus", "warning");
      res.redirect("/konser");
    }
  }
  
};