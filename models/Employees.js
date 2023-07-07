const {Model, DataTypes} = require('sequelize');
const connection = require('../config/connection');
const bcrypt = require('bcrypt');

class Employees extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    };
};

Employees.init(
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
            unique: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        modelName: 'employees'
    }
);

module.exports = Employees;