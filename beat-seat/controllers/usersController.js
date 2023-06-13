// Variabel Users dan import dari model Users
const Users = require("../models/Users");
// untuk bycrypt
const bcrypt = require('bcrypt');

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
                role: req.user.role
            })
        } catch (error) {
            // Jika eror, redirect ke route users
            res.redirect("/users");
        }
    },
    
    // Membuat create data untuk users dan membuat fungsi untuk
    // menambahkan data di form dan menggunakan async wait
    addUsers: async (req, res) => {
        try {
            // konstanta dari yang akan diambil pada form
            const {nama, email, password, noTelp} = req.body;
            console.log("User Data:", req.body);
            let newUser = null;

            // Pemeriksaan
            if(password.length < 6 ) {
                req.flash("alertMessage", "Password terlalu pendek");
                req.flash("alertStatus", "danger");
                res.redirect("/users");
            } else {
                const user = await Users.findOne({ email: email }).exec();
                console.log(user);   
                if(user) {
                    req.flash("alertMessage", "Email telah terdaftar");
                    req.flash("alertStatus", "danger");
                    res.redirect("/users");
                } else {
                    newUser = new Users({
                        nama : nama,
                        email : email,
                        password : password,
                        noTelp : noTelp
                    })
                }
                bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(req.body.password, salt, (err,hash)=> {
                if(err) throw err;
                newUser.password = hash;

                if (newUser) {
                    newUser.save()
                    .then((value) => {
                        req.flash("alertMessage", "Data berhasil ditambahkan");
                        req.flash("alertStatus", "success");
                        res.redirect("users");
                    })
                    .catch(value => console.log(value));
                }
                }));
            }
        } catch (error) {
            console.log("Error:", error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("users");
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
            let editUser = null;

            // Pemeriksaan
            if(password.length < 6 ) {
                req.flash("alertMessage", "Password terlalu pendek");
                req.flash("alertStatus", "danger");
                res.redirect("/users");
            } else {
                editUser = new Users({
                    nama : nama,
                    email : email,
                    password : password,
                    noTelp : noTelp,
                    role: role,
                })
            }
            bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(req.body.password, salt, (err,hash)=> {
                if(err) throw err;
                editUser.password = hash;

                if (editUser) {
                    users.nama = editUser.nama;
                    users.email = editUser.email;
                    users.password= editUser.password;
                    users.noTelp= editUser.noTelp;
                    users.role= editUser.role;
                    // Simpan data ke database
                    users.save()
                    .then((value) => {
                        req.flash("alertMessage", "Data berhasil diedit");
                        req.flash("alertStatus", "success");
                        if (req.user.role === "Admin") {
                            res.redirect("users");
                        } else {
                            res.redirect("/public/profile");
                        }
                        
                    })
                    .catch(value => console.log(value));
                }
                }));

        } catch (error) {
            console.log("Error:", error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("users");
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

    // Membuat view profile
    viewProfile: async (req, res) => {
        try {
            // Membuat variabel users dan menunda eksekusi hingga proses async selesai
            // lalu mengambil model user dan menggunakan method find untuk mengambil collection
            // pada database sesuai dengan id user yang sedang aktif
            const user = await Users.findOne({_id:req.user.id});
            // Variabel untuk alertMessage dan alertStatus
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            // Variabel bersifat object dan memiliki pesan dari variabel alert di atas
            const alert = { message: alertMessage, status: alertStatus};
            // Render view pada file index, tampilkan data dan destracturkan,
            // lalu panggil variabel users di atas.
            // Render alert yang sudah dideclare
            res.render("public/profile.ejs", {
                user,
                alert,
                title: "BeatSeat",
                role: req.user.role
            })
        } catch (error) {
            // Jika eror, redirect ke route public
            res.redirect("./public");
        }
    },
};