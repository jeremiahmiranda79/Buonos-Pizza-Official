const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Employees } = require('../../models');


/***** READ ******/

// Route to retireve all Employees
// GET method with endpoint '/api/employee'
router.get('/', async (req, res) => {
    try {
        const allEmployees = await Employees.findAll();
        res.status(200).json(allEmployees);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});
// Route to retireve a single Employee
// GET method with endpoint '/api/customer/:employeeId'
router.get('/:employeeId', async (req, res) => {
    try {
        const oneEmployee = await Employees.findByPk(req.params.employeeId);
        res.status(200).json(oneEmployee);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** CREATE ******/

// Route to create new Employee
// GET method with endpoint '/api/employee'
router.post('/', async (req, res) => {
    try {
        const newEmployee = await Employees.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            admin: req.body.admin,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            // create session variables based on the newly signed up employee
            (req.session.userId = newEmployee.id), (req.session.loggedIn = true);
            res.status(201).json(newEmployee); // 201 - Created
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** UPDATE ******/

// Route to update Employee
// GET method with endpoint '/api/customer/:employeeId'
router.put('/:employeeId', async (req, res) => {
    try {
        const updatedEmployee = await Employees.update(req.body, {
            where: {
                id: req.params.employeeId
            },
        });
        console.log(updatedEmployee);
        if (!updatedEmployee[0]) return res.status(404).json({ message: 'No employee found.' }); // 404 - Not Found
        res.status(202).json(updatedEmployee);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** DELETE ******/

// Route to delete Employee
// GET method with endpoint '/api/employee/:employeeId'
router.delete('/:employeeId', async (req, res) => {
    try {
        const deletedEmployee = await Employees.destroy({
            where: {
                id: req.params.employeeId
            },
        });
        console.log(deletedEmployee);
        if (!deletedEmployee) return res.status(404).json({ message: 'No employee found.' }); // 404 - Not Found
        res.status(202).json(deletedEmployee);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); // 500 - internal server error
    };
});


/***** LOGIN ******/

// route to login an existing employee
// POST method with endpoint '/api/employee/login'
// expects {"email":"ogogin0@vk.com","password":"password"}
router.post('/login', async (req, res) => {
    try {
        const user = await Employees.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) return res.status(400).json({ message: 'The email or password is incorrect.' });
        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) return res.status(400).json({ message: 'The email or password is incorrect.' });
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.admin = user.admin;
            req.session.loggedIn = true;
            res.status(202).json(user);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
});


/***** LOGOUT ******/

// route to logout an existing employee
// POST method with endpoint '/api/employee/logout'
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