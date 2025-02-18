const Sequelize = require("sequelize");
const database = require("../MyProjectAPI/config/database");

const imageModel = database.define(
  "tb_image",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    referencia: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_criacao: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Image;