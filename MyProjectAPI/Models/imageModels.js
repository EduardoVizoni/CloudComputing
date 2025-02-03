const Sequelize = require("sequelize");
const database = require("../Config/database");

const image = database.define(
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

module.exports = image;