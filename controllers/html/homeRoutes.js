const router = require('express').Router();
const { json } = require('sequelize');
const sequelize = require('../../config/connection');
const { Categories, MenuItems, Modifiers, PizzaToppings  } = require('../../models');

router.get('/', async (req, res) => {

  res.render('meet-the-team'
      // res.render('404-pages');
      // res.render('about-us');
      // res.render('baseball');
      // res.render('category-filters');
      // res.render('contact-us');
      // res.render('deactivate-account');
      // res.render('homepage');
      // res.render('meet-the-team');
      // res.render('menu-main');
      // res.render('product-quick-view');
      // res.render('shopping-cart');
      // res.render('sign-in-registration');
      // res.render('store-navigation');
      // res.render('yelp');
      // res.render('create-an-account');
      , {
        layout: 'main',
  });
});

router.get('/about', async (req, res) => {
  res.render('about-us', {
    layout: 'main',
  });
});

router.get('/test', async (req, res) => {
    try {
        const categories = await Categories.findAll();
        const menuitems = await MenuItems.findAll();
        const modifiers = await Modifiers.findAll();

        const serializedCategories = categories.map((category) => category.get({ plain: true }));
        const serializedMenuitems = menuitems.map((menuitem) => menuitem.get({ plain: true }));
        const serializedModifiers = modifiers.map((modifier) => modifier.get({ plain: true }));

        // console.log(serializedCategories);
        // console.log(serializedMenuitems);
        console.log(serializedModifiers);
        res.status(200).render('test', {
            category: serializedCategories,
            menuitem: serializedMenuitems,
            modifiers: serializedModifiers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
router.get('/test/:id', async (req, res) => {
    try {
        const menuItem = await MenuItems.findByPk(req.params.id);
        const modifiers = await Modifiers.findAll();
        const serializedMenuitem = menuItem.get({ plain: true })
        const serializedModifiers = modifiers.map((modifier) => modifier.get({ plain: true }));
        console.log(serializedMenuitem);
        console.log(serializedModifiers);
        res.status(200).render('testsingle', {
            menuitem: serializedMenuitem,
            mods: serializedModifiers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
router.get('/anothertest', async (req, res) => {
    try {
        const menuItem = await Categories.findAll({
            include: [{ 
                model: MenuItems, 
                include: { 
                    model: Modifiers, 
                    attributes: { 
                        exclude: 
                        [
                            'id', 
                            'categoryId', 
                            'notesForTheKitchen', 
                            'createdAt', 
                            'updatedAt'
                        ] } }, 
                        attributes: { 
                            exclude: 
                            [
                                'id', 
                                'categoryId', 
                                'modifierId', 
                                'employeeId', 
                                'createdAt', 
                                'updatedAt', 
                                'menuItemIds'
                            ] } }],
            attributes: {
                exclude: 
                [
                    'id', 
                    'createdAt', 
                    'updatedAt'],
            }
        });
        const serializedMenuitems = menuItem.map((menuitem) => menuitem.get({ plain: true }));
        res.status(200).render('anothertest', {
            items: serializedMenuitems
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

router.get('/menu', async (req, res) => {

    // ******* need to make a fetch call to the api endpoint



  const menu = await MenuItems.findAll();
  const items = menu.map((item) => item.get({ plain: true }));

  const cats = await Categories.findAll();
  const categories = cats.map((cat) => cat.get({ plain: true }));

  const menuObject = {
      Pizzas: [],
      Calzones: [],
      Strombolies: [], 
      Appetizers: [],
      Salads: [],
      Entrees: [],
      Pastas: [],
      Salads: [],
      HotSubs: [],
      ColdSubs: [],
      SideOrders: [],
      Desserts: [],
      Beverages: [],
      NY_Speacialies: []
  };

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 1) {
          menuObject.Pizzas.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 2) {
          menuObject.Calzones.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 3) {
          menuObject.Strombolies.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 4) {
          menuObject.Appetizers.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 5) {
          menuObject.Salads.push(items[i]);
      }
  }
  
  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 6) {
          menuObject.Entrees.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 7) {
          menuObject.Pastas.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 8) {
          menuObject.HotSubs.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 9) {
          menuObject.ColdSubs.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 10) {
          menuObject.SideOrders.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 11) {
          menuObject.Desserts.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 12) {
          menuObject.Beverages.push(items[i]);
      }
  }

  for (let i = 0; i < items.length; i++) {
      if (items[i].categoryId == 13) {
          menuObject.NY_Speacialies.push(items[i]);
      }
  }

  res.render('menu', {
     items, categories, menuObject
  });

});


router.get('/:menuItemId', async (req, res) => {

    // ******* need to make a fetch call to the api endpoint

  try {

    // const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
    //     attributes: {
    //         exclude: ['id', 'createdAt', 'updatedAt', 'categoryId', 'employeeId', 'menuItemIds']
    //     }
    // });

    const menuItem = await MenuItems.findByPk(req.params.menuItemId);
    const pizzaToppings = await PizzaToppings.findAll();
    const topping = pizzaToppings.map((top) => top.get({ plain: true }));

    //const item = menuItem.map((x) => x.get({ plain: true }));
    //const item = menuItem => menuItem.get({plain: true})
    //console.log(json.item);

    // const item = menuItem.get({plain: true});

    // const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
    //     // Working to view the modifiers when viewing one menu item

    //     // include: [
    //     //     [
    //     //         sequelize.literal(`SELECT menuitems.*, modifiers.*
    //     //         FROM menuitems
    //     //         LEFT OUTER JOIN modifiers ON menuitems.id = modifiers.categoryId
    //     //         WHERE menuitems.id = ${req.params.menuItemId};`),
    //     //         'modifiers'
    //     //     ]
    //     // ],
        
    //     attributes: {
    //         exclude: ['id', 'createdAt', 'updatedAt', 'categoryId', 'employeeId', 'menuItemIds']
    //     }
    // });

    //res.status(200).json(menuItem);
    //res.status(200).json(topping);
    
    res.render('product-quick-view', {
        item,
        topping
    })
} catch (error) {
    console.log(error);
    res.status(500).json(error); // 500 - internal server error
};
});


router.get('/scores', async (req, res) => {
  res.render('baseball');
});

router.get('/reviews', async (req, res) => {
  res.render('yelp');
});

// Render employee signup page
router.get('/employee/signup', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('dashboard');
    res.status(200).render('testEmployeeSignup');
});
// Render customer signup page
router.get('/customer/signup', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('dashboard');
    res.status(200).render('testCustomerSignup');
});

// Render login page
router.get('/employee/login', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('dashboard');
    res.status(200).render('testEmployeeLogin');
});
// Render login page
router.get('/customer/login', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('dashboard');
    res.status(200).render('testCustomerLogin');
});

module.exports = router;
