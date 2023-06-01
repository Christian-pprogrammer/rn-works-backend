const jwt = require('jsonwebtoken');
const generateToken = (user) => {
  console.log(user)
  const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
  return token;
}

module.exports = generateToken;