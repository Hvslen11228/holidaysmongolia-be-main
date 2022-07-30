const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token_auth = req.get("authorization");
    let token_cookie = req.cookies.token;
    if (token_auth) {
      token = token_auth;
      token = token.slice(7);
    } else if (token_cookie) {
      token = token_cookie;
    } else {
      return res.status(400).json({
        success: true,
        message: "Нэвтрэх шаардлагатай",
      });
    }
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Нэвтрэх шаардлагатай",
          });
        } else {
          req.decoded = decoded;
          req.userRole = req.decoded.result.role;
          next();
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Нэвтрэх шаардлагатай",
      });
    }
  },
  userif: (req, res, next) => {
    let token_auth = req.get("authorization");
    let token_cookie = req.cookies.token;
    let token = "";
    if (token_cookie) {
      token = token_cookie;
    } else if (token_auth) {
      token = token_auth;
      token = token.slice(7);
    }
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (decoded) {
          req.decoded = decoded;
          req.userRole = req.decoded.result.role;
        }
        next();
      });
    } else {
      next();
    }
  },
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.role)) {
        return res.status(400).json({
          success: false,
          message: "Таны эрх энэ үйлдлийг гүйцэтгэхэд хүрэлцэхгүй!",
        });
      }
      next();
    };
  },
};
