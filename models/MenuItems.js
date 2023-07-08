const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

class MenuItems extends Model {};

MenuItems.init(
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
        modifierId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'modifiers',
                key: 'id'
            }
        },
        sizeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'sizes',
                key: 'id'
            }
        },
        employeeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employees',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
    },
    {
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'menuitems'
    }
);

module.exports = MenuItems;