module.exports = {

    ensureAuthenticated : function(req,res,next) {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash("alertMessage", "Mohon lakukan login terlebih dahulu");
    req.flash("alertStatus", "danger");
    res.redirect('../auth/login');
    },

    ensureAuthenticatedAsAdmin : function(req,res,next) {
        console.log(req.user)
        if(req.isAuthenticated() && (req.user.role === "Admin")) {
        return next();
        }
        req.flash("alertMessage", "Login dengan akun Admin terlebih dahulu");
        req.flash("alertStatus", "danger");
        res.redirect('../auth/login');
    },

    roleAuthentication : function(req,res,next) {
        console.log(req.user)
        if(req.isAuthenticated() && (req.user.role === "Admin")) {
            res.redirect('../dashboard');
        } else {
            res.redirect('../public');
        }
    }
}