const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Post = sequelize.define('post', {
    post: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    //user
});

module.exports = Post;