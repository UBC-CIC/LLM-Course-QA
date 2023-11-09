const { DataTypes } = require('sequelize');
const sequelize = require('../server');

const Course = sequelize.define('Course', {
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desciption: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Course;