// Variabel Users dan import dari model Users
const Users = require("../models/Users");
// const mongoose = require("mongoose");

// Export module yang ada pada object
module.exports = {
    // Membuat view untuk users
    viewUsers: async (req, res) => {
        try {
            // Membuat variabel users dan menunda eksekusi hingga proses async selesai
            // lalu mengambil model user dan menggunakan method find untuk mengambil collection
            // pada database
            const users = await Users.find();
            // Variabel untuk alertMessage dan alertStatus
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            // Variabel bersifat object dan memiliki pesan dari variabel alert di atas
            const alert = { message: alertMessage, status: alertStatus};
            // Render view pada file index, tampilkan data dan destracturkan,
            // lalu panggil variabel users di atas.
            // Render alert yang sudah dideclare
            res.render("users/index", {
                users,
                alert,
                title: "BeatSeat",
            })
        } catch (error) {
            // Jika eror, redirect ke route users
            res.redirect("/users");
        }
    },
    
    // Membuat create data untuk users dan membuat fungsi untuk
    // menambahkan data di form dan menggunakan async wait
    addUsers: async (req, res) => {
        // validasi untuk input kosong
        try {
            // konstanta dari yang akan diambil pada form
            const {nama, email, password, noTelp, role} = req.body;
            console.log("User Data:", req.body);
            // kembalikan fungsi dan buat data dari scheme user
            await Users.create({email, password, nama, noTelp, role});
            // notifikasi bila add data sukses
            req.flash("alertMessage", "Data users berhasil ditambahkan");
            req.flash("alertStatus", "success");
            res.redirect("/users");
        } catch (error) {
            console.log("Error:", error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/users");
        }
    },

    // Membuat update data untuk user
    editUsers: async (req, res) => {
        try {
            // Variabel yang menerima id dan nama dari req body
            const {id, nama, email, password, noTelp, role} = req.body;
            // Mencari variabel yang dideklarasikan dan cek id pada database
            // untuk dicocokkan sesuai input
            const users = await Users.findOne({_id:id});
            // Ambil data user
            users.nama = nama;
            users.email = email;
            users.password=password;
            users.noTelp=noTelp;
            users.role=role;
            // Simpan data ke database
            await users.save();
            // Jika edit berhasil, berikan notifikasi
            req.flash("alertMessage", "Data user berhasil diedit");
            req.flash("alertStatus", "success");
            // Redirect ke /users
            res.redirect("/users");
        } catch (error) {
            // Jika edit data eror, berikan notifikasi erornya
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
            res.redirect("/users");
        }
    },

    // Membuat delete data untuk user
    deleteUsers: async (req, res) => {
        try {
            // Variabel yang menerima id yang didapat dari parameter
            const {id} = req.params;
            // cek data users yang ingin dihapus
            const users = await Users.findOne({_id: id});
            // langsung hapus data
            await users.deleteOne({_id: id});
            // berikan notifikasi bahwa data sudah dihapus
            req.flash("alertMessage", "Data users sudah didelete");
            req.flash("alertStatus", "warning");
            // redirect ke users
            res.redirect("/users");
        } catch (error) {
            // jika ternyata eror, berikan notifikasi
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            // ketika inputan kosong, redirect kehalaman
            res.redirect("/users");
        }
    },
};