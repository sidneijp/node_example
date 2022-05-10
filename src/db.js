import { Sequelize, Model, DataTypes } from 'sequelize'

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://node_example_user:node_example_password@localhost:5432/node_example';
const db = new Sequelize(DATABASE_URL)
/*const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
})*/

export default db
