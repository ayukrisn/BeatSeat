// konstanta untuk melakukan autentikasi user
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
      next(); // Jika terautentikasi, lanjutkan
    } else {
      res.status(401).json({ error: 'Unauthorized' }); // Beri error jika tidak
    }
  };
  
  // ekspor module
  module.exports = {
    authenticateUser,
  };