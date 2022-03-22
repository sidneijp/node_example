import { Sequelize } from 'sequelize'
import db from "../db.js"

const User = db.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    type: Sequelize.STRING(128),
    allowNull: false,
    validate: {
      is: /^[0-9a-f]{128}$/i
    }
  },
}, {
  timestamps: false,
});

export {User}