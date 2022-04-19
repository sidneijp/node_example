import { Sequelize, Model, DataTypes } from 'sequelize'

const db = new Sequelize('postgres://node_example_user:teste@db:5432/node_example')
/*const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
})*/

export default db
