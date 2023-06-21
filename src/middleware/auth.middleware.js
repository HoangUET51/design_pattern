const { verifyToken } = require("../services/jwt.service");

require("dotenv").config();

const nonSecurePaths = ["/", "/login", "/register", "/activate-account"];

const secretSignature = process.env.ACC_TOKEN_SECRET;
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const isAuth = async (req, res, next) => {
  const tokenFormHeader = extractToken(req);
  if (nonSecurePaths.includes(req.path)) return next();
  if (tokenFormHeader) {
    try {
      const decoded = await verifyToken(tokenFormHeader, secretSignature);
      req.user = decoded;
      req.token = tokenFormHeader;
      next();
    } catch (error) {
      return res.status(401).json({
        EM: "No token provided",
        DT: [],
      });
    }
  } else {
    return res.status(401).json({
      EM: "No token provided.",
      DT: [],
    });
  }
};

const checkPermission = async (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path) || req.path === "/logout")
      return next();
    const { user } = req;

    if (["ADMIN", "PM"].some((it) => it === user.type)) {
      return next();
    } else {
      if (req.method === "GET") {
        return next();
      }
      return res.status(403).json({
        EM: "You don't have permission to access",
        DT: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      EM: "Server Error",
      DT: [],
    });
  }
};

module.exports = { isAuth, checkPermission };
