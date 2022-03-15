import { Sequelize, Model, DataTypes } from 'sequelize'

const db = new Sequelize('postgres://node_example_user:teste@localhost:5432/node_example')

export default db
