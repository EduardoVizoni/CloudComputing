const Sequelize = require("sequelize");
const database = require("../Config/database");

const user = database.define(
   "tb_user",
   {
      id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true,
      },
      nome: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      data_criacao: {
         type: Sequelize.DATE,
         allowNull: false,
      },
   },
   {
      timestamps: false,
   }
);

module.exports = user;