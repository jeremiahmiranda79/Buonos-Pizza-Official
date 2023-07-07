const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

class Categories extends Model {};

Categories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },          
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
 
    },
    {
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'categories'
    }
);

module.exports = Categories;