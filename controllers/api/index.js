const router = require('express').Router();

const menuRoutes = require('./menu');
const customerRoutes = require('./customer');
const employeeRoutes = require('./employee');

// Kept this one simple 
router.use('/menu', menuRoutes);
router.use('/customer', customerRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;