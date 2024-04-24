const { decode } = require('../utils/encryption');

const validateToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
   return res.json({
      success: false,
      messgae: 'Invalid or Expired token'
    })
   }
   else {
    token = token.split(' ')[1];
    const decoded = decode(token);
    req.user = decoded;

    return next();
  }
}

module.exports = validateToken;