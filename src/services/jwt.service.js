const jwt = require("jsonwebtoken");

const generateToken = (user, secretSignature, tokenLife) => {
  try {
    const userData = {
      name: user.name,
      email: user.email,
      type: user.type,
    };
    let token = jwt.sign(userData, secretSignature, {
      algorithm: "HS256",
      expiresIn: tokenLife,
    });
    return token;
  } catch (error) {
    return error;
  }
};

const verifyToken = (token, secretKey) => {
  try {
    let decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return error;
  }
};

const destroyToken = (token) => {
  jwt.destroy(token);
};

module.exports = { generateToken, verifyToken, destroyToken };
