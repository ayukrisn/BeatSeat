const Users = require("../models/Users");
const bcrypt = require('bcrypt');

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

    getSignupPage : (req, res) => {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        // Variabel bersifat object dan memiliki pesan dari variabel alert di atas
        const alert = { message: alertMessage, status: alertStatus};
        res.render("auth/signup", { 
            title: "Signup",
            alert })
    },

    signup: async (req, res) => {
        try {
            // konstanta dari yang akan diambil pada form
            const {nama, email, password, password2, noTelp} = req.body;
            console.log("User Data:", req.body);
            let newUser = null;

            // Pemeriksaan
            if(password != password2) {
                req.flash("alertMessage", "Password tidak sama");
                req.flash("alertStatus", "danger");
                res.redirect("./signup");
            } else if(password.length < 6 ) {
                req.flash("alertMessage", "Password terlalu pendek");
                req.flash("alertStatus", "danger");
                res.redirect("./signup");
            } else {
                const user = await Users.findOne({ email: email }).exec();
                console.log(user);   
                if(user) {
                    req.flash("alertMessage", "Email telah terdaftar");
                    req.flash("alertStatus", "danger");
                    res.redirect("./signup");
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
                        req.flash("alertMessage", "Sign up berhasil. Silahkan lakukan login");
                        req.flash("alertStatus", "success");
                        res.redirect("./login");
                    })
                    .catch(value => console.log(value));
                }
                }));
            }
        } catch (error) {
            console.log("Error:", error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("./login");
        }
    },

    logout: (req, res) => {
        req.logout((err) => {
          if (err) {
            console.log("Error:", err);
            req.flash("alertMessage", "Log out gagal");
            req.flash("alertStatus", "danger");
            res.redirect("./login");
          } else {
            req.flash("alertMessage", "Log out berhasil");
            req.flash("alertStatus", "success");
            res.redirect("./login");
          }
        });
      }
}