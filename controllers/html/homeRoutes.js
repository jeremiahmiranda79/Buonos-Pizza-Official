const router = require('express').Router();
const { Categories, MenuItems, Modifiers } = require('../../models');

router.get('/', async (req, res) => {
  res.render('homepage', {
    layout: 'main',
  });
});

router.get('/about', async (req, res) => {
  res.render('about-us', {
    layout: 'main',
  });
});

// Route gets all menu items, with modifiers attached to each item
router.get('/menu', async (req, res) => {
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
                }}
            ]
        });
        const serializedMenuitems = menu.map((menuitem) => menuitem.get({ plain: true }));
        res.status(200).render('menu', {
            layout: 'main',
            category: serializedMenuitems
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
            layout: 'main',
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
            layout: 'main',
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
  if (req.session.loggedIn) return res.redirect('main');
    res.status(200).render('testEmployeeSignup');
});
// Render customer signup page
router.get('/customer/signup', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('main');
    res.status(200).render('testCustomerSignup');
});

// Render login page
router.get('/employee/login', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('main');
    res.status(200).render('testEmployeeLogin');
});
// Render login page
router.get('/customer/login', async (req, res) => {
  if (req.session.loggedIn) return res.redirect('main');
    res.status(200).render('testCustomerLogin');
});

module.exports = router;
