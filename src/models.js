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
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senhaCriptografada: {
    type: Sequelize.STRING(64),
    allowNull: false,
    validate: {
      is: /^[0-9a-f]{64}$/i
    }
  },
}, {
  timestamps: false,
});

export {Pessoa}