const Sequelize = require("sequelize");

const sequelize = new Sequelize("yourdatabase", "root", "yourpassword", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;