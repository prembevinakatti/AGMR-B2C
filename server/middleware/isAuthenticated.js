const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.log("Error in Middleware : ", error.message);
  }
};

module.exports = isAuthenticated;
