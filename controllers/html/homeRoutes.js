const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Categories, MenuItems, Modifiers, Sizes, Employees  } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage');
});

router.get('/about', async (req, res) => {
  res.render('about-us');
});

router.get('/contact', async (req, res) => {
    res.render('contact-us');
  });

  router.get('/meet', async (req, res) => {
    res.render('meet-the-team');
  });

// Route gets all menu items, with modifiers attached to each item
router.get('/menu', async (req, res) => {
    try {
        const admin = req.session.admin;
        const menu = await Categories.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']//'id'
            },
            include: [
                {model: MenuItems, attributes: {
                    exclude: ['categoryId', 'modifierId', 'employeeId', 'createdAt', 'updatedAt', 'menuItemIds']//'id'
                }},
                {model: Modifiers, attributes: { 
                    exclude: ['categoryId', 'notesForTheKitchen', 'createdAt', 'updatedAt' ]//'id'
                }},
                {model: Sizes}
            ]
        });
        const serializedMenuitems = menu.map((menuitem) => menuitem.get({ plain: true }));
        res.status(200).render('menu', {
            category: serializedMenuitems,
            isAdmin: admin
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Router to get a menuitem by Id, to display single menu item, with mods
router.get('/menu/:menuItemId', async (req, res) => {
    try {
        const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
            include: [
                {model: Categories},
                {model: Modifiers, attributes: { 
                    exclude: ['id', 'categoryId', 'notesForTheKitchen', 'createdAt', 'updatedAt']
                }},
                {model: Sizes, attributes: {
                    exclude: ['id', 'categoryId', 'notesForTheKitchen', 'createdAt', 'updatedAt']
                }}
            ] 
        });

        const serializedItem = menuItem.get({ plain: true });

        function removeNull(_serializedItem) {
            return Object.fromEntries(
              Object.entries(_serializedItem)
                .filter(([_, value]) => value != null)
                .map(([key, value]) => [
                  key,
                  value === Object(value) ? removeNull(value) : value,
                ]),
            );
        }

        const result = removeNull(serializedItem);

        console.log(result);

        res.status(200).render('product-quick-view', {
            item: result 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

router.get('/newmenu', async (req, res) => {
    try {
        const menu = await Categories.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']//'id'
            },
            include: [
                {model: MenuItems, attributes: {
                    exclude: ['categoryId', 'modifierId', 'employeeId', 'createdAt', 'updatedAt', 'menuItemIds']//'id'
                }},
                {model: Modifiers, attributes: { 
                    exclude: ['categoryId', 'notesForTheKitchen', 'createdAt', 'updatedAt' ]//'id'
                }},
                {model: Sizes}
            ]
        });
        const serializedMenuitems = menu.map((menuitem) => menuitem.get({ plain: true }));
        res.status(200).render('newmenu', {
            category: serializedMenuitems
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Router to get a menuitem by Id, to display single menu item, with mods
router.get('/newmenu/:menuItemId', async (req, res) => {
    try {
        const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
            include: [
                {model: Categories},
                {model: Modifiers, attributes: { 
                    exclude: ['id', 'categoryId', 'notesForTheKitchen', 'createdAt', 'updatedAt']
                }}
            ] 
        });

        const serializedItem = menuItem.get({ plain: true });

        function removeNull(_serializedItem) {
            return Object.fromEntries(
              Object.entries(_serializedItem)
                .filter(([_, value]) => value != null)
                .map(([key, value]) => [
                  key,
                  value === Object(value) ? removeNull(value) : value,
                ]),
            );
        }

        const result = removeNull(serializedItem)

        console.log(result);

        res.status(200).render('product-quick-view', {
            item: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route gets all menu items by category with modifier attached to category instead of individual menu items
router.get('/menuItemsMods', async (req, res) => {
    try {
        const menuItem = await Categories.findAll({
            include: [{ 
                model: MenuItems, 
                include: { 
                    model: Modifiers, 
                    attributes: { 
                        exclude: [ 'id', 'categoryId', 'notesForTheKitchen', 'createdAt', 'updatedAt' ]
                     } }, 
                        attributes: { 
                            exclude: [ 'id', 'categoryId', 'modifierId', 'employeeId', 'createdAt', 'updatedAt', 'menuItemIds' ] 
                            } }],
            attributes: {
                exclude: [ 'id', 'createdAt', 'updatedAt' ],
            }
        });
        const serializedMenuitems = menuItem.map((menuitem) => menuitem.get({ plain: true }));
        console.log(serializedMenuitems[0]);
        res.status(200).render('test', {
            category: serializedMenuitems
        });
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
  if (req.session.loggedIn) return res.redirect('../');
    res.status(200).render('create-an-account-employee');
});
// Render customer signup page
router.get('/customer/signup', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('../');
    res.status(200).render('create-an-account-customer');
});

// Render login page
router.get('/employee/login', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('../');
    res.status(200).render('sign-in-employee');
});
// Render login page
router.get('/customer/login', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('../');
    res.status(200).render('sign-in-customer');
});

// Route to add a category
router.get('/categories/create', withAuth, async (req, res) => {
    try {
        const categories = await Categories.findAll();
        const cats = categories.map((x) => x.get({ plain: true }));
        res.status(200).render('create-category', {
            cats
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to update a category
router.get('/categories/update/:catId', withAuth, async (req, res) => {
    try {
        const category = await Categories.findOne({
            where: {
            id: req.params.catId,
            }
        });
        const cat = category.get({ plain: true })
        res.status(200).render('update-category', {
            cat
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// Route to add a menu item
router.get('/menuitems/create', withAuth, async (req, res) => {
    try {
        const categories = await Categories.findAll();
        const sizes = await Sizes.findAll();
        const modifiers = await Modifiers.findAll();
        const employees = await Employees.findAll();
        const menuitems = await MenuItems.findAll();
        const cats = categories.map((cat) => cat.get({ plain: true }));
        const size = sizes.map((siz) => siz.get({ plain: true }));
        const mods = modifiers.map((mod) => mod.get({ plain: true }));
        const emps = employees.map((emp) => emp.get({ plain: true }));
        const items = menuitems.map((item) => item.get({ plain: true }));
        res.status(200).render('create-menu-item', {
            items, cats, size, mods, emps
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to update a menu item
router.get('/menuitems/update/:menuitemId', withAuth, async (req, res) => {
    try {
        const categories = await Categories.findAll();
        const sizes = await Sizes.findAll();
        const modifiers = await Modifiers.findAll();
        const employees = await Employees.findAll();
        const menuitem = await MenuItems.findOne({
            where: {
            id: req.params.menuitemId,
            }
        });
        const cats = categories.map((cat) => cat.get({ plain: true }));
        const size = sizes.map((siz) => siz.get({ plain: true }));
        const mods = modifiers.map((mod) => mod.get({ plain: true }));
        const emps = employees.map((emp) => emp.get({ plain: true }));
        const item = menuitem.get({ plain: true })
        res.status(200).render('update-menu-item', {
            item, cats, size, mods, emps
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

module.exports = router;