const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Categories, MenuItems, Modifiers, Sizes  } = require('../../models');

/***** READ ******/
// Route to retireve all Menu Items & Categories
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

// Route to get Categories
// GET route with endpoint '/api/menu/categories'
router.get('/categories', async (req, res) => {
    try {
        const menuItem = await Categories.findAll({
            include: [
                { 
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
                        ]} }, 
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

// Route to get menu items by menu items, not through categories
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

// Route for menu items with sizes, mods, categories
// GET with endpoint '/api/menu/sizes'
router.get('/TEST', async (req, res) => {
    try {
        const menuItems = await MenuItems.findAll();
        res.status(200).json(menuItems);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

/***** CREATE ******/
// Route to create new Menu Item
// POST method with endpoint '/api/menu/newitem'
// router.post('/newitem', async (req, res) => {
//     try {
//         const newMenuItem = await MenuItems.create({
//             categoryId: req.body.categoryId,
//             employeeId: req.body.employeeId,
//             name: req.body.name,
//             description: req.body.description,
//             price: req.body.price,
//             quantity: req.body.quantity
//         });
//         res.status(201).json(newMenuItem);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error); // 500 - internal server error
//     };
// });

/***** CREATE ******/
// Route to create new Menu Item
// POST method with endpoint '/api/menu/newitem'
//! Edited to be post and redirect to menu instead of json.
router.post('/newitem', async (req, res) => {
    try {
        const newMenuItem = await MenuItems.create({
            categoryId: req.body.categoryId,
            employeeId: req.body.employeeId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        });
        res.status(201).redirect('/menu');
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// // Route to create new Category
// // POST method with endpoint '/api/menu/newcategory'
// router.post('/newcategory', async (req, res) => {
//     try {
//         const newCategory = await Categories.create({
//             name: req.body.name
//         });
//         res.status(201).json(newCategory);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error); // 500 - internal server error
//     };
// });

// Route to create new Category
// POST method with endpoint '/api/menu/newcategory'
//! Edited to redirect to menu instead of json.
router.post('/newcategory', async (req, res) => {
    try {
        console.log("New Category")
        const newCategory = await Categories.create({
            name: req.body.name
        });
        res.status(201).redirect('/menu');
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// /***** UPDATE ******/
// // Route to update new Menu Item
// // PUT method with endpoint '/api/menu/updateMenuItem/:menuItemId'
// router.put('/updateMenuItem/:menuItemId', async (req, res) => {
//     try {
//         const updatedMenuItem = await MenuItems.update(req.body, {
//             where: {
//                 id: req.params.menuItemId
//             },
//         });
//         console.log(updatedMenuItem);
//         if (!updatedMenuItem[0]) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
//         res.status(202).json(updatedMenuItem);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error); // 500 - internal server error
//     };
// });

/***** UPDATE ******/
// Route to update new Menu Item
// PUT method with endpoint '/api/menu/updateMenuItem/:menuItemId'
//! Edited to be post and redirect to menu instead of json.
router.post('/updateMenuItem/:menuItemId', async (req, res) => {
    try {
        const updatedMenuItem = await MenuItems.update(req.body, {
            where: {
                id: req.params.menuItemId
            },
        });
        console.log(updatedMenuItem);
        if (!updatedMenuItem[0]) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
        res.status(202).redirect('/menu');
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// // Route to update new Category
// // PUT method with endpoint '/api/menu/updateCategory/:categoryId'
// router.put('/updateCategory/:categoryId', async (req, res) => {
//     try {
//         const updatedCategory = await Categories.update(req.body, {
//             where: {
//                 id: req.params.categoryId
//             },
//         });
//         console.log(updatedCategory);
//         if (!updatedCategory[0]) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
//         res.status(202).json(updatedCategory);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error); // 500 - internal server error
//     };
// });

// Route to update new Category
// PUT method with endpoint '/api/menu/updateCategory/:categoryId'
router.post('/updateCategory/:categoryId', async (req, res) => {
    try {
        const updatedCategory = await Categories.update(req.body, {
            where: {
                id: req.params.categoryId
            },
        });
        console.log(updatedCategory);
        if (!updatedCategory[0]) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
        res.status(202).redirect('/menu');
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// /***** DELETE ******/
// // Route to delete Menu Item
// // DELETE method with endpoint '/api/menu/deleteMenuItem/:menuItemId'
// router.delete('/deleteMenuItem/:menuItemId', async (req, res) => {
//     try {
//         const deletedMenuItem = await MenuItems.destroy({
//             where: {
//                 id: req.params.menuItemId
//             },
//         });
//         console.log(deletedMenuItem);
//         if (!deletedMenuItem) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
//         res.status(202).json(deletedMenuItem);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error); // 500 - internal server error
//     };
// });

/***** DELETE ******/
// Route to delete Menu Item
// DELETE method with endpoint '/api/menu/deleteMenuItem/:menuItemId'
//! Edited to be post and redirect to menu instead of json.
router.post('/deleteMenuItem/:menuItemId', async (req, res) => {
    try {
        const deletedMenuItem = await MenuItems.destroy({
            where: {
                id: req.params.menuItemId
            },
        });
        console.log(deletedMenuItem);
        if (!deletedMenuItem) return res.status(404).json({ message: 'No menu item found.' }); // 404 - Not Found
        res.status(202).redirect('/menu');
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

// // Route to delete Menu Item
// // DELETE method with endpoint '/api/menu/deleteCategory/:categoryId'
// router.delete('/deleteCategory/:categoryId', async (req, res) => {
//     try {
//         const deletedCategory = await Categories.destroy({
//             where: {
//                 id: req.params.categoryId
//             },
//         });
//         console.log(deletedCategory);
//         if (!deletedCategory) return res.status(404).json({ message: 'No category found.' }); // 404 - Not Found
//         res.status(202).json(deletedCategory);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error); // 500 - internal server error
//     };
// });

//Post method to delete category
//! Edited to redirect to menu instead of json.
router.post('/delcategory/:categoryId', async (req, res) => {
    try {
        console.log("Delete Category")
        const deletedMenuItem = await Categories.destroy({
            where: {
                id: req.params.categoryId
            },
        });
        res.status(201).redirect('/menu');
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});

module.exports = router;