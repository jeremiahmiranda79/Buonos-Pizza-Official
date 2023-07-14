const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');

// This one is a little ugly and repetitive but Sequelize did not like DataTypes.ARRAY(DataTypes.STRING)
// There are this many pizza toppings available
class Modifiers extends Model {};

Modifiers.init(
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
        M1: {
            type: DataTypes.STRING 
        },
        M2: {
            type: DataTypes.STRING 
        },
        M3: {
            type: DataTypes.STRING 
        },
        M4: {
            type: DataTypes.STRING 
        },
        M5: {
            type: DataTypes.STRING 
        },
        M1: {
            type: DataTypes.STRING 
        },
        M6: {
            type: DataTypes.STRING 
        },
        M7: {
            type: DataTypes.STRING 
        },
        M8: {
            type: DataTypes.STRING 
        },
        M9: {
            type: DataTypes.STRING 
        },
        M10: {
            type: DataTypes.STRING 
        },
        M11: {
            type: DataTypes.STRING 
        },
        M12: {
            type: DataTypes.STRING 
        },
        M13: {
            type: DataTypes.STRING 
        },
        M14: {
            type: DataTypes.STRING 
        },
        M15: {
            type: DataTypes.STRING 
        },
        M16: {
            type: DataTypes.STRING 
        },
        M17: {
            type: DataTypes.STRING 
        },
        M18: {
            type: DataTypes.STRING 
        },
        M19: {
            type: DataTypes.STRING 
        },
        M20: {
            type: DataTypes.STRING 
        },
        M21: {
            type: DataTypes.STRING 
        },
        notesForTheKitchen: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'modifiers'
    }
);

module.exports = Modifiers;