const router = require('express').Router();

// require models here

// require auth here

router.get('/', async (req, res) => {
  res.render('homepage', {
    layout: 'dashboard',
  });
});

router.get('/about', async (req, res) => {
  res.render('about-us', {
    layout: 'dashboard',
  });
});

router.get('/menu', async (req, res) => {
  res.render('menu', {
    layout: 'dashboard',
  });
});

router.get('/scores', async (req, res) => {
  res.render('baseball', {
    layout: 'dashboard',
  });
});

router.get('/reviews', async (req, res) => {
  res.render('yelp', {
    layout: 'dashboard',
  });
});
module.exports = router;
