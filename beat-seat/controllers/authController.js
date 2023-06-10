const Users = require("../models/Users");

// Login page

module.exports = {
    getLoginPage : (req, res) => {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        // Variabel bersifat object dan memiliki pesan dari variabel alert di atas
        const alert = { message: alertMessage, status: alertStatus};
        res.render("auth", { 
            title: "Login",
            alert })
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Variabel untuk alertMessage dan alertStatus
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            // Variabel bersifat object dan memiliki pesan dari variabel alert di atas
            const alert = { message: alertMessage, status: alertStatus};

            // Implement the logic to authenticate the user
            // For example, you can query the database to find a matching user
            const users = await Users.findOne({email: email, password: password});
            if (!users) {
                // Handle invalid credentials
                req.flash("alertMessage", "Login gagal. Masukkan email dan password yang benar");
                req.flash("alertStatus", "danger");
                res.redirect("./");
                // res.render("index", { 
                //     title: "Login", 
                //     alert });
            } else {
                // Redirect the user to a protected page or perform any other desired actions
                req.session.user = users._id; // set session property ke users._id
                req.flash("alertMessage", "Login berhasil");
                req.flash("alertStatus", "success");
                res.redirect("/users");
            }
        } catch (error) {
            // Jika eror, redirect ke login
            console.error(error);
            req.flash("alertMessage", "Login error");
            req.flash("alertStatus", "warning");
            res.redirect("./");
        }
    },

    getSignupPage : (req, res) => {
        res.render("auth/signup", { title: "Signup" });
    },

    signup: async (req, res) => {
        try {
            // konstanta dari yang akan diambil pada form
            const {nama, email, password, noTelp} = req.body;
            console.log("User Data:", req.body);
            // kembalikan fungsi dan buat data dari scheme user
            await Users.create({email, password, nama, noTelp});
            // notifikasi bila sign up sukses
            req.flash("alertMessage", "Sign up berhasil. Silahkan lakukan login");
            req.flash("alertStatus", "success");
            res.redirect("./");
        } catch (error) {
            console.log("Error:", error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("./");
        }
    }
}