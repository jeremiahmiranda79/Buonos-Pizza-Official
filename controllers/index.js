const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./html');
// const mainRoutes = require('./homeRoutes');
// const main1Routs = require('./dashboard');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);
// Adding new routes to basic pages
//router.use('/someThing', something);


router.use('/api', apiRoutes);

module.exports = router;