const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment',{
    id: {type: DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey: true,allowNull:false},
    text: {type: DataTypes.TEXT, allowNull: false},
    userId: {type: DataTypes.UUID, allowNull: false, references: {model: User, key: 'id'}},
    postId: {type: DataTypes.UUID, allowNull: false, references: {model: Post, key: 'id'}}
});

User.hasMany(Comment, {foreignKey: 'userId', onDelete: 'CASCADE'});
Post.hasMany(Comment, {foreignKey: 'postId', onDelete: 'CASCADE'});
Comment.belongsTo(User, {foreignKey: 'userId'});
Comment.belongsTo(Post, {foreignKey: 'postId'});

module.exports = Comment;