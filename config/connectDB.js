const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("vexeres", "postgres", "admin123456", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;
