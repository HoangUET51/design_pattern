const bcrypt = require("bcrypt");
const db = require("../../models/index");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const createUser = async (name, phone, email, type, password) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      if (!name || !phone || !email || !type || !password) {
        return {
          EM: "Invalid input field",
          DT: [],
        };
      }
      await db.User.create({
        name,
        phone,
        email,
        type,
        password: hashPassword(password),
      });
      return {
        EM: "Create successfully",
        DT: [],
      };
    }
    return {
      EM: "Email already exists",
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

const getAllUser = async () => {
  try {
    const users = await db.User.findAll();
    return {
      EM: "Get all users successfully",
      DT: users,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const getUserDetail = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    if (user) {
      return {
        EM: "Get user detail successfully",
        DT: user,
      };
    }
    return {
      EM: "User not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const updateUser = async (id, name, phone, type, password) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    if (user) {
      if (!name || !phone || !type || !password) {
        return {
          EM: "Invalid input field",
          DT: [],
        };
      }
      await user.update({
        name: name,
        phone: phone,
        type: type,
        password: hashPassword(password),
      });
      return {
        EM: "Update user successfully",
        DT: [],
      };
    }
    return {
      EM: "User not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id } });
    if (user) {
      await user.destroy();
      return {
        EM: "Delete user successfully",
        DT: [],
      };
    }
    return {
      EM: "User not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserDetail,
  updateUser,
  deleteUser,
  hashPassword,
};
