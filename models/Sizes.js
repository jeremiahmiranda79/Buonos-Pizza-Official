const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

// Sizes seperated from modifiers for radio input here vs checkboxes on modifiers
class Sizes extends Model {};

Sizes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },  
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING 
        },        
        S1: {
            type: DataTypes.STRING 
        },
        S2: {
            type: DataTypes.STRING 
        },
        S3: {
            type: DataTypes.STRING 
        },
    },
    {
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'sizes'
    }
);

module.exports = Sizes;