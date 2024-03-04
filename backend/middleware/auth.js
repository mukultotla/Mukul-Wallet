const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = {userId: payload.userId};
      console.log(req.user);
    } else {
        throw new Error("Missing required auth headers");
    }
    next();
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = authMiddleware;
