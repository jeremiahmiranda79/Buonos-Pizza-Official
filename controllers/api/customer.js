const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Customers, Sizes  } = require('../../models');


/***** READ ******/

// Route to retireve all Customers
// GET method with endpoint '/api/customer'
router.get('/', async (req, res) => {
    try {
        const allCustomers = await Customers.findAll();
        res.status(200).json(allCustomers);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to retireve a single Customer
// GET method with endpoint '/api/customer/:customerId'
router.get('/:customerId', async (req, res) => {
    try {
        const oneCustomer = await Customers.findByPk(req.params.customerId);
        res.status(200).json(oneCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** CREATE ******/

// Route to create new Customer
// GET method with endpoint '/api/customer'
router.post('/', async (req, res) => {
    try {
        const newCustomer = await Customers.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            // create session variables based on the newly signed up user
            (req.session.userId = newCustomer.id), (req.session.loggedIn = true);
            res.status(201).json(newCustomer); // 201 - Created
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** UPDATE ******/

// Route to update Customer
// GET method with endpoint '/api/customer/:customerId'
router.put('/:customerId', async (req, res) => {
    try {
        const updatedCustomer = await Customers.update(req.body, {
            where: {
                id: req.params.customerId
            },
        });
        console.log(updatedCustomer);
        if (!updatedCustomer[0]) return res.status(404).json({ message: 'No customer found.' }); // 404 - Not Found
        res.status(202).json(updatedCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** DELETE ******/

// Route to delete Customer
// GET method with endpoint '/api/customer/:customerId'
router.delete('/:customerId', async (req, res) => {
    try {
        const deletedCustomer = await Customers.destroy({
            where: {
                id: req.params.customerId
            },
        });
        console.log(deletedCustomer);
        if (!deletedCustomer) return res.status(404).json({ message: 'No customer found.' }); // 404 - Not Found
        res.status(202).json(deletedCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** LOGIN ******/

// route to login an existing customer
// POST method with endpoint '/api/customer/login'
// expects {"email":"estainburn0@europa.eu","password":"password"}
router.post('/login', async (req, res) => {
    try {
        const user = await Customers.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log('user', user.toJSON());
        if (!user) return res.status(400).json({ message: 'The email or password is incorrect.' });
        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) return res.status(400).json({ message: 'The email or password is incorrect.' });
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.admin = false;
            req.session.loggedIn = true;
            res.status(202).json(user);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
});


/***** LOGOUT ******/

// route to logout an existing customer
// POST method with endpoint '/api/customer/logout' 
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end(); // 204 - No Content
        });
    } else {
        res.status(404).end();
    };
});

module.exports = router;