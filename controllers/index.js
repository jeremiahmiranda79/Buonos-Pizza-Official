const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./html');

// HTML and API routes are kept seperate
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;