const jwt = require('jsonwebtoken')

const isAuth = async (req,res,next) => {
  console.log(req.headers);
  const token = req.headers.token || req.headers.Authorization || req.headers.authorization;
  console.log(token)
  if(!token) {
    return res.status(401).json({
      message: 'Not authenticated'
    })
  }else{
    try {
      // Verify the token using the secret key
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      
      // Add the decoded token payload to the request object
      req.user = decoded;
  
      // Proceed to the next middleware
      next();
    } catch (err) {
      console.log(err)
      // Token is invalid or expired, send an error response
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

module.exports = isAuth;