const router = require('express').Router();

const homeRoutes = require('./homeRoutes');

// Will split in the near future, once we are done perfecting the routes and all changes pushed
router.use('/', homeRoutes);

module.exports = router;