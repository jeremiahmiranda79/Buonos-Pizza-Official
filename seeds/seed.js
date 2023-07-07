const sequelize = require('../config/connection');
const PizzaToppings = require('../models/PizzaToppings');
const { Categories, Customers, Employees, MenuItems, Orders, Transactions, Modifiers } = require('../models');
const categoryData = require('./categoryData.json');
const customerData = require('./customerData.json');
const employeeData = require('./employeeData.json');
const menuItemData = require('./menuItemData.json');
const orderData = require('./orderData.json');
const transactionData = require('./transactionData.json');
const modifierData = require('./modifierData.json');

const pizzaToppings = require('./pizzaToppings.json');

const seedData = async () => {
    await sequelize.sync({force:true});

    await Customers.bulkCreate(customerData, { individualHooks:true });
    await Employees.bulkCreate(employeeData, { individualHooks:true });
    await Categories.bulkCreate(categoryData);
    await Modifiers.bulkCreate(modifierData);
    await MenuItems.bulkCreate(menuItemData);
    await Orders.bulkCreate(orderData);
    await Transactions.bulkCreate(transactionData);

    await PizzaToppings.bulkCreate(pizzaToppings);

    console.log('All seeded!')

    process.exit(0);
};

seedData();