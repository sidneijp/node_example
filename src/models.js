import { Sequelize } from 'sequelize'
import db from "./db.js"

const Pessoa = db.define("pessoa", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export {Pessoa}