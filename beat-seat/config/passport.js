const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require("../models/Users");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Temukan user
            Users.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Email tidak terdaftar. Lakukan sign up terlebih dahulu' });
                    }
                    // User ditemukan
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password Anda salah. Mohon masukkan password yang benar' });
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return done(err); 
                });
        })
    );

    passport.serializeUser(function(user, done) {
        console.log(user.id);
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            const user = await Users.findById(id).exec();
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
    
};
