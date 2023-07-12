const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

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
        // //Jeremiah start
        // price: {
        //     type: DataTypes.DECIMAL(10, 2),
        //     allowNull: false
        // },
        // //Jeremiah end        
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