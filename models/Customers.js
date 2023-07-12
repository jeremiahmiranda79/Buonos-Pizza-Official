const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');
const bcrypt = require('bcrypt');

class Customers extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    };
};

Customers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                const plainTextPassword = newUserData.password;
                const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
                newUserData.password = hashedPassword;
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                const plainTextPassword = updatedUserData.password;
                const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
            updatedUserData.password = hashedPassword;
                return updatedUserData;
            }
        },
        sequelize: connection,
        timestamps: true,
        freezeTableName: true,
        modelName: 'customers'
    }
);

module.exports = Customers;