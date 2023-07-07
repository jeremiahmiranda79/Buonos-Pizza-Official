const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

class Transactions extends Model {};

Transactions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },          
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },        
    },
    {
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'transactions'
    }
);

module.exports = Transactions;