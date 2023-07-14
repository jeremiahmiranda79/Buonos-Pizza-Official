const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

// This also would have had more functionality if the DataTypes.ARRAY(DataTypes.INTEGER) worked...
class Orders extends Model {};

Orders.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },  
        customerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customers',
                key: 'id'
            }
        },        
        menuItemIds: {
            type: DataTypes.INTEGER,
            references: {
                model: 'menuitems',
                key: 'id'
            }
        },
        totalPrice: {
            // Will be created dynamically from prices in menuItemIds array
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'orders'
    }
);

module.exports = Orders;