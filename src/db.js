import { Sequelize, Model, DataTypes } from 'sequelize'

const db = new Sequelize('postgres://fumldoswwdttzk:6349291bf5e917025a1834047981d55df89f72aab70107f95db4206972ebde40@ec2-54-164-40-66.compute-1.amazonaws.com:5432/dc3h0jri0bftcu')
/*const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
})*/

export default db
