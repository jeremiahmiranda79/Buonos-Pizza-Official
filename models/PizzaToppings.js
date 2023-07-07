const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

class PizzaToppings extends Model {};

PizzaToppings.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    menuItemsId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'menuitems',
            key: 'id'
        }
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    item_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
},
{
    sequelize: connection,
    timestamps: true,
    freezeTableName: true,
    modelName: 'pizzatoppings'
}
);
module.exports = PizzaToppings;