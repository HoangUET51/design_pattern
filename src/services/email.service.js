const nodemailer = require("nodemailer");
const db = require("../../models/index");
const { checkPassword } = require("./auth.service");
const { hashPassword } = require("./user.service");
require("dotenv").config();
const mailHost = process.env.MAIL_HOST;
const mailPost = process.env.MAIL_POST;
const mailName = process.env.MAIL_USERNAME;
const mailPass = process.env.MAIL_PASSWORD;
const mailFromAddress = process.env.MAIL_FROM_ADDRESS;

const sendEmailResetPassword = async (email) => {
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
      subject: "For Reset Password",
      html: `
        <h2>Please click on given link to reset your password</h2>
        <a href='http://localhost:8000/api/v1/reset-password'>Reset Password</a>
    `,
    };
    await transport.sendMail(options);
  } catch (error) {
    return error;
  }
};

const forgetPassword = async (email) => {
  try {
    const user = await db.User.findOne({
      where: { email: email },
    });

    if (user) {
      sendEmailResetPassword(user.email);
      return {
        EM: "Check your email reset password.",
        DT: [],
      };
    }

    return {
      EM: "User not fount",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const resetPassword = async (email, password) => {
  try {
    const user = await db.User.findOne({ where: { email: email } });

    if (user) {
      const checkPas = await checkPassword(password, user.password);
      if (checkPas) {
        return {
          EM: "Please enter another password",
          DT: [],
        };
      }
      const newPassword = hashPassword(password);

      await user.update({
        password: newPassword,
      });

      return {
        EM: "User password has been reset",
        DT: [],
      };
    }

    return {
      EM: "User not found",
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

module.exports = { forgetPassword, resetPassword };
