import { Sequelize, Model, DataTypes } from 'sequelize'
//const db = new Sequelize('sqlite::memory:')
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

export default db