const Categories = require('./Categories');
const Customers = require('./Customers');
const Employees = require('./Employees');
const MenuItems = require('./MenuItems');
const Modifiers = require('./Modifiers');
const Orders = require('./Orders');
const Transactions = require('./Transactions');
const Sizes = require('./Sizes');


// Employees to MenuItems
Employees.hasMany(MenuItems, {
    foreignKey: 'employeeId'
});
MenuItems.belongsTo(Employees, {
    foreignKey: 'employeeId'
});

// MenuItems to Categories
Categories.hasMany(MenuItems, {
    foreignKey: 'categoryId'
});
MenuItems.belongsTo(Categories, {
    foreignKey: 'categoryId'
});

// MenuItems to Orders
Orders.hasMany(MenuItems, {
    foreignKey: 'menuItemIds'
});
MenuItems.belongsTo(Orders, {
    foreignKey: 'menuItemIds'
});

// Customers to Orders
Customers.hasMany(Orders, {
    foreignKey: 'customerId'
});
Orders.belongsTo(Customers, {
    foreignKey: 'customerId' 
});

// Orders to Transactions
Orders.hasOne(Transactions, {
    foreignKey: 'orderId'
});
Transactions.belongsTo(Orders, {
    foreignKey: 'orderId'
});

// Modifiers to Categories
Categories.hasOne(Modifiers, {
    foreignKey: 'categoryId'
});
Modifiers.belongsTo(Categories, {
    foreignKey: 'categoryId'
});

// Menu Items to Modifiers
Modifiers.hasMany(MenuItems, {
    foreignKey: 'modifierId'
});
MenuItems.belongsTo(Modifiers, {
    foreignKey: 'modifierId'
});

// Menu Items to Sizes
Sizes.hasMany(MenuItems, {
    foreignKey: 'sizeId'
});
MenuItems.belongsTo(Sizes, {
    foreignKey: 'sizeId'
});

// Modifiers to Categories
Categories.hasOne(Sizes, {
    foreignKey: 'categoryId'
});
Sizes.belongsTo(Categories, {
    foreignKey: 'categoryId'
});

module.exports = { Categories, Customers, Employees, MenuItems, Orders, Transactions, Modifiers, Sizes };
