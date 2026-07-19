const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Ye middleware check karta hai ki request ke saath valid JWT token hai ya nahi
const protect = async (req, res, next) => {
  let token;

  // Token Authorization header me "Bearer <token>" format me aata hai
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ko find karo aur password chhod ke sab attach kar do req.user me
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = { protect };
