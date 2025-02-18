const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database.js');

const User = sequelize.define('User',{
    id: {type: DataTypes.UUID,defaultValue:DataTypes.UUIDV4, autoIncrement: true,primaryKey: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull:false}
},{
    timestamps:true
}
);

module.exports = User;