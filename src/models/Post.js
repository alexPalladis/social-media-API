const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');
const { post } = require('../routes/userRoutes');

const Post = sequelize.define('Post',{
    id: {type: DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
    userId: {type: DataTypes.UUID, allowNull: false, references: {model: User, key: 'id'}}, 
});

User.hasMany(Post, {foreignKey: 'userId', onDelete: 'CASCADE'});
Post.belongsTo(User, {foreignKey: 'userId'});

module.exports = Post;
