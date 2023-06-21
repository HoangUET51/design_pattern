const db = require("../../models/index");
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("./jwt.service");
const bcrypt = require("bcrypt");
const { hashPassword } = require("./user.service");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secretSignature = process.env.ACC_TOKEN_SECRET;
const tokenLife = process.env.ACC_TOKEN_LIFE;
const refreshSignature = process.env.RE_TOKEN_SECRET;
const refreshTokenLife = process.env.RE_TOKEN_LIFE;

const mailHost = process.env.MAIL_HOST;
const mailPost = process.env.MAIL_POST;
const mailName = process.env.MAIL_USERNAME;
const mailPass = process.env.MAIL_PASSWORD;
const mailFromAddress = process.env.MAIL_FROM_ADDRESS;
let tokenList = [];

const checkPassword = (inputPassword, hashPass) => {
  return bcrypt.compare(inputPassword, hashPass);
};

const sendEmailAuth = async (email, token) => {
  try {
    const transport = nodemailer.createTransport({
      host: mailHost,
      port: mailPost,
      secure: false,
      auth: {
        user: mailName,
        pass: mailPass,
      },
    });

    const options = {
      from: mailFromAddress,
      to: email,
      subject: "Account Link Activate",
      html: `
        <h2>Please click on given link to activate use account</h2>
        <p>${token}</p>
    `,
    };
    await transport.sendMail(options);
  } catch (error) {
    return error;
  }
};

const userRegister = async (name, phone, email, password) => {
  try {
    if (!name || !phone || !email || !password) {
      return {
        EM: "Invalid input field",
        DT: [],
      };
    }

    const user = await db.User.findOne({ where: { email } });
    if (user) {
      return {
        EM: "Email already exists",
        DT: [],
      };
    }

    const accessToken = jwt.sign(
      { name, phone, email, type: "CUSTOMER", password },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      }
    );

    sendEmailAuth(email, accessToken);

    return {
      EM: "Email has been sent kindly activate your account",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in service",
      DT: [],
    };
  }
};

const activateAccount = async (token) => {
  try {
    if (token) {
      const decoded = await verifyToken(token, secretSignature);
      const { name, phone, email, type, password } = decoded;
      await db.User.create({
        name: name,
        phone: phone,
        email: email,
        type: type,
        password: hashPassword(password),
      });
      return {
        EM: "Sign Up successfully",
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in service",
      EC: -2,
      DT: [],
    };
  }
};

const userLogin = async (email, password) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      let checkPass = await checkPassword(password, user.password);
      const accessToken = await generateToken(user, secretSignature, tokenLife);
      const refreshToken = await generateToken(
        user,
        refreshSignature,
        refreshTokenLife
      );
      tokenList[refreshToken] = { accessToken, refreshToken };
      if (checkPass) {
        return {
          EM: "Login successfully",
          DT: {
            accessToken,
            refreshToken,
            info: {
              name: user.name,
              email: user.email,
              type: user.type,
            },
          },
        };
      }
      return {
        EM: "Your email/password number or password is incorrect!",
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "Something wrong in service",
      EC: -2,
      DT: [],
    };
  }
};

module.exports = { userLogin, userRegister, activateAccount, checkPassword };
