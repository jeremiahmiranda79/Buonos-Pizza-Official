const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Categories, MenuItems, Modifiers, Sizes  } = require('../../models');
// For some reazon the Sizes table wouldn't show in Insomnia, but I am able to use it just fine on the HTML side. It shows null no matter what I do, it is probably a simple fix too... -John


/***** READ ******/

// Route to retireve all Menu Items & Categories & Modifiers, sorted by category, with modifiers tied to each category
// GET method with endpoint '/api/menu'
router.get('/', async (req, res) => {
    try {
        const menu = await Categories.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            },
            include: [
                {model: MenuItems, attributes: {
                    exclude: ['id', 'categoryId', 'employeeId', 'createdAt', 'updatedAt', 'menuItemIds']
                }},
                {model: Modifiers},
            ]
        });
        res.status(200).json(menu);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to get Menu Items, sorted by Category, with Modifiers attached to each Menu Item 
// GET route with endpoint '/api/menu/categories'
router.get('/categories', async (req, res) => {
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
        res.status(200).json(menuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to get Single Category
// GET route with endpoint '/api/menu/categories/:catId'
router.get('/categories/:catId', async (req, res) => {
    try {
        const category = await Categories.findOne({
            where: {
            id: req.params.catId,
            }
        });
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to get Menu Items, not through Categories
// GET route with endpoint '/api/menu/unsorted'
router.get('/unsorted', async (req, res) => {
    try {
        const menuItems = await MenuItems.findAll();
        res.status(200).json(menuItems);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to retireve a single Menu Item
// GET method with endpoint '/api/menu/:menuItemId'
router.get('/:menuItemId', async (req, res) => {
    try {
        const menuItem = await MenuItems.findByPk(req.params.menuItemId, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']//'id', 'categoryId', 'employeeId', 'menuItemIds'
            },
            include: [
                {model: Categories},
                {model: Modifiers}
            ] 
        });
        res.status(200).json(menuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** CREATE ******/

// Route to create new Menu Item
// POST method with endpoint '/api/menu/newitem'
router.post('/newitem', async (req, res) => {
    try {
        const newMenuItem = await MenuItems.create({
            categoryId: req.body.categoryId,
            employeeId: req.body.employeeId,
            modifierId: req.body.modifierId,
            sizeId: req.body.sizeId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.status(201).json(newMenuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to create new Category
// POST method with endpoint '/api/menu/newcategory'
router.post('/newcategory', async (req, res) => {
    try {
        const newCategory = await Categories.create({
            name: req.body.name
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** UPDATE ******/

// Route to update a Menu Item
// PUT method with endpoint '/api/menu/updateMenuItem/:menuItemId'
router.put('/updateMenuItem/:menuItemId', async (req, res) => {
    try {
        const updatedMenuItem = await MenuItems.update(req.body, {
            where: {
                id: req.params.menuItemId
            },
        });
        console.log(updatedMenuItem);
        if (!updatedMenuItem[0]) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
        res.status(202).json(updatedMenuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to update a Category
// PUT method with endpoint '/api/menu/updateCategory/:categoryId'
router.put('/updateCategory/:categoryId', async (req, res) => {
    try {
        const updatedCategory = await Categories.update(req.body, {
            where: {
                id: req.params.categoryId
            },
        });
        if (!updatedCategory[0]) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
        res.status(202).json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** DELETE ******/

// Route to delete a Menu Item
// DELETE method with endpoint '/api/menu/deleteMenuItem/:menuItemId'
router.delete('/deleteMenuItem/:menuItemId', async (req, res) => {
    try {
        const deletedMenuItem = await MenuItems.destroy({
            where: {
                id: req.params.menuItemId
            },
        });
        console.log(deletedMenuItem);
        if (!deletedMenuItem) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
        res.status(202).json(deletedMenuItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to delete a Category
// DELETE method with endpoint '/api/menu/deleteCategory/:categoryId'
router.delete('/deleteCategory/:categoryId', async (req, res) => {
    try {
        const deletedCategory = await Categories.destroy({
            where: {
                id: req.params.categoryId
            },
        });
        console.log(deletedCategory);
        if (!deletedCategory) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
        res.status(202).json(deletedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

module.exports = router;