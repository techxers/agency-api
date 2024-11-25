const express = require('express');
const bodyParser = require('body-parser');
const users = require('./users'); // Import users.js
const growers = require('./growers'); // Import growers.js
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const roles = require('./roles');
const auctionsale = require('./auctionsale');
const auth = require('./auth');
const { check } = require('express-validator'); // Correct import
const departments = require('./departments'); // Import CRUD routes
const gender = require('./gender'); // Import CRUD routes
const location = require('./location'); // Import CRUD routes
const grades = require('./grades'); // Import CRUD routes
const coffeeSeason = require('./season'); // Import CRUD routes
const agentsinfomation = require('./agentinfomation');
const bags = require('./bags');
const cors = require('cors');
const bank = require('./bank');
const certification = require('./certification');
const contactperson = require('./contactperson');
const coopSociety = require('./coop-society');
const factories = require('./factories');
const grnOutturnRoutes = require('./grnoutturns');
const growertype = require('./growertype');
const growerReturns = require('./growerreturns');
const material = require('./material');
const millercharges = require('./millercharges');
const outturnGrades = require('./outturngrades');
const outturns = require('./outturns');
const paymentmode = require('./paymentmode');
const payments = require('./payment');
const outturnQuality = require('./outturnquality');
const perchmenttypes = require('./perchmenttype');
const trackReoffer = require('./track_reoffer');
const stocks = require('./stocks');
const sampleType = require('./sampletype');
const saleStatus = require('./salestatus');
const quality = require('./quality');
const qualityParameter = require('./qualityparameters');
const qualitySize = require('./qualitysize');
const qualityClass = require('./qualityclasses');
const qualityGroup = require('./qualitygroup');
const regionCounty = require('./regioncounty');
const qualityGreenDefect = require('./qualitygreendefects');
const saleType = require('./saletype');
const standardization = require('./standardization');
const agent = require('./agent');
const cleanTypes = require('./cleantype');
const agentCategory = require('./agentcategory');
const chargesType = require('./chargestype');
const grnMain = require('./grn_main');
const warrants = require('./warrant');
const Internal_bulks = require('./internal_bulks');

const app = express();
// Use CORS middleware
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(cors({
    origin: 'http://134.122.56.219', // Your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));


app.use(bodyParser.json());

// Serve Swagger UI at the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with all necessary fields.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - username
 *               - password
 *               - email
 *             properties:
 *               surname:
 *                 type: string
 *                 description: Sir name of the user
 *               username:
 *                 type: string
 *                 description: Username for login
 *               password:
 *                 type: string
 *                 description: Password for login
 *                 format: password
 *               email:
 *                 type: string
 *                 description: User email
 *               IsActive:
 *                 type: boolean
 *                 description: Whether the user is active
 *                 default: false
 *               employeeNo:
 *                 type: integer
 *                 description: Employee number
 *               wodrkExtension:
 *                 type: integer
 *                 description: Work extension number
 *               genderId:
 *                 type: integer
 *                 description: Gender ID
 *               departmentId:
 *                 type: integer
 *                 description: Department ID
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the user was createds
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *               roleId:
 *                 type: integer
 *                 description: Role ID of the user
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       409:
 *         description: Username or email already taken
 */

app.post('/register', [
    check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], auth.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid username or password
 */
app.post('/login', [
    check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], auth.login);

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred' });
});


// Define the user routes with JSDoc comments for Swagger
app.get('/users', users.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Details of the user
 *   put:
 *     summary: Update a user by ID
 *     tags:
 *      - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *     responses:
 *       200:
 *         description: User updated successfully
 */
app.get('/users/:id', users.getUserById);
app.put('/users/:id', users.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
app.delete('/users/:id', users.deleteUser);

// Define the grower routes with JSDoc comments for Swagger
/**
 * @swagger
 * /growers:
 *   post:
 *     summary: Create a new grower
 *     tags:
 *       - Growers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the grower
 *               location:
 *                 type: string
 *                 description: Location of the grower
 *     responses:
 *       201:
 *         description: Grower created successfully
 */
app.post('/growers', growers.createGrower);
/**
 * @swagger
 * /growers:
 *   get:
 *     summary: Get all growers
 *     tags:
 *       - Growers
 *     responses:
 *       200:
 *         description: List of growers
 */
app.get('/growers', growers.getAllGrowers);
app.get('/growers/:id', growers.getGrowerById);
app.put('/growers/:id', growers.updateGrower);
app.delete('/growers/:id', growers.deleteGrower);



/**
 * @swagger
 * /growers/{id}:
 *   get:
 *     summary: Get a grower by ID
 *     tags:
 *       - Growers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Grower ID
 *     responses:
 *       200:
 *         description: Details of the grower
 *   put:
 *     summary: Update a grower by ID
 *     tags:
 *      - Growers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         description: Grower ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the grower
 *               location:
 *                 type: string
 *                 description: Location of the grower
 *     responses:
 *       200:
 *         description: Grower updated successfully
 */
app.get('/growers/:id', growers.getGrowerById);
app.put('/growers/:id', growers.updateGrower);
app.delete('/growers/:id', growers.deleteGrower);



/**
 * @swagger
 * /growers/{id}:
 *   delete:
 *     tags:
 *       - Growers
 *     summary: Delete a grower by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Grower ID
 *     responses:
 *       204:
 *         description: Grower deleted successfully
 */
app.delete('/growers/:id', growers.deleteGrower);
// Start the server
// Get all roles
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The role ID
 *                   role:
 *                     type: string
 *                     description: The role name
 *                   description:
 *                     type: string
 *                     description: Description of the role
 */
app.get('/roles', roles.getAllRoles);

// Get a role by ID
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the role to fetch
 *     responses:
 *       200:
 *         description: Details of the role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The role ID
 *                 role:
 *                   type: string
 *                   description: The role name
 *                 description:
 *                   type: string
 *                   description: Description of the role
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role not found"
 */
app.get('/roles/:id', roles.getRoleById);
// Create a new role
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "Role created successfully"
 */
app.post('/roles', roles.createRole);
// Update a role by ID
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role updated successfully"
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Role not found"
 */
app.put('/roles/:id', roles.updateRole);

// Delete a role by ID
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The role ID
 *     responses:
 *       204:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
app.delete('/roles/:id', roles.deleteRole);


app.get('/auctionsale', auctionsale.getAllAuctions);

/**
 * @swagger
 * /auctionsale:
 *   get:
 *     summary: Get all auctions
 *     tags:
 *       - Auction Sale
 *     responses:
 *       200:
 *         description: List of all auctions
 */
app.post('/auctionsale', auctionsale.createAuction);

/**
 * @swagger
 * /auctionsale:
 *   post:
 *     summary: Create a new auction
 *     tags:
 *       - Auction Sale
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SaleDate:
 *                 type: string
 *               SaleNumber:
 *                 type: string
 *               SaleDescription:
 *                 type: string
 *               IsOpen:
 *                 type: boolean
 *               PromptDate:
 *                 type: string
 *               SeasonID:
 *                 type: integer
 *               Weight:
 *                 type: number
 *               TotalLots:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Auction created
 */
app.get('/auctionsale/:id', auctionsale.getAuctionById);

/**
 * @swagger
 * /auctionsale/{id}:
 *   get:
 *     summary: Get an auction by ID
 *     tags:
 *       - Auction Sale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the auction
 *       404:
 *         description: Auction not found
 */
app.put('/auctionsale/:id', auctionsale.updateAuction);

/**
 * @swagger
 * /auctionsale/{id}:
 *   put:
 *     summary: Update an auction by ID
 *     tags:
 *       - Auction Sale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SaleDate:
 *                 type: string
 *               SaleNumber:
 *                 type: string
 *               SaleDescription:
 *                 type: string
 *               IsOpen:
 *                 type: boolean
 *               PromptDate:
 *                 type: string
 *               SeasonID:
 *                 type: integer
 *               Weight:
 *                 type: number
 *               TotalLots:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Auction updated
 *       404:
 *         description: Auction not found
 */
app.delete('/auctionsale/:id', auctionsale.deleteAuction);

/**
 * @swagger
 * /auctionsale/{id}:
 *   delete:
 *     summary: Delete an auction by ID
 *     tags:
 *       - Auction Sale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Auction deleted
 *       404:
 *         description: Auction not found
 */
app.get('/departments', departments.getAllDepartments);

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Fetch all departments
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: A list of all departments
 */
// Define CRUD routes for departments
/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Retrieve all departments
 *     responses:
 *       200:
 *         description: A list of departments.
 */
app.get('/departments/:id', departments.getDepartmentById);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Retrieve a department by ID
 *     tags:
 *       - Departments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the department to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single department.
 *       404:
 *         description: Department not found.
 */

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create a new department
 *     tags:
 *       - Departments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DepartmentName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully.
 *       400:
 *         description: Invalid input.
 */
app.post('/departments', departments.createDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Update an existing department
 *     tags:
 *       - Departments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the department to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DepartmentName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Department updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Department not found.
 */
app.put('/departments/:id', departments.updateDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   delete:
 *     summary: Delete a department by ID
 *     tags:
 *       - Departments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the department to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department deleted successfully.
 *       404:
 *         description: Department not found.
 */
app.delete('/departments/:id', departments.deleteDepartment);


// Define CRUD routes with Swagger documentation
/**
 * @swagger
 * /gender:
 *   get:
 *     summary: Get all genders
 *     tags:
 *       - Gender
 *     description: Retrieve a list of all genders in the database.
 *     responses:
 *       200:
 *         description: A list of all genders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   GenderID:
 *                     type: integer
 *                   GenderName:
 *                     type: string
 *                   GenderChar:
 *                     type: string
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *                   Remarks:
 *                     type: string
 */
app.get('/gender', gender.getAllGenders); // Get all genders

/**
 * @swagger
 * /gender/{id}:
 *   get:
 *     summary: Get gender by ID
 *     description: Retrieve a specific gender by its ID.
 *     tags:
 *       - Gender
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gender ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gender details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 GenderID:
 *                   type: integer
 *                 GenderName:
 *                   type: string
 *                 GenderChar:
 *                   type: string
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                 Remarks:
 *                   type: string
 *       404:
 *         description: Gender not found
 */
app.get('/gender/:id', gender.getGenderById); // Get gender by ID

/**
 * @swagger
 * /gender:
 *   post:
 *     summary: Create a new gender
 *     description: Create a new gender record in the database.
 *     tags:
 *       - Gender
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - GenderName
 *               - GenderChar
 *             properties:
 *               GenderName:
 *                 type: string
 *               GenderChar:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gender created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Gender already exists
 */
app.post('/gender', [
    check('GenderName').isLength({ min: 1 }).withMessage('GenderName is required'),
    check('GenderChar').isLength({ min: 1 }).withMessage('GenderChar is required'),
], gender.createGender); // Create a new gender

/**
 * @swagger
 * /gender/{id}:
 *   put:
 *     summary: Update a gender by ID
 *     description: Update an existing gender by its ID.
 *     tags:
 *       - Gender
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gender ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - GenderName
 *               - GenderChar
 *             properties:
 *               GenderName:
 *                 type: string
 *               GenderChar:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gender updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Gender not found
 */
app.put('/gender/:id', gender.updateGender); // Update a gender by ID

/**
 * @swagger
 * /gender/{id}:
 *   delete:
 *     summary: Delete a gender by ID
 *     description: Delete a gender record by its ID.
 *     tags:
 *       - Gender
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Gender ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gender deleted successfully
 *       404:
 *         description: Gender not found
 */
app.delete('/gender/:id', gender.deleteGender); // Delete a gender by ID

app.get('/countries', location.getAllCountries); // Get all countrys
/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     description: Retrieve a list of all countries.
 *     tags:
 *       - Gender
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CountryID:
 *                     type: integer
 *                   CountryName:
 *                     type: string
 *                   Code:
 *                     type: string
 *                   Remarks:
 *                     type: string
 */


app.get('/country/:id', location.getCountyById); // Get country by ID

/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Get country by ID
 *     description: Retrieve a specific country by its ID.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: country ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: country details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 countryID:
 *                   type: integer
 *                 countryName:
 *                   type: string
 *                 countryCode:
 *                   type: string
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                 Remarks:
 *                   type: string
 *       404:
 *         description: country not found
 */
app.post('/country', [
    check('countryName').isLength({ min: 1 }).withMessage('countryName is required'),
    check('countryCode').isLength({ min: 1 }).withMessage('countryCode is required'),
], location.createCountry); // Create a new country

/**
 * @swagger
 * /country:
 *   post:
 *     summary: Create a new country
 *     description: Create a new country record in the database.
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - countryName
 *               - countryCode
 *             properties:
 *               countryName:
 *                 type: string
 *               countryCode:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: country created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: country already exists
 */
app.put('/country/:id', location.updateCountry); // Update a country by ID

/**
 * @swagger
 * /country/{id}:
 *   put:
 *     summary: Update a country by ID
 *     description: Update an existing country by its ID.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: country ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - countryName
 *               - countryCode
 *             properties:
 *               countryName:
 *                 type: string
 *               countryCode:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: country updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: country not found
 */
app.delete('/country/:id', location.deleteCountry); // Delete a country by ID

/**
 * @swagger
 * /country/{id}:
 *   delete:
 *     summary: Delete a country by ID
 *     description: Delete a country record by its ID.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: country ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: country deleted successfully
 *       404:
 *         description: country not found
 */


app.get('/counties', location.getAllCounties); // Get all counties

// Get all counties
/**
 * @swagger
 * /counties:
 *   get:
 *     summary: Get all counties
 *     description: Retrieve a list of all counties.
 *     tags:
 *       - Location
 *     responses:
 *       200:
 *         description: A list of all counties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   CountyID:
 *                     type: integer
 *                   CountyName:
 *                     type: string
 *                   CountryID:
 *                     type: integer
 *                   RegionID:
 *                     type: integer
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *                   Remarks:
 *                     type: string
 */
app.get('/counties/:id', location.getCountyById); // Get county by ID

// Get county by ID
/**
 * @swagger
 * /counties/{id}:
 *   get:
 *     summary: Get county by ID
 *     description: Retrieve a specific county by its ID.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the county to retrieve
 *     responses:
 *       200:
 *         description: A specific county
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 CountyID:
 *                   type: integer
 *                 CountyName:
 *                   type: string
 *                 CountryID:
 *                   type: integer
 *                 RegionID:
 *                   type: integer
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                 Remarks:
 *                   type: string
 *       404:
 *         description: County not found
 */
app.post('/counties', [
    check('CountyName').isLength({ min: 1 }).withMessage('CountyName is required'),
    check('CountryID').isInt().withMessage('CountryID must be an integer'),
    check('RegionID').isInt().withMessage('RegionID must be an integer'),
], location.createCounty); // Create a new county

// Create a new county
/**
 * @swagger
 * /counties:
 *   post:
 *     summary: Create a new county
 *     description: Create a new county in the database.
 *     tags:
 *       - Location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - CountyName
 *               - CountryID
 *               - RegionID
 *             properties:
 *               CountyName:
 *                 type: string
 *               CountryID:
 *                 type: integer
 *               RegionID:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: County created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: County already exists
 */
app.put('/counties/:id', location.updateCounty); // Update a county by ID

// Update a county by ID
/**
 * @swagger
 * /counties/{id}:
 *   put:
 *     summary: Update a county by ID
 *     description: Update an existing county by its ID.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the county to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CountyName:
 *                 type: string
 *               CountryID:
 *                 type: integer
 *               RegionID:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: County updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: County not found
 */
app.delete('/counties/:id', location.deleteCounty); // Delete a county by ID

// Delete a county by ID
/**
 * @swagger
 * /counties/{id}:
 *   delete:
 *     summary: Delete a county by ID
 *     description: Delete a county by its ID.
 *     tags:
 *       - Location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the county to delete
 *     responses:
 *       200:
 *         description: County deleted successfully
 *       404:
 *         description: County not found
 */
app.get('/grades', grades.getAllGrades); // Get all grades

/**
 * @swagger
 * /grades:
 *   get:
 *     summary: Get all grades
 *     description: Retrieve a list of all grades.
 *     tags:
 *       - Grades
 *     responses:
 *       200:
 *         description: List of all grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   GradeID:
 *                     type: integer
 *                     description: The ID of the grade
 *                   Grade:
 *                     type: string
 *                     description: The grade name
 *                   CreatedON:
 *                     type: string
 *                     format: date-time
 *                   Remarks:
 *                     type: string
 *                     description: Remarks about the grade
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching grades"
 */
app.get('/grades/:id', grades.getGradeById); // Get grade by ID

/**
 * @swagger
 * /grades/{id}:
 *   get:
 *     summary: Get a grade by ID
 *     description: Retrieve a specific grade by its ID.
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the grade to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grade details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 GradeID:
 *                   type: integer
 *                 Grade:
 *                   type: string
 *                 CreatedON:
 *                   type: string
 *                   format: date-time
 *                 Remarks:
 *                   type: string
 *       404:
 *         description: Grade not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Grade not found"
 *       500:
 *         description: Internal server error
 */
app.post('/grades', grades.createGrade); // Get grade by ID

/**
 * @swagger
 * /grades:
 *   post:
 *     summary: Create a new grade
 *     description: Create a new grade in the database.
 *     tags:
 *       - Grades
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Grade
 *             properties:
 *               Grade:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Grade created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Grade created"
 *                 GradeID:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       param:
 *                         type: string
 *                       msg:
 *                         type: string
 *       500:
 *         description: Error creating grade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.delete('/grades/:id', grades.deleteGrade); // Get grade by ID

/**
 * @swagger
 * /grades/{id}:
 *   delete:
 *     summary: Delete a grade by ID
 *     description: Delete a grade by its ID.
 *     tags:
 *       - Grades
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the grade to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grade deleted successfully
 *       404:
 *         description: Grade not found
 *       500:
 *         description: Internal server error
 */
app.get('/coffeeseasons', coffeeSeason.getAllCoffeeSeasons); // Get all coffee seasons

/**
 * @swagger
 * /coffeeseasons:
 *   get:
 *     summary: Get all coffee seasons
 *     description: Retrieve a list of all coffee seasons.
 *     tags:
 *       - Coffee Seasons
 *     responses:
 *       200:
 *         description: List of all coffee seasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   SeasonID:
 *                     type: integer
 *                     description: Season identifier
 *                   Year:
 *                     type: string
 *                     description: Year of the season
 *                   StartDate:
 *                     type: string
 *                     format: date
 *                   EndDate:
 *                     type: string
 *                     format: date
 *                   Description:
 *                     type: string
 *                     description: Description of the season
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *                   IsCurrentSeason:
 *                     type: boolean
 *                     description: Whether this is the current season
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching coffee seasons"
 */

// Define routes for coffee seasons
app.get('/coffeeseasons/:id', coffeeSeason.getCoffeeSeasonById); // Get coffee season by ID


/**
 * @swagger
 * /coffeeseasons/{id}:
 *   get:
 *     summary: Get a coffee season by ID
 *     description: Retrieve a specific coffee season by its ID.
 *     tags:
 *       - Coffee Seasons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the coffee season
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coffee season details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SeasonID:
 *                   type: integer
 *                   description: Season identifier
 *                 Year:
 *                   type: string
 *                   description: Year of the season
 *                 StartDate:
 *                   type: string
 *                   format: date
 *                 EndDate:
 *                   type: string
 *                   format: date
 *                 Description:
 *                   type: string
 *                   description: Description of the season
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                 IsCurrentSeason:
 *                   type: boolean
 *                   description: Whether this is the current season
 *       404:
 *         description: Coffee season not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Coffee season not found"
 *       500:
 *         description: Internal server error
 */
app.post('/coffeeseasons', coffeeSeason.createCoffeeSeason); // Create a new coffee season

/**
 * @swagger
 * /coffeeseasons:
 *   post:
 *     summary: Create a new coffee season
 *     description: Create a new coffee season in the database.
 *     tags:
 *       - Coffee Seasons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Year
 *               - StartDate
 *             properties:
 *               Year:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *               Description:
 *                 type: string
 *               IsCurrentSeason:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Coffee season created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Coffee season created"
 *                 SeasonID:
 *                   type: integer
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
app.put('/coffeeseasons/:id', coffeeSeason.updateCoffeeSeason); // Update coffee season by ID

/**
 * @swagger
 * /coffeeseasons/{id}:
 *   put:
 *     summary: Update a coffee season by ID
 *     description: Update an existing coffee season by its ID.
 *     tags:
 *       - Coffee Seasons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the coffee season to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Year
 *               - StartDate
 *             properties:
 *               Year:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *               Description:
 *                 type: string
 *               IsCurrentSeason:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Coffee season updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Coffee season updated successfully"
 *       404:
 *         description: Coffee season not found
 *       500:
 *         description: Internal server error
 */


app.delete('/coffeeseasons/:id', coffeeSeason.deleteCoffeeSeason); // Delete coffee season by ID

/**
 * @swagger
 * /coffeeseasons/{id}:
 *   delete:
 *     summary: Delete a coffee season by ID
 *     description: Delete a coffee season by its ID.
 *     tags:
 *       - Coffee Seasons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the coffee season to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Coffee season deleted successfully
 *       404:
 *         description: Coffee season not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting coffee season"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     agentsinfomationInfomation:
 *       type: object
 *       required:
 *         - AgentID
 *       properties:
 *         agentsinfomationInfomationID:
 *           type: integer
 *           description: The auto-generated id of the agent
 *         BusinessLocation:
 *           type: integer
 *           description: The business location id
 *         BoxOfficeNo:
 *           type: string
 *           description: The box office number
 *         PrimaryMobile:
 *           type: integer
 *           description: The primary mobile number
 *         Mobile:
 *           type: string
 *           description: The mobile number
 *         PrimaryLandline:
 *           type: integer
 *           description: The primary landline number
 *         LandLine:
 *           type: integer
 *           description: The landline number
 *         PhoneNumber:
 *           type: integer
 *           description: The phone number
 *         FaxNo:
 *           type: string
 *           description: The fax number
 *         PrimaryEmailAddress:
 *           type: string
 *           description: The primary email address
 *         SecondaryEmailAdress:
 *           type: string
 *           description: The secondary email address
 *         ContactPerson:
 *           type: string
 *           description: The contact person
 *         AgentID:
 *           type: integer
 *           description: The agent ID
 *         BoxCode:
 *           type: string
 *           description: The box code
 *       example:
 *         BusinessLocation: 1
 *         BoxOfficeNo: "123"
 *         PrimaryMobile: 1234567890
 *         Mobile: "0987654321"
 *         PrimaryLandline: 123456
 *         LandLine: 654321
 *         PhoneNumber: 789123
 *         FaxNo: "123-456-789"
 *         PrimaryEmailAddress: "primary@example.com"
 *         SecondaryEmailAdress: "secondary@example.com"
 *         ContactPerson: "John Doe"
 *         AgentID: 1
 *         BoxCode: "ABC123"
 */
app.get('/agentsinfomation', agentsinfomation.getAllAgents);

/**
 * @swagger
 * /agentsinfomation:
 *   get:
 *     summary: Returns the list of all the agentsinfomation
 *     tags: [agentsinfomation]
 *     responses:
 *       200:
 *         description: The list of the agentsinfomation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 */
app.get('/agentsinfomation/:id', agentsinfomation.getAgentById);

/**
 * @swagger
 * /agentsinfomation/{id}:
 *   get:
 *     summary: Get the agent by id
 *     tags: [agentsinfomation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The agent id
 *     responses:
 *       200:
 *         description: The agent description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: The agent was not found
 */
app.post('/agentsinfomation', agentsinfomation.createAgent);

/**
 * @swagger
 * /agentsinfomation:
 *   post:
 *     summary: Create a new agent agentsinfomation
 *     tags: [agentsinfomation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       201:
 *         description: The agent was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       500:
 *         description: Some server error
 */
app.put('/agentsinfomation/:id', agentsinfomation.updateAgent);

/**
 * @swagger
 * /agentsinfomation/{id}:
 *   put:
 *     summary: Update the agent by the id
 *     tags: [agentsinfomation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The agent id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       200:
 *         description: The agent was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: The agent was not found
 *       500:
 *         description: Some error happened
 */
/***********************************************************************************/
/**
 * @swagger
 * /agentsinfomation/{id}:
 *   delete:
 *     summary: Remove the agent by id
 *     tags: [agentsinfomation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The agent id
 *     responses:
 *       200:
 *         description: The agent was deleted
 *       404:
 *         description: The agent was not found
 */
app.delete('/agentsinfomation/:id', agentsinfomation.deleteAgent);

/**
 * @swagger
 * /bags:
 *   get:
 *     summary: Returns the list of all the bags
 *     tags: [Bags]
 *     responses:
 *       200:
 *         description: The list of the bags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bag'
 */
app.get('/bags', bags.getAllBags);

/**
 * @swagger
 * /bags/{id}:
 *   get:
 *     summary: Get the bag by id
 *     tags: [Bags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bag id
 *     responses:
 *       200:
 *         description: The bag description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bag'
 *       404:
 *         description: The bag was not found
 */
app.get('/bags/:id', bags.getBagById);

/**
 * @swagger
 * /bags:
 *   post:
 *     summary: Create a new bag
 *     tags: [Bags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: The bag was successfully created
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 */
app.post('/bags', bags.createBag);

/**
 * @swagger
 * /bags/{id}:
 *   put:
 *     summary: Update the bag by the id
 *     tags: [Bags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bag id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: The bag was updated
 *         content:
 *           application/json:
 *       404:
 *         description: The bag was not found
 *       500:
 *         description: Some error happened
 */
app.put('/bags/:id', bags.updateBag);

/**
 * @swagger
 * /bags/{id}:
 *   delete:
 *     summary: Remove the bag by id
 *     tags: [Bags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bag id
 *     responses:
 *       200:
 *         description: The bag was deleted
 *       404:
 *         description: The bag was not found
 */
app.delete('/bags/:id', bags.deleteBag);

/**
 * @swagger
 * components:
 *   schemas:
 *     Bank:
 *       type: object
 *       required:
 *         - BankName
 *         - BankCode
 *       properties:
 *         BankId:
 *           type: integer
 *           description: The auto-generated id of the bank
 *         BankName:
 *           type: string
 *           description: The name of the bank
 *         BankSwiftCode:
 *           type: string
 *           description: The SWIFT code of the bank
 *         CreatedOn:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         Remarks:
 *           type: string
 *           description: Additional remarks about the bank
 *         IsActive:
 *           type: boolean
 *           description: Whether the bank is active
 *         BankCode:
 *           type: string
 *           description: The code of the bank
 *       example:
 *         BankName: "Sample Bank"
 *         BankSwiftCode: "SBICUS33"
 *         CreatedOn: "2023-05-20T14:53:00Z"
 *         Remarks: "A reliable bank"
 *         IsActive: true
 *         BankCode: "SB123"
 */

/**
 * @swagger
 * tags:
 *   - name: Banks
 *     description: The banks managing API
 */

/**
 * @swagger
 * /banks:
 *   get:
 *     summary: Returns the list of all the banks
 *     tags: [Banks]
 *     responses:
 *       200:
 *         description: The list of the banks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bank'
 */
app.get('/banks', bank.getAllBanks);

/**
 * @swagger
 * /banks/{id}:
 *   get:
 *     summary: Get the bank by id
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bank id
 *     responses:
 *       200:
 *         description: The bank description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bank'
 *       404:
 *         description: The bank was not found
 */
app.get('/banks/:id', bank.getBankById);

/**
 * @swagger
 * /banks:
 *   post:
 *     summary: Create a new bank
 *     tags: [Banks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bank'
 *     responses:
 *       201:
 *         description: The bank was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bank'
 *       500:
 *         description: Some server error
 */
app.post('/banks', bank.createBank);

/**
 * @swagger
 * /banks/{id}:
 *   put:
 *     summary: Update the bank by the id
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bank id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bank'
 *     responses:
 *       200:
 *         description: The bank was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bank'
 *       404:
 *         description: The bank was not found
 *       500:
 *         description: Some error happened
 */
app.put('/banks/:id', bank.updateBank);

/**
 * @swagger
 * /banks/{id}:
 *   delete:
 *     summary: Remove the bank by id
 *     tags: [Banks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The bank id
 *     responses:
 *       200:
 *         description: The bank was deleted
 *       404:
 *         description: The bank was not found
 */
app.delete('/banks/:id', bank.deleteBank);


/**
 * @swagger
 * tags:
 *   - name: Certifications
 *     description: The certifications managing API
 */

/**
 * @swagger
 * /certifications:
 *   get:
 *     summary: Returns the list of all the certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: The list of the certifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Certification'
 */
/**
 * @swagger
 * tags:
 *   - name: Certifications
 *     description: The certifications managing API
 */

/**
 * @swagger
 * /certifications:
 *   get:
 *     summary: Returns the list of all certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: The list of certifications
 */
app.get('/certifications', certification.getAllCertifications);

/**
 * @swagger
 * /certifications/{id}:
 *   get:
 *     summary: Get a certification by ID
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The certification
 *       404:
 *         description: The certification was not found
 */
app.get('/certifications/:id', certification.getCertificationById);

/**
 * @swagger
 * /certifications:
 *   post:
 *     summary: Create a new certification
 *     tags: [Certifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CertificationName:
 *                 type: string
 *               CertDescription:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: The certification was successfully created
 *       500:
 *         description: Some error happened
 */
app.post('/certifications', certification.createCertification);

/**
 * @swagger
 * /certifications/{id}:
 *   put:
 *     summary: Update a certification by ID
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CertificationName:
 *                 type: string
 *               CertDescription:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: The certification was updated
 *       404:
 *         description: The certification was not found
 *       500:
 *         description: Some error happened
 */
app.put('/certifications/:id', certification.updateCertification);

/**
 * @swagger
 * /certifications/{id}:
 *   delete:
 *     summary: Delete a certification by ID
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The certification was deleted
 *       404:
 *         description: The certification was not found
 *       500:
 *         description: Some error happened
 */
app.delete('/certifications/:id', certification.deleteCertification);

/**
 * @swagger
 * /contactpersons/{ContactPersons}:
 *   get:
 *     summary: Returns the list of all contact persons for a grower
 *     tags: [ContactPersons]
 *     parameters:
 *       - in: path
 *         name: ContactPersonID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The list of contact persons
 */
app.get('/contactpersons', contactperson.getAllContactPersons);

/**
 * @swagger
 * /contactperson:
 *   get:
 *     summary: Get all contact persons
 *     tags: [ContactPersons]
 *     responses:
 *       200:
 *         description: The contact person
 *       404:
 *         description: The contact person was not found
 */
app.get('/contactpersons/:id', contactperson.getContactPersonById);

/**
 * @swagger
 * /contactpersons:
 *   post:
 *     summary: Create a new contact person
 *     tags: [ContactPersons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GrowerId:
 *                 type: integer
 *               ContactName:
 *                 type: string
 *               ContactNumber:
 *                 type: string
 *               Remarks:
 *                 type: string
 *               IsMainContact:
 *                 type: boolean
 *               ContactTitleID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The contact person was successfully created
 *       500:
 *         description: Some error happened
 */
app.post('/contactpersons', contactperson.createContactPerson);


/**
 * @swagger
 * /coopsocieties:
 *   get:
 *     summary: Returns the list of all cooperative societies
 *     tags: [CooperativeSocieties]
 *     responses:
 *       200:
 *         description: The list of cooperative societies
 */
app.get('/coopsocieties', coopSociety.getAllCoopSocieties);

/**
 * @swagger
 * /coopsocieties/{id}:
 *   get:
 *     summary: Get a cooperative society by ID
 *     tags: [CooperativeSocieties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The cooperative society
 *       404:
 *         description: The cooperative society was not found
 */
app.get('/coopsocieties/:id', coopSociety.getCoopSocietyById);

/**
 * @swagger
 * /coopsocieties:
 *   post:
 *     summary: Create a new cooperative society
 *     tags: [CooperativeSocieties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SocietyName:
 *                 type: string
 *               BankAccountNO:
 *                 type: integer
 *               BankID:
 *                 type: integer
 *               BranchID:
 *                 type: integer
 *               SocietyCode:
 *                 type: string
 *               Description:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: The cooperative society was successfully created
 *       500:
 *         description: Some error happened
 */
app.post('/coopsocieties', coopSociety.createCoopSociety);

/**
 * @swagger
 * /coopsocieties/{id}:
 *   put:
 *     summary: Update a cooperative society by ID
 *     tags: [CooperativeSocieties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SocietyName:
 *                 type: string
 *               BankAccountNO:
 *                 type: integer
 *               BankID:
 *                 type: integer
 *               BranchID:
 *                 type: integer
 *               SocietyCode:
 *                 type: string
 *               Description:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: The cooperative society was updated
 *       404:
 *         description: The cooperative society was not found
 *       500:
 *         description: Some error happened
 */
app.put('/coopsocieties/:id', coopSociety.updateCoopSociety);

/**
 * @swagger
 * /coopsocieties/{id}:
 *   delete:
 *     summary: Delete a cooperative society by ID
 *     tags: [CooperativeSocieties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The cooperative society was deleted
 *       404:
 *         description: The cooperative society was not found
 *       500:
 *         description: Some error happened
 */
app.delete('/coopsocieties/:id', coopSociety.deleteCoopSociety);

/**
 * @swagger
 * tags:
 *   - name: Factories
 *     description: The factories managing API
 */

/**
 * @swagger
 * /factories:
 *   get:
 *     summary: Returns the list of all factories
 *     tags: [Factories]
 *     responses:
 *       200:
 *         description: The list of factories
 */
app.get('/factories', factories.getAllFactories);

/**
 * @swagger
 * /factories/{id}:
 *   get:
 *     summary: Get a factory by ID
 *     tags: [Factories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The factory
 *       404:
 *         description: The factory was not found
 */
app.get('/factories/:id', factories.getFactoryById);

/**
 * @swagger
 * /factories:
 *   post:
 *     summary: Create a new factory
 *     tags: [Factories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SocietyID:
 *                 type: integer
 *               FactoryCode:
 *                 type: string
 *               FactoryName:
 *                 type: string
 *               Remarks:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *               AccountNo:
 *                 type: integer
 *               BankID:
 *                 type: integer
 *               BranchID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The factory was successfully created
 *       500:
 *         description: Some error happened
 */
app.post('/factories', factories.createFactory);

/**
 * @swagger
 * /factories/{id}:
 *   put:
 *     summary: Update a factory by ID
 *     tags: [Factories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SocietyID:
 *                 type: integer
 *               FactoryCode:
 *                 type: string
 *               FactoryName:
 *                 type: string
 *               Remarks:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *               AccountNo:
 *                 type: integer
 *               BankID:
 *                 type: integer
 *               BranchID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The factory was updated
 *       404:
 *         description: The factory was not found
 *       500:
 *         description: Some error happened
 */
app.put('/factories/:id', factories.updateFactory);

/**
 * @swagger
 * /factories/{id}:
 *   delete:
 *     summary: Delete a factory by ID
 *     tags: [Factories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The factory was deleted
 *       404:
 *         description: The factory was not found
 *       500:
 *         description: Some error happened
 */
app.delete('/factories/:id', factories.deleteFactory);

// Set up routes for Factories
/**
 * @swagger
 * /factories:
 *   get:
 *     summary: Retrieve all Factories ?
 *     tags: [Factories]
 *     responses:
 *       200:
 *         description: A list of GRN Factories
 *   post:
 *     summary: Create a new Factories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/factories'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.get('/grnoutturns', grnOutturnRoutes.getAllGRNOutturns);
app.get('/grnoutturns/allbulks', grnOutturnRoutes.getBulkOutturns);

app.get('/grnoutturns/gradesInBulk', grnOutturnRoutes.getGetGrnGradesBulk);
app.get('/grnoutturns/:id', grnOutturnRoutes.getGRNOutturnById);
app.get('/grnoutturns/grn/:id', grnOutturnRoutes.getGRNOutturnByIdandSeason);
app.get('/grnoutturns/:OutturnNo/season/:SeasonID', grnOutturnRoutes.getOutturnInBulkByIdandSeason);
app.delete('/grnoutturns/:grnOutturnID', grnOutturnRoutes.removeBulkFromGRNOutturn);

app.put('/grnoutturns/:id', grnOutturnRoutes.updateGRNOutturn);

app.delete('/grnoutturns/:id', grnOutturnRoutes.deleteGRNOutturn);

app.post('/grnoutturns', grnOutturnRoutes.createGRNOutturn);
app.post('/grnoutturns/bulk', grnOutturnRoutes.createBulkOutturn);
app.post('/grnoutturns/saveBulkCollection', grnOutturnRoutes.saveBulkCollection);
app.post('/grnoutturns/bulk/approve', grnOutturnRoutes.finalizeOutturnTemplate);

//all bulks

/**
 * @swagger
 * /grnoutturns/allbulks:
 *   get:
 *     summary: Retrieve all GRN Bulks Outturns
 *     tags: [GRN Outturns]
 *     responses:
 *       200:
 *         description: A list of  GRN Bulks Outturns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GRNOutturn'
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/bulk/approve:
 *   post:
 *     summary: Approve or reject a Bulk a Outturn record
 *     tags: 
 *       - GRN Outturns
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Approved:
 *                 type: integer
 *                 description: Approval status (0 = Rejected, 1 = Approved)
 *                 example: 1
 *               grnOutturnID:
 *                 type: integer
 *                 description: ID of the GRN Outturn to be approved
 *                 example: 1
 *               ActionDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the action
 *                 example: "2024-07-29"
 *               ConfirmedBy:
 *                 type: integer
 *                 description: ID of the user who confirmed the action
 *                 example: 28
 *               ActualWeight:
 *                 type: number
 *                 description: Actual weight of the bulk
 *                 example: 2000
 *     responses:
 *       201:
 *         description: GRN Outturn status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "GRN Outturn record updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/GRNOutturn'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Some server error occurred
 */

/**
 * @swagger
 * /grnoutturns/gradesInBulk:
 *   get:
 *     summary: Retrieve grades that can be bulked
 *     tags: 
 *       - GRN Outturns   # Ensure this tag matches what's defined in your components or general tags section
 *     responses:
 *       200:
 *         description: GRN Outturns retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array  # Specify if the response is an array of GRN Outturns
 *               items:
 *                 $ref: '#/components/schemas/GRNOutturn'  # Ensure this ref points to a valid schema
 *       400:
 *         description: Invalid input   # Update or remove this if no input is expected for a GET request
 *       404:
 *         description: GRN Outturns not found   # This suggests the resource wasn't found
 *       500:
 *         description: Some server error occurred
 */
/**
 * @swagger
 * /grnoutturns/saveBulkCollection:
 *   post:
 *     summary: Save bulk collection of GRN Outturns
 *     description: Saves a collection of bulk items for GRN Outturns and updates the gross weight.
 *     tags: 
 *       - GRN Outturns
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedBulkItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     grnOutturnID:
 *                       type: integer
 *                       description: ID of the GRN outturn item.
 *                     OutturnBulkID:
 *                       type: integer
 *                       description: ID for bulked outturn.
 *                     SellableStatusID:
 *                       type: integer
 *                       description: Status ID indicating if the item is sellable.
 *                     BulkStatus:
 *                       type: integer
 *                       description: Status of the bulk processing.
 *                     GrowerId:
 *                       type: integer
 *                       description: ID of the grower associated with the outturn.
 *                     SaleStatusID:
 *                       type: integer
 *                       description: Status ID indicating the sale status.
 *                     PercentOfBulk:
 *                       type: number
 *                       description: Percentage of the total bulk weight.
 *                     Weight:
 *                       type: number
 *                       description: Weight of the item contributing to the bulk total.
 *               totalKgs:
 *                 type: number
 *                 description: Total weight of the bulk collection.
 *               grnOutturnID:
 *                 type: integer
 *                 description: ID of the GRN Outturn item to update GrossWeight.
 *           example:
 *             selectedBulkItems:
 *               - grnOutturnID: 1
 *                 OutturnBulkID: 120
 *                 SellableStatusID: 3
 *                 BulkStatus: 2
 *                 GrowerId: 1
 *                 SaleStatusID: 9
 *                 PercentOfBulk: 0.15
 *                 Weight: 130
 *               - grnOutturnID: 2
 *                 OutturnBulkID: 121
 *                 SellableStatusID: 3
 *                 BulkStatus: 2
 *                 GrowerId: 1
 *                 SaleStatusID: 9
 *                 PercentOfBulk: 0.25
 *                 Weight: 200
 *             totalKgs: 1300
 *             grnOutturnID: 1
 *     responses:
 *       200:
 *         description: Bulk process completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bulk process completed successfully.
 *       500:
 *         description: Server error occurred during the bulk process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bulk process failed.
 */
/**
 * @swagger
 * /grnoutturns/{outturnNo}/season/{seasonID}:
 *   get:
 *     summary: Retrieve an existing GRN Outturn by Outturn Number and Season ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: outturnNo
 *         required: true
 *         description: The unique outturn number to search for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: seasonID
 *         required: true
 *         description: The unique season ID associated with the outturn.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: GRN Outturn retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GRNOutturn'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Some error happened
 */


/**
 * @swagger
 * /grnoutturns:
 *   get:
 *     summary: Retrieve all GRN Outturns
 *     tags: [GRN Outturns]
 *     responses:
 *       200:
 *         description: A list of GRN Outturns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GRNOutturn'
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/bulk:
 *   post:
 *     summary: Create a new Bulk Outturn
 *     tags: [GRN Outturns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GrowerId:
 *                 type: integer
 *                 description: The ID of the grower.
 *               SeasonID:
 *                 type: integer
 *                 description: The ID of the season.
 *               BulkOutturn:
 *                 type: string
 *                 description: The bulk outturn identifier.
 *               TotalKgs:
 *                 type: number
 *                 format: string
 *                 description: Total weight in kilograms.
 *               GradeID:
 *                 type: integer
 *                 description: The ID of the grade.
 *               MaClass:
 *                 type: string
 *                 description: The classification of the material.
 *             required:
 *               - GrowerId
 *               - SeasonID
 *               - BulkOutturn
 *               - TotalKgs
 *               - GradeID
 *               - MaClass
 *     responses:
 *       201:
 *         description: GRN Outturn created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GRN outturn and main created successfully
 *                 grnMainId:
 *                   type: integer
 *                   description: The ID of the created GRN main entry.
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns:
 *   post:
 *     summary: Create a new GRN Outturn
 *     tags: [GRN Outturns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GRNOutturn'
 *     responses:
 *       201:
 *         description: GRN Outturn created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GRNOutturn'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/{id}:
 *   get:
 *     summary: Retrieve a single GRN Outturn by ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the GRN Outturn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GRNOutturn'
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/grn/{id}:
 *   get:
 *     summary: Retrieve a related GRN Outturn by ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the GRN Outturn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GRNOutturn'
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/{id}:
 *   put:
 *     summary: Update an existing GRN Outturn by ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GRNOutturn'
 *     responses:
 *       200:
 *         description: GRN Outturn updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GRNOutturn'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/{grnOutturnID}:
 *   delete:
 *     summary: Delete a Bulk Outturn by grnOutturnID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: grnOutturnID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description:  Bulk Outturn deleted successfully
 *       404:
 *         description: Bulk Outturn not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /grnoutturns/{id}:
 *   delete:
 *     summary: Delete a GRN Outturn by ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: GRN Outturn deleted successfully
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GRNOutturn:
 *       type: object
 *       properties:
 *         grnOutturnID:
 *           type: integer
 *           description: The unique identifier for the GRN Outturn
 *           example: 1
 *         GRNID:
 *           type: integer
 *           description: The GRN identifier
 *           example: 12345
 *         Season:
 *           type: string
 *           description: The season for the GRN outturn
 *           example: "2024/2025"
 *         Location:
 *           type: string
 *           description: The location associated with the outturn
 *           example: "Nairobi"
 *         GradeID:
 *           type: integer
 *           description: The grade identifier linked to the material
 *           example: 1
 *         Weight:
 *           type: number
 *           format: double
 *           description: The weight of the outturn
 *           example: 1000.0
 *         CompleteLot:
 *           type: boolean
 *           description: Indicates if this is a complete lot
 *           example: true
 *         CleanTypeID:
 *           type: integer
 *           description: The ID of the clean type used
 *           example: 2
 *         Bags:
 *           type: integer
 *           description: Number of bags
 *           example: 50
 *         Pkts:
 *           type: integer
 *           description: Number of packets
 *           example: 20
 *         OutturnMark:
 *           type: string
 *           description: Outturn mark
 *           example: "OUT001"
 *         MaClass:
 *           type: integer
 *           description: Material classification
 *           example: 3
 *         OutturnQualityID:
 *           type: integer
 *           description: Quality ID for the outturn
 *           example: 1
 *         SellableStatusID:
 *           type: integer
 *           description: Status ID indicating if the outturn is sellable
 *           example: 1
 *         Quality:
 *           type: string
 *           description: Quality status, either 'N' for No or 'Y' for Yes
 *           example: "Y"
 *         PercentOfBulk:
 *           type: number
 *           format: double
 *           description: Percentage of the bulk
 *           example: 0.75
 *         SeasonID:
 *           type: integer
 *           description: Identifier for the season
 *           example: 2024
 *         SaleStatusID:
 *           type: integer
 *           description: Status ID of the sale
 *           example: 2
 *         PartialDelivery:
 *           type: boolean
 *           description: Indicates if the delivery is partial
 *           example: false
 *         SaleID:
 *           type: integer
 *           description: Identifier for the sale
 *           example: 123
 *         OutturnNo:
 *           type: string
 *           description: The unique outturn number
 *           example: "OUT-2024-0001"
 *         CreatedOn:
 *           type: string
 *           format: date-time
 *           description: The timestamp of creation
 *           example: "2024-07-25T00:00:00Z"
 *         OutturnBulkID:
 *           type: integer
 *           description: Bulk ID for the outturn
 *           example: 1
 *         BulkerID:
 *           type: integer
 *           description: Identifier for the bulker
 *           example: 100
 *         LotNo:
 *           type: integer
 *           description: Lot number
 *           example: 50
 *         BulkStatus:
 *           type: integer
 *           description: Status ID of the bulk
 *           example: 1
 *         GrowerId:
 *           type: integer
 *           description: Identifier for the grower
 *           example: 200
 *         WarrantedWeight:
 *           type: number
 *           format: double
 *           description: The weight that is warranted
 *           example: 1200.0
 *         Warranted:
 *           type: string
 *           description: Whether warranted, 'N' or 'Y'
 *           example: "N"
 *         WarrantID:
 *           type: integer
 *           description: Identifier for the warrant
 *           example: 300
 *         BagTypeID:
 *           type: integer
 *           description: Bag type identifier
 *           example: 1
 *         RequiresStandardization:
 *           type: boolean
 *           description: If standardization is required
 *           example: false
 *         standardized:
 *           type: string
 *           description: Standardization status, 'N' or 'Y'
 *           example: "N"
 *         GrossWeight:
 *           type: number
 *           format: double
 *           description: The gross weight of the outturn
 *           example: 1300.0
 */
/**
 * @swagger
 * /grnoutturns/{outturnNo}/season/{seasonID}:
 *   get:
 *     summary: Retrieve Bulk Record of a GRN Outturn by Outturn Number and Season ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: outturnNo
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique outturn number to search for.
 *       - in: path
 *         name: seasonID
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique season ID associated with the outturn.
 *     responses:
 *       200:
 *         description: Details of the GRN Outturn for the specified outturn number and season ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GRNOutturn'
 *       404:
 *         description: GRN Outturn not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: GRN Outturn not found
 *       500:
 *         description: Some error happened
 *        

/**
 * @swagger
 * /grnoutturns:
 *   get:
 *     summary: Retrieve a list of GRN Outturns
 *     tags: [GRN Outturns]
 *     responses:
 *       200:
 *         description: A list of GRN Outturns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   grnOutturnID:
 *                     type: integer
 *                     description: The auto-generated ID of the GRN Outturn
 *                     example: 1
 *                   GRNID:
 *                     type: integer
 *                     description: The GRN identifier
 *                     example: 12345
 *                   Season:
 *                     type: string
 *                     description: The season for the GRN outturn
 *                     example: "2024/2025"
 *                   Location:
 *                     type: string
 *                     description: The location associated with the outturn
 *                     example: "Nairobi"
 *                   GradeID:
 *                     type: integer
 *                     description: The grade identifier linked to the material
 *                     example: 1
 *                   Weight:
 *                     type: number
 *                     format: double
 *                     description: The weight of the outturn
 *                     example: 1000.0
 *                   CompleteLot:
 *                     type: boolean
 *                     description: Indicates if this is a complete lot
 *                     example: true
 *                   CleanTypeID:
 *                     type: integer
 *                     description: The ID of the clean type used
 *                     example: 2
 *                   Bags:
 *                     type: integer
 *                     description: Number of bags
 *                     example: 50
 *                   Pkts:
 *                     type: integer
 *                     description: Number of packets
 *                     example: 20
 *                   OutturnMark:
 *                     type: string
 *                     description: Outturn mark
 *                     example: "OUT001"
 *                   MaClass:
 *                     type: integer
 *                     description: Material classification
 *                     example: 3
 *                   OutturnQualityID:
 *                     type: integer
 *                     description: Quality ID for the outturn
 *                     example: 1
 *                   SellableStatusID:
 *                     type: integer
 *                     description: Status ID indicating if the outturn is sellable
 *                     example: 1
 *                   Quality:
 *                     type: string
 *                     description: Quality status, either 'N' for No or 'Y' for Yes
 *                     example: "Y"
 *                   PercentOfBulk:
 *                     type: number
 *                     format: double
 *                     description: Percentage of the bulk
 *                     example: 0.75
 *                   SeasonID:
 *                     type: integer
 *                     description: Identifier for the season
 *                     example: 2024
 *                   SaleStatusID:
 *                     type: integer
 *                     description: Status ID of the sale
 *                     example: 2
 *                   PartialDelivery:
 *                     type: boolean
 *                     description: Indicates if the delivery is partial
 *                     example: false
 *                   SaleID:
 *                     type: integer
 *                     description: Identifier for the sale
 *                     example: 123
 *                   OutturnNo:
 *                     type: string
 *                     description: The unique outturn number
 *                     example: "OUT-2024-0001"
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of creation
 *                     example: "2024-07-25T00:00:00Z"
 *                   OutturnBulkID:
 *                     type: integer
 *                     description: Bulk ID for the outturn
 *                     example: 1
 *                   BulkerID:
 *                     type: integer
 *                     description: Identifier for the bulker
 *                     example: 100
 *                   LotNo:
 *                     type: integer
 *                     description: Lot number
 *                     example: 50
 *                   BulkStatus:
 *                     type: integer
 *                     description: Status ID of the bulk
 *                     example: 1
 *                   GrowerId:
 *                     type: integer
 *                     description: Identifier for the grower
 *                     example: 200
 *                   WarrantedWeight:
 *                     type: number
 *                     format: double
 *                     description: The weight that is warranted
 *                     example: 1200.0
 *                   Warranted:
 *                     type: string
 *                     description: Whether warranted, 'N' or 'Y'
 *                     example: "N"
 *                   WarrantID:
 *                     type: integer
 *                     description: Identifier for the warrant
 *                     example: 300
 *                   BagTypeID:
 *                     type: integer
 *                     description: Bag type identifier
 *                     example: 1
 *                   RequiresStandardization:
 *                     type: boolean
 *                     description: If standardization is required
 *                     example: false
 *                   standardized:
 *                     type: string
 *                     description: Standardization status, 'N' or 'Y'
 *                     example: "N"
 *                   GrossWeight:
 *                     type: number
 *                     format: double
 *                     description: The gross weight of the outturn
 *                     example: 1300.0
 *
 *   post:
 *     summary: Create a new GRN Outturn
 *     tags: [GRN Outturns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GRNID:
 *                 type: integer
 *                 description: The GRN identifier
 *                 example: 12345
 *               Season:
 *                 type: string
 *                 description: The season for the GRN outturn
 *                 example: "2024/2025"
 *               Location:
 *                 type: string
 *                 description: The location associated with the outturn
 *                 example: "Nairobi"
 *               GradeID:
 *                 type: integer
 *                 description: The grade identifier linked to the material
 *                 example: 1
 *               Weight:
 *                 type: number
 *                 format: double
 *                 description: The weight of the outturn
 *                 example: 1000.0
 *               CompleteLot:
 *                 type: boolean
 *                 description: Indicates if this is a complete lot
 *                 example: true
 *               CleanTypeID:
 *                 type: integer
 *                 description: The ID of the clean type used
 *                 example: 2
 *               Bags:
 *                 type: integer
 *                 description: Number of bags
 *                 example: 50
 *               Pkts:
 *                 type: integer
 *                 description: Number of packets
 *                 example: 20
 *               OutturnMark:
 *                 type: string
 *                 description: Outturn mark
 *                 example: "OUT001"
 *               MaClass:
 *                 type: integer
 *                 description: Material classification
 *                 example: 3
 *               OutturnQualityID:
 *                 type: integer
 *                 description: Quality ID for the outturn
 *                 example: 1
 *               SellableStatusID:
 *                 type: integer
 *                 description: Status ID indicating if the outturn is sellable
 *                 example: 1
 *               Quality:
 *                 type: string
 *                 description: Quality status, either 'N' for No or 'Y' for Yes
 *                 example: "Y"
 *               PercentOfBulk:
 *                 type: number
 *                 format: double
 *                 description: Percentage of the bulk
 *                 example: 0.75
 *               SeasonID:
 *                 type: integer
 *                 description: Identifier for the season
 *                 example: 2024
 *               SaleStatusID:
 *                 type: integer
 *                 description: Status ID of the sale
 *                 example: 2
 *               PartialDelivery:
 *                 type: boolean
 *                 description: Indicates if the delivery is partial
 *                 example: false
 *               SaleID:
 *                 type: integer
 *                 description: Identifier for the sale
 *                 example: 123
 *               OutturnNo:
 *                 type: string
 *                 description: The unique outturn number
 *                 example: "OUT-2024-0001"
 *               CreatedOn:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of creation
 *                 example: "2024-07-25T00:00:00Z"
 *               OutturnBulkID:
 *                 type: integer
 *                 description: Bulk ID for the outturn
 *                 example: 1
 *               BulkerID:
 *                 type: integer
 *                 description: Identifier for the bulker
 *                 example: 100
 *               LotNo:
 *                 type: integer
 *                 description: Lot number
 *                 example: 50
 *               BulkStatus:
 *                 type: integer
 *                 description: Status ID of the bulk
 *                 example: 1
 *               GrowerId:
 *                 type: integer
 *                 description: Identifier for the grower
 *                 example: 200
 *               WarrantedWeight:
 *                 type: number
 *                 format: double
 *                 description: The weight that is warranted
 *                 example: 1200.0
 *               Warranted:
 *                 type: string
 *                 description: Whether warranted, 'N' or 'Y'
 *                 example: "N"
 *               WarrantID:
 *                 type: integer
 *                 description: Identifier for the warrant
 *                 example: 300
 *               BagTypeID:
 *                 type: integer
 *                 description: Bag type identifier
 *                 example: 1
 *               RequiresStandardization:
 *                 type: boolean
 *                 description: If standardization is required
 *                 example: false
 *               standardized:
 *                 type: string
 *                 description: Standardization status, 'N' or 'Y'
 *                 example: "N"
 *               GrossWeight:
 *                 type: number
 *                 format: double
 *                 description: The gross weight of the outturn
 *                 example: 1300.0
 *     responses:
 *       201:
 *         description: GRN Outturn created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grnOutturnID:
 *                   type: integer
 *                   description: The ID of the newly created GRN Outturn
 *                   example: 10
 *       400:
 *         description: Invalid input
 *
 * /grn_outturns/{id}:
 *   get:
 *     summary: Retrieve a single GRN Outturn by ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the GRN Outturn
 *     responses:
 *       200:
 *         description: Details of a GRN Outturn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grnOutturnID:
 *                   type: integer
 *                   description: The ID of the GRN Outturn
 *                   example: 1
 *                 GRNID:
 *                   type: integer
 *                   description: The GRN identifier
 *                   example: 12345
 *                 Season:
 *                   type: string
 *                   description: The season for the GRN outturn
 *                   example: "2024/2025"
 *                 Location:
 *                   type: string
 *                   description: The location associated with the outturn
 *                   example: "Nairobi"
 *                 GradeID:
 *                   type: integer
 *                   description: The grade identifier linked to the material
 *                   example: 1
 *                 Weight:
 *                   type: number
 *                   format: double
 *                   description: The weight of the outturn
 *                   example: 1000.0
 *                 CompleteLot:
 *                   type: boolean
 *                   description: Indicates if this is a complete lot
 *                   example: true
 *                 CleanTypeID:
 *                   type: integer
 *                   description: The ID of the clean type used
 *                   example: 2
 *                 Bags:
 *                   type: integer
 *                   description: Number of bags
 *                   example: 50
 *                 Pkts:
 *                   type: integer
 *                   description: Number of packets
 *                   example: 20
 *                 OutturnMark:
 *                   type: string
 *                   description: Outturn mark
 *                   example: "OUT001"
 *                 MaClass:
 *                   type: integer
 *                   description: Material classification
 *                   example: 3
 *                 OutturnQualityID:
 *                   type: integer
 *                   description: Quality ID for the outturn
 *                   example: 1
 *                 SellableStatusID:
 *                   type: integer
 *                   description: Status ID indicating if the outturn is sellable
 *                   example: 1
 *                 Quality:
 *                   type: string
 *                   description: Quality status, either 'N' for No or 'Y' for Yes
 *                   example: "Y"
 *                 PercentOfBulk:
 *                   type: number
 *                   format: double
 *                   description: Percentage of the bulk
 *                   example: 0.75
 *                 SeasonID:
 *                   type: integer
 *                   description: Identifier for the season
 *                   example: 2024
 *                 SaleStatusID:
 *                   type: integer
 *                   description: Status ID of the sale
 *                   example: 2
 *                 PartialDelivery:
 *                   type: boolean
 *                   description: Indicates if the delivery is partial
 *                   example: false
 *                 SaleID:
 *                   type: integer
 *                   description: Identifier for the sale
 *                   example: 123
 *                 OutturnNo:
 *                   type: string
 *                   description: The unique outturn number
 *                   example: "OUT-2024-0001"
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp of creation
 *                   example: "2024-07-25T00:00:00Z"
 *                 OutturnBulkID:
 *                   type: integer
 *                   description: Bulk ID for the outturn
 *                   example: 1
 *                 BulkerID:
 *                   type: integer
 *                   description: Identifier for the bulker
 *                   example: 100
 *                 LotNo:
 *                   type: integer
 *                   description: Lot number
 *                   example: 50
 *                 BulkStatus:
 *                   type: integer
 *                   description: Status ID of the bulk
 *                   example: 1
 *                 GrowerId:
 *                   type: integer
 *                   description: Identifier for the grower
 *                   example: 200
 *                 WarrantedWeight:
 *                   type: number
 *                   format: double
 *                   description: The weight that is warranted
 *                   example: 1200.0
 *                 Warranted:
 *                   type: string
 *                   description: Whether warranted, 'N' or 'Y'
 *                   example: "N"
 *                 WarrantID:
 *                   type: integer
 *                   description: Identifier for the warrant
 *                   example: 300
 *                 BagTypeID:
 *                   type: integer
 *                   description: Bag type identifier
 *                   example: 1
 *                 RequiresStandardization:
 *                   type: boolean
 *                   description: If standardization is required
 *                   example: false
 *                 standardized:
 *                   type: string
 *                   description: Standardization status, 'N' or 'Y'
 *                   example: "N"
 *                 GrossWeight:
 *                   type: number
 *                   format: double
 *                   description: The gross weight of the outturn
 *                   example: 1300.0
 *       404:
 *         description: GRN Outturn not found
 *
 *   put:
 *     summary: Update a GRN Outturn by ID
 *     tags: [GRN Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the GRN Outturn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GRNID:
 *                 type: integer
 *                 description: The GRN identifier
 *                 example: 12345
 *               Season:
 *                 type: string
 *                 description: The season for the GRN outturn
 *                 example: "2024/2025"
 *               Location:
 *                 type: string
 *                 description: The location associated with the outturn
 *                 example: "Nairobi"
 *               GradeID:
 *                 type: integer
 *                 description: The grade identifier linked to the material
 *                 example: 1
 *               Weight:
 *                 type: number
 *                 format: double
 *                 description: The weight of the outturn
 *                 example: 1000.0
 *               CompleteLot:
 *                 type: boolean
 *                 description: Indicates if this is a complete lot
 *                 example: true
 *               CleanTypeID:
 *                 type: integer
 *                 description: The ID of the clean type used
 *                 example: 2
 *               Bags:
 *                 type: integer
 *                 description: Number of bags
 *                 example: 50
 *               Pkts:
 *                 type:

/**
 * @swagger
 * /growertypes:
 *   get:
 *     summary: Get all grower types
 *     tags: [GrowerTypes]
 *     responses:
 *       200:
 *         description: A list of all grower types
 */
app.get('/growertypes', growertype.getAllGrowerTypes);

/**
 * @swagger
 * /growertypes/{id}:
 *   get:
 *     summary: Get a grower type by ID
 *     tags: [GrowerTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the grower type
 *     responses:
 *       200:
 *         description: The requested grower type
 *       404:
 *         description: Grower type not found
 */
app.get('/growertypes/:id', growertype.getGrowerTypeById);

/**
 * @swagger
 * /growertypes:
 *   post:
 *     summary: Create a new grower type
 *     tags: [GrowerTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GrowerTypeName:
 *                 type: string
 *               GrowerTypeDescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created grower type
 */
app.post('/growertypes', growertype.createGrowerType);

/**
 * @swagger
 * /growertypes/{id}:
 *   put:
 *     summary: Update a grower type by ID
 *     tags: [GrowerTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the grower type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GrowerTypeName:
 *                 type: string
 *               GrowerTypeDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Grower type updated successfully
 *       404:
 *         description: Grower type not found
 */
app.put('/growertypes/:id', growertype.updateGrowerType);

/**
 * @swagger
 * /growertypes/{id}:
 *   delete:
 *     summary: Delete a grower type by ID
 *     tags: [GrowerTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the grower type
 *     responses:
 *       200:
 *         description: Grower type deleted successfully
 *       404:
 *         description: Grower type not found
 */
app.delete('/growertypes/:id', growertype.deleteGrowerType);
/**
 * @swagger
 * /growerreturns:
 *   get:
 *     summary: Get all grower returns
 *     tags: [Grower Returns]
 *     responses:
 *       200:
 *         description: List of grower returns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/growerreturns/:id', growerReturns.getGrowerReturnById);

/**
 * @swagger
 * /growerreturns/{id}:
 *   get:
 *     summary: Get a grower return by ID
 *     tags: [Grower Returns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The grower return ID
 *     responses:
 *       200:
 *         description: Grower return data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Grower return not found
 */
app.post('/growerreturns', growerReturns.createGrowerReturn);

/**
 * @swagger
 * /growerreturns:
 *   post:
 *     summary: Create a new grower return
 *     tags: [Grower Returns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Grower return created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 GrowerReturnID:
 *                   type: integer
 */
app.put('/growerreturns/:id', growerReturns.updateGrowerReturn);

/**
 * @swagger
 * /growerreturns/{id}:
 *   put:
 *     summary: Update a grower return by ID
 *     tags: [Grower Returns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The grower return ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Grower return updated successfully
 *       404:
 *         description: Grower return not found
 */
app.delete('/growerreturns/:id', growerReturns.deleteGrowerReturn);

/**
 * @swagger
 * /growerreturns/{id}:
 *   delete:
 *     summary: Delete a grower return by ID
 *     tags: [Grower Returns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The grower return ID
 *     responses:
 *       200:
 *         description: Grower return deleted successfully
 *       404:
 *         description: Grower return not found
 */
/**
 * @swagger
 * /materials:
 *   get:
 *     summary: Get all materials
 *     tags: [Materials]
 *     responses:
 *       200:
 *         description: A list of all materials
 */
app.get('/materials', material.getAllMaterials);

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     summary: Get a material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the material
 *     responses:
 *       200:
 *         description: The requested material
 *       404:
 *         description: Material not found
 */
app.get('/materials/:id', material.getMaterialById);

/**
 * @swagger
 * /materials:
 *   post:
 *     summary: Create a new material
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MaterialName:
 *                 type: string
 *               Description:
 *                 type: string
 *               CleanOrUnmilled:
 *                 type: string
 *               MbuniOrPerchment:
 *                 type: string
 *               MinClassInMainCataloque:
 *                 type: integer
 *               Value:
 *                 type: integer
 *               MiscValue:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The newly created material
 */
app.post('/materials', material.createMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     summary: Update a material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MaterialName:
 *                 type: string
 *               Description:
 *                 type: string
 *               CleanOrUnmilled:
 *                 type: string
 *               MbuniOrPerchment:
 *                 type: string
 *               MinClassInMainCataloque:
 *                 type: integer
 *               Value:
 *                 type: integer
 *               MiscValue:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Material updated successfully
 *       404:
 *         description: Material not found
 */
app.put('/materials/:id', material.updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     summary: Delete a material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the material
 *     responses:
 *       200:
 *         description: Material deleted successfully
 *       404:
 *         description: Material not found
 */
app.delete('/materials/:id', material.deleteMaterial);
// Miller Charges Route Handlers
app.get('/millercharges', millercharges.getAllMillerCharges);
app.get('/millercharges/:id', millercharges.getMillerChargeById);
app.get('/millercharges/outturn/:id', millercharges.getMillerChargeByOutturnId);
app.post('/millercharges', millercharges.createMillerCharge);
app.put('/millercharges/:id', millercharges.updateMillerCharge);
app.delete('/millercharges/:id', millercharges.deleteMillerCharge);

/**
 * @swagger
 * /millercharges:
 *   get:
 *     summary: Get all miller charges
 *     tags: [Miller Charges]
 *     responses:
 *       200:
 *         description: A list of all miller charges
 */


/**
 * @swagger
 * /millercharges/outturn/{id}:
 *   get:
 *     summary: Get a miller charge by Outturn ID
 *     tags: [Miller Charges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Outturn ID of the miller charge
 *     responses:
 *       200:
 *         description: The requested miller charge
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Miller charge not found
 */
/**
 * @swagger
 * /millercharges/{id}:
 *   get:
 *     summary: Get a miller charge by ID
 *     tags: [Miller Charges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the miller charge
 *     responses:
 *       200:
 *         description: The requested miller charge
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Miller charge not found
 */

/**
 * @swagger
 * /millercharges:
 *   post:
 *     summary: Create a new miller charge
 *     tags: [Miller Charges]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ChargeTypeID:
 *                 type: integer
 *               OutturnMark:
 *                 type: string
 *               OutturnSeason:
 *                 type: integer
 *               ChargeAmount:
 *                 type: string
 *               Currency:
 *                 type: integer
 *               ChargeRecovered:
 *                 type: string
 *               FullyRecovered:
 *                 type: integer
 *               CreatedON:
 *                 type: string
 *                 format: date
 *               Remarks:
 *                 type: string
 *               VAT:
 *                 type: string
 *               Total:
 *                 type: string
 *               OutturnID:
 *                 type: integer
 *               Balance:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Miller charge created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 MillerChargeID:
 *                   type: integer
 *                   example: 190
 *                 ChargeTypeID:
 *                   type: integer
 *                   example: 1
 *                 OutturnMark:
 *                   type: string
 *                   example: "13SM0001/14"
 *                 OutturnSeason:
 *                   type: integer
 *                   example: 14
 *                 ChargeAmount:
 *                   type: string
 *                   example: "1"
 *                 Currency:
 *                   type: integer
 *                   example: 1
 *                 ChargeRecovered:
 *                   type: string
 *                   example: "0.00"
 *                 FullyRecovered:
 *                   type: integer
 *                   example: 0
 *                 CreatedON:
 *                   type: string
 *                   format: date
 *                   example: "2024-02-23"
 *                 Remarks:
 *                   type: string
 *                   example: "test"
 *                 VAT:
 *                   type: string
 *                   example: "0"
 *                 Total:
 *                   type: string
 *                   example: "1214.00"
 *                 OutturnID:
 *                   type: integer
 *                   example: 686
 *                 Balance:
 *                   type: string
 *                   nullable: true
 *                   example: null
 */


/**
 * @swagger
 * /millercharges/{id}:
 *   put:
 *     summary: Update a miller charge by ID
 *     tags: [Miller Charges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the miller charge
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Miller charge updated successfully
 *       404:
 *         description: Miller charge not found
 */

/**
 * @swagger
 * /millercharges/{id}:
 *   delete:
 *     summary: Delete a miller charge by ID
 *     tags: [Miller Charges]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the miller charge
 *     responses:
 *       200:
 *         description: Miller charge deleted successfully
 *       404:
 *         description: Miller charge not found
 */

// Route handlers
app.get('/outturngrades', outturnGrades.getAllOutturnGrades);

/**
 * @swagger
 * /outturngrades:
 *   get:
 *     summary: Get all outturn grades
 *     tags: [Outturn Grades]
 *     responses:
 *       200:
 *         description: A list of all outturn grades
 */
app.get('/outturngrades/:id', outturnGrades.getOutturnGradeById);

/**
 * @swagger
 * /outturngrades/{id}:
 *   get:
 *     summary: Get an outturn grade by ID
 *     tags: [Outturn Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn grade
 *     responses:
 *       200:
 *         description: The requested outturn grade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Outturn grade not found
 */
app.get('/outturngrades/outturn/:id', outturnGrades.getOutturnGradeByOutturnId);

/**
 * @swagger
 * /outturngrades/outturn/{id}:
 *   get:
 *     summary: Get an outturn grade by OutturnID
 *     tags: [Outturn Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The OutturnID of the outturn
 *     responses:
 *       200:
 *         description: The requested outturn grades on Outturn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 GradeID:
 *                   type: integer
 *                   description: Unique identifier for the grade
 *                 OutturnID:
 *                   type: integer
 *                   description: Unique identifier for the outturn
 *                 GradeName:
 *                   type: string
 *                   description: Name of the grade
 *                 Description:
 *                   type: string
 *                   description: Description of the grade
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the grade was created
 *       404:
 *         description: Outturn grade not found
 */

app.post('/outturngrades', outturnGrades.createOutturnGrade);

/**
 * @swagger
 * /outturngrades:
 *   post:
 *     summary: Create a new outturn grade
 *     tags: [Outturn Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OutturnMark:
 *                 type: string
 *                 example: "Grade A"
 *               Bags:
 *                 type: number
 *                 format: double
 *                 example: 10.5
 *               Pkts:
 *                 type: number
 *                 format: double
 *                 example: 5.5
 *               Weight:
 *                 type: number
 *                 format: double
 *                 example: 100.75
 *               MillerClass:
 *                 type: integer
 *                 example: 1
 *               CleanBulk:
 *                 type: boolean
 *                 example: true
 *               MaterialID:
 *                 type: integer
 *                 example: 123
 *               WeightPercentage:
 *                 type: string
 *                 example: "20%"
 *               MaClass:
 *                 type: integer
 *                 example: 1
 *               BulkOutturnNo:
 *                 type: string
 *                 example: "BO123456"
 *               BulkGroupID:
 *                 type: integer
 *                 example: 456
 *               SeasonID:
 *                 type: integer
 *                 example: 2023
 *               OutturnQualityID:
 *                 type: integer
 *                 example: 789
 *               PercentageOfGradeBulk:
 *                 type: string
 *                 example: "50%"
 *               OutturnGradesFk:
 *                 type: integer
 *                 example: 3000
 *               OutturnID:
 *                 type: integer
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Outturn grade created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OutturnGradesID:
 *                   type: integer
 *                   example: 3001
 *                 OutturnMark:
 *                   type: string
 *                   example: "Grade A"
 *                 Bags:
 *                   type: number
 *                   format: double
 *                   example: 10.5
 *                 Pkts:
 *                   type: number
 *                   format: double
 *                   example: 5.5
 *                 Weight:
 *                   type: number
 *                   format: double
 *                   example: 100.75
 *                 MillerClass:
 *                   type: integer
 *                   example: 1
 *                 CleanBulk:
 *                   type: boolean
 *                   example: true
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-07-25T12:34:56Z"
 *                 MaterialID:
 *                   type: integer
 *                   example: 123
 *                 WeightPercentage:
 *                   type: string
 *                   example: "20%"
 *                 MaClass:
 *                   type: integer
 *                   example: 1
 *                 BulkOutturnNo:
 *                   type: string
 *                   example: "BO123456"
 *                 BulkGroupID:
 *                   type: integer
 *                   example: 456
 *                 SeasonID:
 *                   type: integer
 *                   example: 2023
 *                 OutturnQualityID:
 *                   type: integer
 *                   example: 789
 *                 PercentageOfGradeBulk:
 *                   type: string
 *                   example: "50%"
 *                 OutturnGradesFk:
 *                   type: integer
 *                   example: 3000
 *                 OutturnID:
 *                   type: integer
 *                   example: 1000
 */
app.put('/outturngrades/:id', outturnGrades.updateOutturnGrade);

/**
 * @swagger
 * /outturngrades/{id}:
 *   put:
 *     summary: Update an outturn grade by ID
 *     tags: [Outturn Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn grade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Outturn grade updated successfully
 *       404:
 *         description: Outturn grade not found
 */
app.delete('/outturngrades/:id', outturnGrades.deleteOutturnGrade);

/**
 * @swagger
 * /outturngrades/{id}:
 *   delete:
 *     summary: Delete an outturn grade by ID
 *     tags: [Outturn Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn grade
 *     responses:
 *       200:
 *         description: Outturn grade deleted successfully
 *       404:
 *         description: Outturn grade not found
 */

app.get('/outturns', outturns.getAllOutturns);
/**
 * @swagger
 * /outturns:
 *   get:
 *     summary: Get all outturn records
 *     tags: [Outturns]
 *     responses:
 *       200:
 *         description: A list of all outturn records
 */
app.get('/outturns/:id', outturns.getOutturnById);

/**
 * @swagger
 * /outturns/{id}:
 *   get:
 *     summary: Get an outturn record by ID
 *     tags: [Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn record
 *     responses:
 *       200:
 *         description: The requested outturn record
 *       404:
 *         description: Outturn record not found
 */
app.get('/outturns/:outturnNo/season/:seasonID', outturns.getOutturnByIdandSeason);
/**
 * @swagger
 * /outturns/{outturnNo}/season/{seasonID}:
 *   get:
 *     summary: Get an outturn record by outturnNo and SeasonID
 *     tags: [Outturns]
 *     parameters:
 *       - in: path
 *         name: outturnNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the outturn record
 *       - in: path
 *         name: seasonID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the season
 *     responses:
 *       200:
 *         description: The requested outturn record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OutturnID:
 *                   type: integer
 *                   description: The unique identifier for the outturn
 *                   example: 1
 *                 OutturnMark:
 *                   type: string
 *                   description: The mark of the outturn
 *                   example: "48US0001/13"
 *                 OutturnNo:
 *                   type: string
 *                   description: The outturn number
 *                   example: "48US0001"
 *                 MaterialID:
 *                   type: integer
 *                   description: Identifier for the material
 *                   example: 1
 *                 GrowerID:
 *                   type: integer
 *                   description: Identifier for the grower
 *                   example: 17
 *                 MillerID:
 *                   type: integer
 *                   description: Identifier for the miller
 *                   example: 171
 *                 CoffeeTypeID:
 *                   type: integer
 *                   description: Identifier for the coffee type
 *                   example: 1
 *                 BagID:
 *                   type: integer
 *                   description: Identifier for the bag
 *                   example: null
 *                 BagWeight:
 *                   type: number
 *                   format: float
 *                   description: The weight of the bag
 *                   example: null
 *                 Nweight:
 *                   type: string
 *                   description: The net weight
 *                   example: "2713"
 *                 Status:
 *                   type: string
 *                   description: The status of the outturn
 *                   example: null
 *                 TotalMillerCharges:
 *                   type: number
 *                   format: float
 *                   description: The total miller charges
 *                   example: null
 *                 TotalChargesRecovered:
 *                   type: number
 *                   format: float
 *                   description: The total charges recovered
 *                   example: null
 *                 TotalWeightSold:
 *                   type: number
 *                   format: float
 *                   description: The total weight sold
 *                   example: null
 *                 GrowerPayee:
 *                   type: string
 *                   description: The grower payee
 *                   example: null
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                   description: The creation date of the outturn record
 *                   example: "2023-10-04T06:57:30.000Z"
 *                 SeasonID:
 *                   type: integer
 *                   description: Identifier for the season
 *                   example: 13
 *                 MilledDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the coffee was milled
 *                   example: "2023-09-04T22:00:00.000Z"
 *                 WeightMargin:
 *                   type: string
 *                   description: The weight margin
 *                   example: "23"
 *                 Pkts:
 *                   type: string
 *                   description: The number of packets
 *                   example: "13"
 *                 MillerClassID:
 *                   type: integer
 *                   description: Identifier for the miller class
 *                   example: null
 *                 Remarks:
 *                   type: string
 *                   description: Additional remarks about the outturn
 *                   example: null
 *                 Bags:
 *                   type: integer
 *                   description: The number of bags
 *                   example: 45
 *                 Sign:
 *                   type: string
 *                   description: Sign notation
 *                   example: "-"
 *                 DeliveryDate:
 *                   type: string
 *                   format: date-time
 *                   description: The delivery date
 *                   example: null
 *                 BulkOutturnNo:
 *                   type: string
 *                   description: The bulk outturn number
 *                   example: null
 *                 GrossPWeight:
 *                   type: string
 *                   description: The gross production weight
 *                   example: "3531.000"
 *                 Sampled:
 *                   type: boolean
 *                   description: Indicator if sampled
 *                   example: null
 *                 BulkPercentage:
 *                   type: string
 *                   description: The bulk percentage
 *                   example: "2713"
 *                 GrnReceivediD:
 *                   type: integer
 *                   description: Identifier for the GRN received
 *                   example: null
 *       404:
 *         description: Outturn record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Outturn record not found"
 */

app.get('/outturns/bulks/:id', outturns.getOutturnInBulkByOutturnNo);

/**
 * @swagger
 * /outturns/bulks/{id}:
 *   get:
 *     summary: Get an Bulk outturn record based on Outturn ID
 *     tags: [Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn record
 *     responses:
 *       200:
 *         description: The requested outturn record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OutturnNo:
 *                   type: String
 *                   example: 48US0001
 *                 GrossWight:
 *                   type: integer
 *                   example: 1
 *                 NetWeight:
 *                   type: integer
 *                   example: 171
 *                 Season:
 *                   type: string
 *                   example: "2023/2024"
 *                 Description:
 *                   type: string
 *                   example: "CLEAN STRAIGHT OUTTURN"
 *                 GrowerName:
 *                   type: string
 *                   example: "KARUNGURU"
 *                 MaterialName:
 *                   type: string
 *                   example: "P1"
 *                 MilledDate:
 *                   type: string
 *                   nullable: true
 *                   example: 2023-10-04 08:57:30
 *       404:
 *         description: Outturn record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Outturn record not found"
 */
app.post('/outturns', outturns.createOutturn);

/**
 * @swagger
 * /outturns:
 *   post:
 *     summary: Create a new outturn record
 *     tags: [Outturns]
 *     requestBody:
 *       description: The outturn record to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OutturnMark:
 *                 type: string
 *               OutturnNo:
 *                 type: string
 *               MaterialID:
 *                 type: integer
 *               GrowerID:
 *                 type: integer
 *               MillerID:
 *                 type: integer
 *               CoffeeTypeID:
 *                 type: integer
 *               BagID:
 *                 type: integer
 *               BagWeight:
 *                 type: number
 *                 format: double
 *               Nweight:
 *                 type: number
 *                 format: double
 *               Status:
 *                 type: integer
 *               TotalMillerCharges:
 *                 type: number
 *                 format: double
 *               TotalChargesRecovered:
 *                 type: number
 *                 format: double
 *               TotalWeightSold:
 *                 type: number
 *                 format: double
 *               GrowerPayee:
 *                 type: string
 *               SeasonID:
 *                 type: integer
 *                 required: true
 *               MilledDate:
 *                 type: string
 *                 format: date
 *               WeightMargin:
 *                 type: string
 *               Pkts:
 *                 type: number
 *                 format: double
 *               MillerClassID:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *               Bags:
 *                 type: integer
 *               Sign:
 *                 type: string
 *               DeliveryDate:
 *                 type: string
 *                 format: date
 *               BulkOutturnNo:
 *                 type: integer
 *               GrossPWeight:
 *                 type: number
 *                 format: double
 *               Sampled:
 *                 type: string
 *               BulkPercentage:
 *                 type: string
 *               GrnReceivediD:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The newly created outturn record
 */
app.put('/outturns/:id', outturns.updateOutturn);

/**
 * @swagger
 * /outturns/{id}:
 *   put:
 *     summary: Update an outturn record by ID
 *     tags: [Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn record
 *       - in: body
 *         name: body
 *         description: The outturn record to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             OutturnMark:
 *               type: string
 *             OutturnNo:
 *               type: string
 *             MaterialID:
 *               type: integer
 *             GrowerID:
 *               type: integer
 *             MillerID:
 *               type: integer
 *             CoffeeTypeID:
 *               type: integer
 *             BagID:
 *               type: integer
 *             BagWeight:
 *               type: number
 *               format: double
 *             Nweight:
 *               type: number
 *               format: double
 *             Status:
 *               type: integer
 *             TotalMillerCharges:
 *               type: number
 *               format: double
 *             TotalChargesRecovered:
 *               type: number
 *               format: double
 *             TotalWeightSold:
 *               type: number
 *               format: double
 *             GrowerPayee:
 *               type: string
 *             SeasonID:
 *               type: integer
 *               required: true
 *             MilledDate:
 *               type: string
 *               format: date
 *             WeightMargin:
 *               type: string
 *             Pkts:
 *               type: number
 *               format: double
 *             MillerClassID:
 *               type: integer
 *             Remarks:
 *               type: string
 *             Bags:
 *               type: integer
 *             Sign:
 *               type: string
 *             DeliveryDate:
 *               type: string
 *               format: date
 *             BulkOutturnNo:
 *               type: integer
 *             GrossPWeight:
 *               type: number
 *               format: double
 *             Sampled:
 *               type: string
 *             BulkPercentage:
 *               type: string
 *             GrnReceivediD:
 *               type: integer
 *     responses:
 *       200:
 *         description: Outturn record updated successfully
 *       404:
 *         description: Outturn record not found
 */
app.put('/outturns/:id', outturns.updateOutturn);

/**
 * @swagger
 * /outturns/{id}:
 *   delete:
 *     summary: Delete an outturn record by ID
 *     tags: [Outturns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn record
 *     responses:
 *       200:
 *         description: Outturn record deleted successfully
 *       404:
 *         description: Outturn record not found
 */
app.delete('/outturns/:id', outturns.deleteOutturn);

/**
 * @swagger
 * /paymentmode:
 *   get:
 *     summary: Get all payment modes
 *     tags: [PaymentMode]
 *     responses:
 *       200:
 *         description: A list of all payment modes
 */
app.get('/paymentmode', paymentmode.getAllPaymentModes);

/**
 * @swagger
 * /paymentmode/{id}:
 *   get:
 *     summary: Get a payment mode by ID
 *     tags: [PaymentMode]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the payment mode
 *     responses:
 *       200:
 *         description: A single payment mode
 *       404:
 *         description: Payment mode not found
 */
app.get('/paymentmode/:id', paymentmode.getPaymentModeById);

/**
 * @swagger
 * /paymentmode:
 *   post:
 *     summary: Create a new payment mode
 *     tags: [PaymentMode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PayMode:
 *                 type: string
 *             example:
 *               PayMode: "Cash"
 *     responses:
 *       201:
 *         description: New payment mode created
 *       500:
 *         description: Internal server error
 */
app.post('/paymentmode', paymentmode.createPaymentMode);

/**
 * @swagger
 * /paymentmode/{id}:
 *   put:
 *     summary: Update a payment mode by ID
 *     tags: [PaymentMode]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the payment mode
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PayMode:
 *                 type: string
 *             example:
 *               PayMode: "Bank Transfer"
 *     responses:
 *       200:
 *         description: Payment mode updated successfully
 *       404:
 *         description: Payment mode not found
 */
app.put('/paymentmode/:id', paymentmode.updatePaymentMode);

/**
 * @swagger
 * /paymentmode/{id}:
 *   delete:
 *     summary: Delete a payment mode by ID
 *     tags: [PaymentMode]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the payment mode
 *     responses:
 *       200:
 *         description: Payment mode deleted successfully
 *       404:
 *         description: Payment mode not found
 */
app.delete('/paymentmode/:id', paymentmode.deletePaymentMode);
/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the payment
 *     responses:
 *       200:
 *         description: A single payment
 *       404:
 *         description: Payment not found
 */
app.get('/payments/:id', payments.getPaymentById);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SaleID:
 *                 type: integer
 *               AmountToPay:
 *                 type: number
 *               TransactionReff:
 *                 type: string
 *               BuyerReff:
 *                 type: string
 *               PaymentDate:
 *                 type: string
 *                 format: date-time
 *               CurrencyId:
 *                 type: integer
 *               InvoiceTypeID:
 *                 type: integer
 *               ModeofPayID:
 *                 type: integer
 *               BuyerID:
 *                 type: integer
 *             example:
 *               SaleID: 12345
 *               AmountToPay: 500.00
 *               TransactionReff: "TR123456"
 *               BuyerReff: "BR987654"
 *               PaymentDate: "2024-05-25T10:00:00Z"
 *               CurrencyId: 1
 *               InvoiceTypeID: 1
 *               ModeofPayID: 1
 *               BuyerID: 123
 *     responses:
 *       201:
 *         description: New payment created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/payments', payments.createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AmountToPay:
 *                 type: number
 *               PayedAmount:
 *                 type: number
 *               Balance:
 *                 type: number
 *               PaymentDate:
 *                 type: string
 *                 format: date-time
 *             example:
 *               AmountToPay: 450.00
 *               PayedAmount: 200.00
 *               Balance: 250.00
 *               PaymentDate: "2024-05-25T10:00:00Z"
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
app.put('/payments/:id', payments.updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the payment
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
app.delete('/payments/:id', payments.deletePayment);
// Route handlers
app.get('/outturnquality', outturnQuality.getAllOutturnQuality);
app.post('/outturnquality', outturnQuality.createOutturnQuality);
app.get('/outturnquality/:seasonID/outturn/:outturnNo', outturnQuality.getOutturnQualityBySeason);

app.get('/outturnquality/:seasonID/outturn/:outturnNo/grade/:gradeID?', outturnQuality.getOutturnQualityByGrade);
/**
 * @swagger
 * /outturnquality/{seasonID}/outturn/{outturnNo}:
 *   get:
 *     summary: Get a GRN Outturn by Outturn Number, Season ID.
 *     tags: [Outturn Quality]
 *     parameters:
 *       - in: path
 *         name: seasonID
 *         required: true
 *         description: The unique season ID associated with the outturn.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: outturnNo
 *         required: true
 *         description: The unique outturn number to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GRN Outturn retrieved successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Server error happened
 */
/**
 * @swagger
 * /outturnquality/{seasonID}/outturn/{outturnNo}/grade/{gradeID}:
 *   get:
 *     summary: Get a GRN Outturn by Outturn Number, Season ID, and optionally Grade ID
 *     tags: [Outturn Quality]
 *     parameters:
 *       - in: path
 *         name: seasonID
 *         required: true
 *         description: The unique season ID associated with the outturn.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: outturnNo
 *         required: true
 *         description: The unique outturn number to search for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: gradeID
 *         required: false
 *         description: The grade of the GRN Outturn.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: GRN Outturn retrieved successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: GRN Outturn not found
 *       500:
 *         description: Server error happened
 */



/**
 * @swagger
 * /outturnquality:
 *   post:
 *     summary: Post an outturn quality
 *     tags: [Outturn Quality]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grnOutturnID:
 *                 type: integer
 *                 description: The grnOutturnID of the outturn quality
 *     responses:
 *       201:
 *         description: The outturn quality was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OutturnQualityID:
 *                   type: integer
 *                   description: The ID of the created outturn quality
 *                 message:
 *                   type: string
 *                   description: A success message
 *               example:
 *                 OutturnQualityID: 11
 *                 message: "Outturn quality created successfully."
 *       400:
 *         description: Bad request, missing required field or invalid input
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /outturnquality:
 *   get:
 *     summary: Get all outturn qualities
 *     tags: [Outturn Quality]
 *     responses:
 *       200:
 *         description: A list of all outturn qualities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

app.get('/outturnquality/:id', outturnQuality.getOutturnQualityById);

/**
 * @swagger
 * /outturnquality/{id}:
 *   get:
 *     summary: Get an outturn quality by ID
 *     tags: [Outturn Quality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn quality
 *     responses:
 *       200:
 *         description: The requested outturn quality
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Outturn quality not found
 */



app.put('/outturnquality/:id', outturnQuality.updateOutturnQuality);

/**
 * @swagger
 * /outturnquality/{id}:
 *   put:
 *     summary: Update an outturn quality by ID
 *     tags: [Outturn Quality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn quality
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Outturn quality updated successfully
 *       404:
 *         description: Outturn quality not found
 */
app.delete('/outturnquality/:id', outturnQuality.deleteOutturnQuality);

/**
 * @swagger
 * /outturnquality/{id}:
 *   delete:
 *     summary: Delete an outturn quality by ID
 *     tags: [Outturn Quality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the outturn quality
 *     responses:
 *       200:
 *         description: Outturn quality deleted successfully
 *       404:
 *         description: Outturn quality not found
 */

/**
 * @swagger
 * /perchmenttypes/{id}:
 *   get:
 *     summary: Get a perchment type by ID
 *     tags: [Perchment Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the perchment type
 *     responses:
 *       200:
 *         description: A single perchment type
 *       404:
 *         description: Perchment type not found
 */
app.get('/perchmenttypes/:id', perchmenttypes.getParchmentTypeById);

/**
 * @swagger
 * /perchmenttypes:
 *   post:
 *     summary: Create a new perchment type
 *     tags: [Perchment Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Types:
 *                 type: string
 *               Description:
 *                 type: string
 *               Remarks:
 *                 type: string
 *             example:
 *               Types: "Type A"
 *               Description: "Description of Type A"
 *               Remarks: "Additional remarks"
 *     responses:
 *       201:
 *         description: New perchment type created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/perchmenttypes', perchmenttypes.createParchmentType);

/**
 * @swagger
 * /perchmenttypes/{id}:
 *   put:
 *     summary: Update a perchment type by ID
 *     tags: [Perchment Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the perchment type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Types:
 *                 type: string
 *               Description:
 *                 type: string
 *               Remarks:
 *                 type: string
 *             example:
 *               Types: "Updated Type A"
 *               Description: "Updated description of Type A"
 *               Remarks: "Updated additional remarks"
 *     responses:
 *       200:
 *         description: Perchment type updated successfully
 *       404:
 *         description: Perchment type not found
 */
app.put('/perchmenttypes/:id', perchmenttypes.updateParchmentType);

/**
 * @swagger
 * /perchmenttypes/{id}:
 *   delete:
 *     summary: Delete a perchment type by ID
 *     tags: [Perchment Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the perchment type
 *     responses:
 *       200:
 *         description: Perchment type deleted successfully
 *       404:
 *         description: Perchment type not found
 */
app.delete('/perchmenttypes/:id', perchmenttypes.deleteParchmentType);
/**
 * @swagger
 * /qualities/{id}:
 *   get:
 *     summary: Get quality details by ID
 *     tags: [Quality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality entry
 *     responses:
 *       200:
 *         description: A single quality entry
 *       404:
 *         description: Quality entry not found
 */
app.get('/qualities/:id', quality.getQualityById);

/**
 * @swagger
 * /qualities:
 *   post:
 *     summary: Create a new quality entry
 *     tags: [Quality]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OutturnNo:
 *                 type: string
 *               GrossWeight:
 *                 type: number
 *               SampleRemoved:
 *                 type: number
 *               DateSampled:
 *                 type: string
 *                 format: date
 *               StocksID:
 *                 type: integer
 *               SampleTypeID:
 *                 type: integer
 *             example:
 *               OutturnNo: "OUT001"
 *               GrossWeight: 50.5
 *               SampleRemoved: 2.5
 *               DateSampled: "2024-05-22"
 *               StocksID: 123
 *               SampleTypeID: 456
 *     responses:
 *       201:
 *         description: New quality entry created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/qualities', quality.createQuality);

/**
 * @swagger
 * /qualities/{id}:
 *   put:
 *     summary: Update a quality entry by ID
 *     tags: [Quality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               OutturnNo:
 *                 type: string
 *               GrossWeight:
 *                 type: number
 *               SampleRemoved:
 *                 type: number
 *               DateSampled:
 *                 type: string
 *                 format: date
 *               StocksID:
 *                 type: integer
 *               SampleTypeID:
 *                 type: integer
 *             example:
 *               OutturnNo: "OUT002"
 *               GrossWeight: 55.0
 *               SampleRemoved: 3.0
 *               DateSampled: "2024-05-23"
 *               StocksID: 124
 *               SampleTypeID: 457
 *     responses:
 *       200:
 *         description: Quality entry updated successfully
 *       404:
 *         description: Quality entry not found
 */
app.put('/qualities/:id', quality.updateQuality);

/**
 * @swagger
 * /qualities/{id}:
 *   delete:
 *     summary: Delete a quality entry by ID
 *     tags: [Quality]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality entry
 *     responses:
 *       200:
 *         description: Quality entry deleted successfully
 *       404:
 *         description: Quality entry not found
 */
app.delete('/qualities/:id', quality.deleteQuality);
/**
 * @swagger
 * /quality_sizes/{id}:
 *   get:
 *     summary: Get quality size details by ID
 *     tags: [Quality Size]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality size entry
 *     responses:
 *       200:
 *         description: A single quality size entry
 *       404:
 *         description: Quality size entry not found
 */
app.get('/quality_sizes/:id', qualitySize.getQualitySizeById);

/**
 * @swagger
 * /quality_sizes:
 *   post:
 *     summary: Create a new quality size entry
 *     tags: [Quality Size]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Description:
 *                 type: string
 *               OutturnID:
 *                 type: string
 *             example:
 *               Description: "Large"
 *               OutturnID: "OUT001"
 *     responses:
 *       201:
 *         description: New quality size entry created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/quality_sizes', qualitySize.createQualitySize);

/**
 * @swagger
 * /quality_sizes/{id}:
 *   put:
 *     summary: Update a quality size entry by ID
 *     tags: [Quality Size]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality size entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Description:
 *                 type: string
 *               OutturnID:
 *                 type: string
 *             example:
 *               Description: "Medium"
 *               OutturnID: "OUT002"
 *     responses:
 *       200:
 *         description: Quality size entry updated successfully
 *       404:
 *         description: Quality size entry not found
 */
app.put('/quality_sizes/:id', qualitySize.updateQualitySize);

/**
 * @swagger
 * /quality_sizes/{id}:
 *   delete:
 *     summary: Delete a quality size entry by ID
 *     tags: [Quality Size]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality size entry
 *     responses:
 *       200:
 *         description: Quality size entry deleted successfully
 *       404:
 *         description: Quality size entry not found
 */
app.delete('/quality_sizes/:id', qualitySize.deleteQualitySize);

/**
 * @swagger
 * /quality_classes:
 *   get:
 *     summary: Get All quality classes
 *     tags: [Quality Class]
 *     responses:
 *       200:
 *         description: List of all quality classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       404:
 *         description: Quality classes not found
 */
app.get('/quality_classes', qualityClass.getAllQualityClasses);

/**
 * @swagger
 * /quality_classes:
 *   post:
 *     summary: Create a new quality class
 *     tags: [Quality Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Class:
 *                 type: string
 *               Value:
 *                 type: integer
 *             example:
 *               Class: "A"
 *               Value: 1
 *     responses:
 *       201:
 *         description: New quality class created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.get('/quality_classes/:id', qualityClass.getQualityClassById);

/**
 * @swagger
 * /quality_classes:
 *   post:
 *     summary: Create a new quality class
 *     tags: [Quality Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Class:
 *                 type: string
 *               Value:
 *                 type: integer
 *             example:
 *               Class: "A"
 *               Value: 1
 *     responses:
 *       201:
 *         description: New quality class created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/quality_classes', qualityClass.createQualityClass);

/**
 * @swagger
 * /quality_classes/{id}:
 *   put:
 *     summary: Update a quality class by ID
 *     tags: [Quality Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Class:
 *                 type: string
 *               Value:
 *                 type: integer
 *             example:
 *               Class: "B"
 *               Value: 2
 *     responses:
 *       200:
 *         description: Quality class updated successfully
 *       404:
 *         description: Quality class not found
 */
/**
 * @swagger
 * /quality_classes/{id}:
 *   get:
 *     summary: Get a quality class by ID
 *     tags: [Quality Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the quality class
 *     responses:
 *       200:
 *         description: The quality class with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Quality class not found
 */
app.get('/quality_classes/:id', qualityClass.getQualityClassById);

app.put('/quality_classes/:id', qualityClass.updateQualityClass);

/**
 * @swagger
 * /quality_classes/{id}:
 *   delete:
 *     summary: Delete a quality class by ID
 *     tags: [Quality Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality class
 *     responses:
 *       200:
 *         description: Quality class deleted successfully
 *       404:
 *         description: Quality class not found
 */
app.delete('/quality_classes/:id', qualityClass.deleteQualityClass);

/**
 * @swagger
 * /quality_greendefects/{id}:
 *   get:
 *     summary: Get quality green defect by ID
 *     tags: [Quality Green Defects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality green defect
 *     responses:
 *       200:
 *         description: A single quality green defect
 *       404:
 *         description: Quality green defect not found
 */
app.get('/quality_greendefects/:id', qualityGreenDefect.getQualityGreenDefectById);

/**
 * @swagger
 * /quality_greendefects:
 *   post:
 *     summary: Create a new quality green defect
 *     tags: [Quality Green Defects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DefeceID:
 *                 type: integer
 *             example:
 *               DefeceID: 1
 *     responses:
 *       201:
 *         description: New quality green defect created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/quality_greendefects', qualityGreenDefect.createQualityGreenDefect);

/**
 * @swagger
 * /quality_greendefects/{id}:
 *   put:
 *     summary: Update a quality green defect by ID
 *     tags: [Quality Green Defects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality green defect
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DefeceID:
 *                 type: integer
 *             example:
 *               DefeceID: 2
 *     responses:
 *       200:
 *         description: Quality green defect updated successfully
 *       404:
 *         description: Quality green defect not found
 */
app.put('/quality_greendefects/:id', qualityGreenDefect.updateQualityGreenDefect);

/**
 * @swagger
 * /quality_greendefects/{id}:
 *   delete:
 *     summary: Delete a quality green defect by ID
 *     tags: [Quality Green Defects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality green defect
 *     responses:
 *       200:
 *         description: Quality green defect deleted successfully
 *       404:
 *         description: Quality green defect not found
 */
app.delete('/quality_greendefects/:id', qualityGreenDefect.deleteQualityGreenDefect);
/**
 * @swagger
 * /quality_groups/{id}:
 *   get:
 *     summary: Get quality group by ID
 *     tags: [Quality Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality group
 *     responses:
 *       200:
 *         description: A single quality group
 *       404:
 *         description: Quality group not found
 */
app.get('/quality_groups/', qualityGroup.getAllQualityGroups);

app.delete('/quality_groups/', qualityGroup.deleteQualityGroup);
/**
 * @swagger
 * /quality_groups:
 *   get:
 *     summary: Get All quality groups
 *     tags: [Quality Groups]
 *     responses:
 *       200:
 *         description: List of all  quality group
 *       404:
 *         description: Quality group not found
 */
app.get('/quality_groups/:id', qualityGroup.getQualityGroupById);

/**
 * @swagger
 * /quality_groups:
 *   post:
 *     summary: Create a new quality group
 *     tags: [Quality Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GroupName:
 *                 type: string
 *               Remarks:
 *                 type: string
 *             example:
 *               GroupName: Group A
 *               Remarks: Some remarks
 *     responses:
 *       201:
 *         description: New quality group created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/quality_groups', qualityGroup.createQualityGroup);

/**
 * @swagger
 * /quality_groups/{id}:
 *   put:
 *     summary: Update a quality group by ID
 *     tags: [Quality Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               GroupName:
 *                 type: string
 *               Remarks:
 *                 type: string
 *             example:
 *               GroupName: Group B
 *               Remarks: Updated remarks
 *     responses:
 *       200:
 *         description: Quality group updated successfully
 *       404:
 *         description: Quality group not found
 */
app.put('/quality_groups/:id', qualityGroup.updateQualityGroup);

/**
 * @swagger
 * /quality_groups/{id}:
 *   delete:
 *     summary: Delete a quality group by ID
 *     tags: [Quality Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality group
 *     responses:
 *       200:
 *         description: Quality group deleted successfully
 *       404:
 *         description: Quality group not found
 */
app.delete('/quality_groups/:id', qualityGroup.deleteQualityGroup);
/**
 * @swagger
 * /quality_parameters/{id}:
 *   get:
 *     summary: Get quality parameter by ID
 *     tags: [Quality Parameters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality parameter
 *     responses:
 *       200:
 *         description: A single quality parameter
 *       404:
 *         description: Quality parameter not found
 */
app.get('/quality_parameters/:id', qualityParameter.getQualityParameterById);

/**
 * @swagger
 * /quality_parameters:
 *   post:
 *     summary: Create a new quality parameter
 *     tags: [Quality Parameters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Parameter:
 *                 type: string
 *               Description:
 *                 type: string
 *               QualityGroupID:
 *                 type: integer
 *             example:
 *               Parameter: Parameter A
 *               Description: Some description
 *               QualityGroupID: 1
 *     responses:
 *       201:
 *         description: New quality parameter created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/quality_parameters', qualityParameter.createQualityParameter);

/**
 * @swagger
 * /quality_parameters/{id}:
 *   put:
 *     summary: Update a quality parameter by ID
 *     tags: [Quality Parameters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality parameter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Parameter:
 *                 type: string
 *               Description:
 *                 type: string
 *               QualityGroupID:
 *                 type: integer
 *             example:
 *               Parameter: Parameter B
 *               Description: Updated description
 *               QualityGroupID: 2
 *     responses:
 *       200:
 *         description: Quality parameter updated successfully
 *       404:
 *         description: Quality parameter not found
 */
app.put('/quality_parameters/:id', qualityParameter.updateQualityParameter);

/**
 * @swagger
 * /quality_parameters/{id}:
 *   delete:
 *     summary: Delete a quality parameter by ID
 *     tags: [Quality Parameters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the quality parameter
 *     responses:
 *       200:
 *         description: Quality parameter deleted successfully
 *       404:
 *         description: Quality parameter not found
 */
app.delete('/quality_parameters/:id', qualityParameter.deleteQualityParameter);
/**
 * @swagger
 * /region_counties/{countyId}/{regionId}:
 *   get:
 *     summary: Get region-county relationship by County ID and Region ID
 *     tags: [Region Counties]
 *     parameters:
 *       - in: path
 *         name: countyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the county
 *       - in: path
 *         name: regionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the region
 *     responses:
 *       200:
 *         description: A single region-county relationship
 *       404:
 *         description: Region-county relationship not found
 */
app.get('/region_counties/:countyId/:regionId', regionCounty.getRegionCountyById);

/**
 * @swagger
 * /region_counties:
 *   post:
 *     summary: Create a new region-county relationship
 *     tags: [Region Counties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CountyID:
 *                 type: integer
 *               RegionID:
 *                 type: integer
 *             example:
 *               CountyID: 1
 *               RegionID: 1
 *     responses:
 *       201:
 *         description: New region-county relationship created
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
app.post('/region_counties', regionCounty.createRegionCounty);

/**
 * @swagger
 * /region_counties/{countyId}/{regionId}:
 *   delete:
 *     summary: Delete a region-county relationship by County ID and Region ID
 *     tags: [Region Counties]
 *     parameters:
 *       - in: path
 *         name: countyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the county
 *       - in: path
 *         name: regionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the region
 *     responses:
 *       200:
 *         description: Region-county relationship deleted successfully
 *       404:
 *         description: Region-county relationship not found
 */
app.delete('/region_counties/:countyId/:regionId', regionCounty.deleteRegionCounty);
/**
 * @swagger
 * /sale_statuses:
 *   get:
 *     summary: Get all sale statuses
 *     tags: [Sale Statuses]
 *     responses:
 *       200:
 *         description: A list of sale statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   SaleStatusId:
 *                     type: integer
 *                   StatusName:
 *                     type: string
 *                   StatusDescription:
 *                     type: string
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/sale_statuses', saleStatus.getAllSaleStatuses);

/**
 * @swagger
 * /sale_statuses/{id}:
 *   get:
 *     summary: Get a sale status by ID
 *     tags: [Sale Statuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the sale status
 *     responses:
 *       200:
 *         description: A single sale status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SaleStatusId:
 *                   type: integer
 *                 StatusName:
 *                   type: string
 *                 StatusDescription:
 *                   type: string
 *       404:
 *         description: Sale status not found
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/sale_statuses/:id', saleStatus.getSaleStatusById);

/**
 * @swagger
 * /sale_statuses:
 *   post:
 *     summary: Create a new sale status
 *     tags: [Sale Statuses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StatusName:
 *                 type: string
 *               StatusDescription:
 *                 type: string
 *             example:
 *               StatusName: "New Status"
 *               StatusDescription: "Description of the new status"
 *     responses:
 *       201:
 *         description: New sale status created
 *       400:
 *         description: Invalid request body
 *     security:
 *       - apiKeyAuth: []
 */
app.post('/sale_statuses', saleStatus.createSaleStatus);

/**
 * @swagger
 * /sale_statuses/{id}:
 *   delete:
 *     summary: Delete a sale status by ID
 *     tags: [Sale Statuses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the sale status
 *     responses:
 *       200:
 *         description: Sale status deleted successfully
 *       404:
 *         description: Sale status not found
 *     security:
 *       - apiKeyAuth: []
 */
app.delete('/sale_statuses/:id', saleStatus.deleteSaleStatus);
/**
 * @swagger
 * /sale_types:
 *   get:
 *     summary: Get all sale types
 *     tags: [Sale Types]
 *     responses:
 *       200:
 *         description: A list of sale types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   SaleTypeID:
 *                     type: integer
 *                   SaleType:
 *                     type: string
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/sale_types', saleType.getAllSaleTypes);

/**
 * @swagger
 * /sale_types/{id}:
 *   get:
 *     summary: Get a sale type by ID
 *     tags: [Sale Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the sale type
 *     responses:
 *       200:
 *         description: A single sale type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SaleTypeID:
 *                   type: integer
 *                 SaleType:
 *                   type: string
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Sale type not found
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/sale_types/:id', saleType.getSaleTypeById);

/**
 * @swagger
 * /sale_types:
 *   post:
 *     summary: Create a new sale type
 *     tags: [Sale Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SaleType:
 *                 type: string
 *             example:
 *               SaleType: "New Sale Type"
 *     responses:
 *       201:
 *         description: New sale type created
 *       400:
 *         description: Invalid request body
 *     security:
 *       - apiKeyAuth: []
 */
app.post('/sale_types', saleType.createSaleType);

/**
 * @swagger
 * /sale_types/{id}:
 *   delete:
 *     summary: Delete a sale type by ID
 *     tags: [Sale Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the sale type
 *     responses:
 *       200:
 *         description: Sale type deleted successfully
 *       404:
 *         description: Sale type not found
 *     security:
 *       - apiKeyAuth: []
 */
app.delete('/sale_types/:id', saleType.deleteSaleType);
/**
 * @swagger
 * /standardizations:
 *   get:
 *     summary: Get all standardizations
 *     tags: [Standardizations]
 *     responses:
 *       200:
 *         description: A list of standardizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Standardization'
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/standardizations', standardization.getAllStandardizations);

/**
 * @swagger
 * /standardizations/{id}:
 *   get:
 *     summary: Get a standardization by ID
 *     tags: [Standardizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the standardization
 *     responses:
 *       200:
 *         description: A single standardization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Standardization'
 *       404:
 *         description: Standardization not found
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/standardizations/:id', standardization.getStandardizationById);

/**
 * @swagger
 * /standardizations:
 *   post:
 *     summary: Create a new standardization
 *     tags: [Standardizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Standardization'
 *     responses:
 *       201:
 *         description: New standardization created
 *       400:
 *         description: Invalid request body
 *     security:
 *       - apiKeyAuth: []
 */
app.post('/standardizations', standardization.createStandardization);

/**
 * @swagger
 * /standardizations/{id}:
 *   delete:
 *     summary: Delete a standardization by ID
 *     tags: [Standardizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the standardization
 *     responses:
 *       200:
 *         description: Standardization deleted successfully
 *       404:
 *         description: Standardization not found
 *     security:
 *       - apiKeyAuth: []
 */
app.delete('/standardizations/:id', standardization.deleteStandardization);

/**
 * @swagger
 * /sample_types:
 *   get:
 *     summary: Get all sample types
 *     tags: [Sample Types]
 *     responses:
 *       200:
 *         description: A list of sample types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   SampleTypesID:
 *                     type: integer
 *                   SampleTypesName:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/sample_types', sampleType.getAllSampleTypes);

/**
 * @swagger
 * /sample_types/{id}:
 *   get:
 *     summary: Get a sample type by ID
 *     tags: [Sample Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the sample type
 *     responses:
 *       200:
 *         description: A single sample type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SampleTypesID:
 *                   type: integer
 *                 SampleTypesName:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Sample type not found
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/sample_types/:id', sampleType.getSampleTypeById);

/**
 * @swagger
 * /sample_types:
 *   post:
 *     summary: Create a new sample type
 *     tags: [Sample Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SampleTypesName:
 *                 type: string
 *               Description:
 *                 type: string
 *             example:
 *               SampleTypesName: "New Sample Type"
 *               Description: "Description of the new sample type"
 *     responses:
 *       201:
 *         description: New sample type created
 *       400:
 *         description: Invalid request body
 *     security:
 *       - apiKeyAuth: []
 */
app.post('/sample_types', sampleType.createSampleType);

/**
 * @swagger
 * /sample_types/{id}:
 *   delete:
 *     summary: Delete a sample type by ID
 *     tags: [Sample Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the sample type
 *     responses:
 *       200:
 *         description: Sample type deleted successfully
 *       404:
 *         description: Sample type not found
 *     security:
 *       - apiKeyAuth: []
 */
app.delete('/sample_types/:id', sampleType.deleteSampleType);

/**
 * @swagger
 * /stocks:
 *   get:
 *     summary: Get all stocks
 *     tags: [Stocks]
 *     responses:
 *       200:
 *         description: A list of stocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stock'
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/stocks', stocks.getAllStocks);

/**
 * @swagger
 * /stocks/{id}:
 *   get:
 *     summary: Get a stock by ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the stock
 *     responses:
 *       200:
 *         description: A single stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stock'
 *       404:
 *         description: Stock not found
 *     security:
 *       - apiKeyAuth: []
 */
app.get('/stocks/:id', stocks.getStockById);

/**
 * @swagger
 * /stocks:
 *   post:
 *     summary: Create a new stock
 *     tags: [Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cleanTypeID:
 *                 type: integer
 *                 example: 1
 *               OutturnNo:
 *                 type: string
 *                 example: "36NG0003"
 *               Bags:
 *                 type: number
 *                 format: double
 *                 example: 100.5
 *               GrossWeight:
 *                 type: number
 *                 format: double
 *                 example: 6000.0
 *               Pkts:
 *                 type: string
 *                 example: "20"
 *               receivedDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-01"
 *               ReceivedBy:
 *                 type: string
 *                 example: "John Doe"
 *               PartialDelivery:
 *                 type: boolean
 *                 example: false
 *               CreatedON:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-01-01"
 *               weightOfBags:
 *                 type: number
 *                 format: double
 *                 example: 50.0
 *               millingLoss:
 *                 type: number
 *                 format: double
 *                 example: 1.5
 *               pTypeID:
 *                 type: integer
 *                 example: 1
 *               classID:
 *                 type: integer
 *                 example: 222
 *               warehouseID:
 *                 type: integer
 *                 example: 1
 *               GradeID:
 *                 type: integer
 *                 example: 1
 *               SeasonID:
 *                 type: integer
 *                 example: 1
 *               WLocationID:
 *                 type: integer
 *                 example: 1
 *               GrowerRefferance:
 *                 type: integer
 *                 example: 11
 *               TypeOfBag:
 *                 type: integer
 *                 example: 1
 *               MillerID:
 *                 type: integer
 *                 example: 1
 *               Moisture:
 *                 type: number
 *                 format: double
 *                 example: 12.5
 *               StockIDLink:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - cleanTypeID
 *               - OutturnNo
 *               - Bags
 *               - pTypeID
 *               - classID
 *               - warehouseID
 *               - GradeID
 *               - SeasonID
 *               - WLocationID
 *               - GrowerRefferance
 *               - TypeOfBag
 *               - MillerID
 *               - PartialDelivery
 *     responses:
 *       201:
 *         description: New stock created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 StocksID:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid request body
 *     security:
 *       - apiKeyAuth: []
 */
app.post('/stocks', stocks.createStock);

/**
 * @swagger
 * /stocks/{id}:
 *   delete:
 *     summary: Delete a stock by ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the stock
 *     responses:
 *       200:
 *         description: Stock deleted successfully
 *       404:
 *         description: Stock not found
 *     security:
 *       - apiKeyAuth: []
 */
app.delete('/stocks/:id', stocks.deleteStock);

/**
 * @swagger
 * /track-reoffer:
 *   get:
 *     summary: Get all reoffers
 *     tags: [Reoffers]
 *     responses:
 *       200:
 *         description: A list of all reoffers
 */
app.get('/track-reoffer', trackReoffer.getAllReoffers);

/**
 * @swagger
 * /track-reoffer/{id}:
 *   get:
 *     summary: Get a reoffer by ID
 *     tags: [Reoffers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the reoffer
 *     responses:
 *       200:
 *         description: The requested reoffer
 *       404:
 *         description: Reoffer not found
 */
app.get('/track-reoffer/:id', trackReoffer.getReofferById);

/**
 * @swagger
 * /track-reoffer:
 *   post:
 *     summary: Create a new reoffer
 *     tags: [Reoffers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Reoffer created successfully
 */
app.post('/track-reoffer', trackReoffer.createReoffer);

/**
 * @swagger
 * /track-reoffer/{id}:
 *   put:
 *     summary: Update a reoffer by ID
 *     tags: [Reoffers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the reoffer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Reoffer updated successfully
 *       404:
 *         description: Reoffer not found
 */
app.put('/track-reoffer/:id', trackReoffer.updateReoffer);

/**
 * @swagger
 * /track-reoffer/{id}:
 *   delete:
 *     summary: Delete a reoffer by ID
 *     tags: [Reoffers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the reoffer
 *     responses:
 *       200:
 *         description: Reoffer deleted successfully
 *       404:
 *         description: Reoffer not found
 */
app.delete('/track-reoffer/:id', trackReoffer.deleteReoffer);

// swagger.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Agent:
 *       type: object
 *       required:
 *         - AgentCategoryId
 *         - AgentName
 *       properties:
 *         AgentId:
 *           type: integer
 *           description: Unique identifier for the agent
 *           example: 1
 *         AgentCategoryId:
 *           type: integer
 *           description: ID of the agent's category
 *           example: 2
 *         AgentName:
 *           type: string
 *           description: Name of the agent
 *           example: "John Doe"
 *         AgentCode:
 *           type: string
 *           description: Code for the agent
 *           example: "A123"
 *         IsActive:
 *           type: boolean
 *           description: Whether the agent is active
 *           example: true
 *         Remarks:
 *           type: string
 *           description: Remarks about the agent
 *           example: "Top agent of the year"
 * 
 * /agents:
 *   get:
 *     summary: Retrieve a list of agents
 *     tags: [Agents]
 *     responses:
 *       200:
 *         description: A list of agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 * 
 *   post:
 *     summary: Create a new agent
 *     tags: [Agents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       201:
 *         description: The created agent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       409:
 *         description: Conflict - AgentCode already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 * 
 * 
 * /agents/category/{catID}:
 *   get:
 *     summary: Retrieve an agent category by catID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: catID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent category
 *     responses:
 *       200:
 *         description: The agent category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent category not found

 * /agents/{id}:
 *   get:
 *     summary: Retrieve an agent by ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent
 *     responses:
 *       200:
 *         description: The agent details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent not found
 * 
 *   put:
 *     summary: Update an agent by ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agent'
 *     responses:
 *       200:
 *         description: The updated agent details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent not found
 * 
 *   delete:
 *     summary: Delete an agent by ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent
 *     responses:
 *       200:
 *         description: Agent deleted successfully
 *       404:
 *         description: Agent not found
 */

app.get('/agents', agent.getAllAgents);
app.get('/agents/category/:catID', agent.getByCategory);
app.get('/agents/:id', agent.getAgentById);
app.post('/agents/:id', agent.createAgent);
app.put('/agents/:id', agent.updateAgent);
app.delete('/agents/:id', agent.deleteAgent);



app.get('/cleantypes', cleanTypes.getAllCleanTypes);
app.get('/cleantypes/:id', cleanTypes.getCleanTypeById);
app.post('/cleantypes/:id', cleanTypes.createCleanType);
app.put('/cleantypes/:id', cleanTypes.updateCleanType);
app.delete('/cleantypes/:id', cleanTypes.deleteCleanType);




// swagger.js

/**
 * @swagger
 * components:
 *   schemas:
 *     CleanType:
 *       type: object
 *       properties:
 *         cleanTypeID:
 *           type: integer
 *           description: Unique identifier for the clean type
 *           example: 1
 *         Description:
 *           type: string
 *           description: Description of the clean type
 *           example: "Clean Coffee Grade"
 *         CreatedOn:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the clean type was created
 *           example: "2024-07-31T12:34:56.789Z"
 *         Remarks:
 *           type: string
 *           description: Remarks about the clean type
 *           example: "Bulk clean type"
 *         CoffeeType:
 *           type: string
 *           description: Type of coffee
 *           example: "A"
 * 
 * /cleantypes:
 *   get:
 *     summary: Retrieve a list of clean types
 *     tags: [CleanTypes]
 *     responses:
 *       200:
 *         description: A list of clean types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CleanType'
 * 
 *   post:
 *     summary: Create a new clean type
 *     tags: [CleanTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CleanType'
 *     responses:
 *       201:
 *         description: The created clean type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CleanType'
 * 
 * /cleantypes/{id}:
 *   get:
 *     summary: Retrieve a clean type by ID
 *     tags: [CleanTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the clean type
 *     responses:
 *       200:
 *         description: The clean type details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CleanType'
 *       404:
 *         description: Clean type not found
 * 
 *   put:
 *     summary: Update a clean type by ID
 *     tags: [CleanTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the clean type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CleanType'
 *     responses:
 *       200:
 *         description: The updated clean type details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CleanType'
 *       404:
 *         description: Clean type not found
 * 
 *   delete:
 *     summary: Delete a clean type by ID
 *     tags: [CleanTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the clean type
 *     responses:
 *       200:
 *         description: Clean type deleted successfully
 *       404:
 *         description: Clean type not found
 */
app.get('/agentcategories', agentCategory.getAllAgentCategories);
app.get('/agentcategories/:id', agentCategory.getAgentCategoryById);
app.post('/agentcategories', agentCategory.createAgentCategory);
app.put('/agentcategories/:id', agentCategory.updateAgentCategory);
app.delete('/agentcategories/:id', agentCategory.deleteAgentCategory);

/**
 * @swagger
 * components:
 *   schemas:
 *     AgentCategory:
 *       type: object
 *       properties:
 *         AgentCategoryId:
 *           type: integer
 *           description: Unique identifier for the agent category
 *           example: 1
 *         AgentCategoryName:
 *           type: string
 *           description: Name of the agent category
 *           example: "Wholesale Agents"
 *         CreatedOn:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the agent category was created
 *           example: "2024-07-31T12:34:56.789Z"
 *         Remarks:
 *           type: string
 *           description: Remarks about the agent category
 *           example: "High priority agents"
 * 
 * /agentcategories:
 *   get:
 *     summary: Retrieve a list of agent categories
 *     tags: [AgentCategories]
 *     responses:
 *       200:
 *         description: A list of agent categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AgentCategory'
 * 
 *   post:
 *     summary: Create a new agent category
 *     tags: [AgentCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgentCategory'
 *     responses:
 *       201:
 *         description: The created agent category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AgentCategory'
 * 
 * /agentcategories/{id}:
 *   get:
 *     summary: Retrieve an agent category by ID
 *     tags: [AgentCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent category
 *     responses:
 *       200:
 *         description: The agent category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AgentCategory'
 *       404:
 *         description: Agent category not found
 * 
 *   put:
 *     summary: Update an agent category by ID
 *     tags: [AgentCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgentCategory'
 *     responses:
 *       200:
 *         description: The updated agent category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AgentCategory'
 *       404:
 *         description: Agent category not found
 * 
 *   delete:
 *     summary: Delete an agent category by ID
 *     tags: [AgentCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the agent category
 *     responses:
 *       200:
 *         description: Agent category deleted successfully
 *       404:
 *         description: Agent category not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChargeType:
 *       type: object
 *       required:
 *         - ChargeTypeDescription
 *       properties:
 *         ChargeTypeID:
 *           type: integer
 *           description: Auto-generated ID of the charge type
 *         ChargeTypeDescription:
 *           type: string
 *           description: The charge type description
 *         CreatedOn:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the charge type was created
 *         Remarks:
 *           type: string
 *           description: Additional remarks
 *       example:
 *         ChargeTypeID: 1
 *         ChargeTypeDescription: "Service Fee"
 *         CreatedOn: "2023-08-09T00:00:00.000Z"
 *         Remarks: "Applicable for all services"
 */

/**
 * @swagger
 * tags:
 *   name: ChargeTypes
 *   description: The charge types managing API
 */

/**
 * @swagger
 * /chargetypes:
 *   get:
 *     summary: Retrieve a list of charge types
 *     tags: [ChargeTypes]
 *     responses:
 *       200:
 *         description: The list of charge types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChargeType'
 */
app.get('/chargetypes', chargesType.getAllChargeTypes);

/**
 * @swagger
 * /chargetypes/{id}:
 *   get:
 *     summary: Retrieve a charge type by ID
 *     tags: [ChargeTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The charge type ID
 *     responses:
 *       200:
 *         description: The charge type description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChargeType'
 *       404:
 *         description: Charge type not found
 */
app.get('/chargetypes/:id', chargesType.getChargeTypeById);

/**
 * @swagger
 * /chargetypes:
 *   post:
 *     summary: Create a new charge type
 *     tags: [ChargeTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChargeType'
 *     responses:
 *       201:
 *         description: Charge type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChargeType'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
app.post('/chargetypes', chargesType.createChargeType);

/**
 * @swagger
 * /chargetypes/{id}:
 *   put:
 *     summary: Update a charge type by ID
 *     tags: [ChargeTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The charge type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChargeType'
 *     responses:
 *       200:
 *         description: Charge type updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Charge type not found
 *       500:
 *         description: Internal server error
 */
app.put('/chargetypes/:id', chargesType.updateChargeType);

/**
 * @swagger
 * /chargesType/{id}:
 *   delete:
 *     summary: Delete a charge type by ID
 *     tags: [ChargeTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The charge type ID
 *     responses:
 *       200:
 *         description: Charge type deleted successfully
 *       404:
 *         description: Charge type not found
 *       500:
 *         description: Internal server error
 */
app.delete('/chargetypes/:id', chargesType.deleteChargeType);

/**
 * @swagger
 * /grnMain:
 *   get:
 *     summary: Retrieve all GRN main records
 *     tags: [GRN Main]
 *     responses:
 *       200:
 *         description: List of GRN main records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
// Routes for GRN Main

/**
 * @swagger
 * /grnMain:
 *   get:
 *     summary: Retrieve all GRN main records
 *     tags: [GRN Main]
 *     responses:
 *       200:
 *         description: List of GRN main records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   grnID:
 *                     type: integer
 *                     example: 6
 *                   documentSerial:
 *                     type: string
 *                     example: "12345"
 *                   DeliveryDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-05T12:26:37.000Z"
 *                   VehiclePlate:
 *                     type: string
 *                     example: "ABC-123"
 *                   GrossWeight:
 *                     type: string
 *                     example: "1000"
 *                   PermitNo:
 *                     type: string
 *                     example: "P-123"
 *                   TareWeight:
 *                     type: string
 *                     example: "500"
 *                   grnNo:
 *                     type: string
 *                     example: "GRN-123"
 *                   WeighBridgeNo:
 *                     type: string
 *                     example: "WB-123"
 *                   DriverName:
 *                     type: string
 *                     example: "John Doe"
 *                   DriverIDNo:
 *                     type: string
 *                     example: "D-123"
 *                   SeasonID:
 *                     type: integer
 *                     example: 12
 *                   WarehouseID:
 *                     type: integer
 *                     example: 1
 *                   GrowerID:
 *                     type: integer
 *                     example: 1
 *                   SupervisorID:
 *                     type: integer
 *                     example: 1
 *                   WHManager:
 *                     type: integer
 *                     example: 1
 *                   IsVerified:
 *                     type: integer
 *                     example: 0
 *                   MillerID:
 *                     type: integer
 *                     example: 1
 *                   Remarks:
 *                     type: string
 *                     example: "Test Remarks"
 *                   GrowerWeight:
 *                     type: string
 *                     example: "500"
 *                   WarrantNo:
 *                     type: string
 *                     example: "W-123"
 *                   NetWeight:
 *                     type: string
 *                     example: "500"
 *                   CoffeeTypeId:
 *                     type: integer
 *                     example: 1
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-05T12:26:37.000Z"
 *                   RequiresStandardization:
 *                     type: integer
 *                     example: 0
 *                   standardized:
 *                     type: string
 *                     example: "N"
 */
app.get('/grnMain', grnMain.getAllGRNMains);

/**
 * @swagger
 * /grnMain/{id}:
 *   get:
 *     summary: Retrieve a single GRN main record by ID
 *     tags: [GRN Main]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 6
 *     responses:
 *       200:
 *         description: A single GRN main record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 grnID:
 *                   type: integer
 *                   example: 6
 *                 documentSerial:
 *                   type: string
 *                   example: "12345"
 *                 DeliveryDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-05T12:26:37.000Z"
 *                 VehiclePlate:
 *                   type: string
 *                   example: "ABC-123"
 *                 GrossWeight:
 *                   type: string
 *                   example: "1000"
 *                 PermitNo:
 *                   type: string
 *                   example: "P-123"
 *                 TareWeight:
 *                   type: string
 *                   example: "500"
 *                 grnNo:
 *                   type: string
 *                   example: "GRN-123"
 *                 WeighBridgeNo:
 *                   type: string
 *                   example: "WB-123"
 *                 DriverName:
 *                   type: string
 *                   example: "John Doe"
 *                 DriverIDNo:
 *                   type: string
 *                   example: "D-123"
 *                 SeasonID:
 *                   type: integer
 *                   example: 12
 *                 WarehouseID:
 *                   type: integer
 *                   example: 1
 *                 GrowerID:
 *                   type: integer
 *                   example: 1
 *                 SupervisorID:
 *                   type: integer
 *                   example: 1
 *                 WHManager:
 *                   type: integer
 *                   example: 1
 *                 IsVerified:
 *                   type: integer
 *                   example: 0
 *                 MillerID:
 *                   type: integer
 *                   example: 1
 *                 Remarks:
 *                   type: string
 *                   example: "Test Remarks"
 *                 GrowerWeight:
 *                   type: string
 *                   example: "500"
 *                 WarrantNo:
 *                   type: string
 *                   example: "W-123"
 *                 NetWeight:
 *                   type: string
 *                   example: "500"
 *                 CoffeeTypeId:
 *                   type: integer
 *                   example: 1
 *                 CreatedOn:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-04-05T12:26:37.000Z"
 *                 RequiresStandardization:
 *                   type: integer
 *                   example: 0
 *                 standardized:
 *                   type: string
 *                   example: "N"
 */
app.get('/grnMain/:id', grnMain.getGRNMainById);

/**
 * @swagger
 * /grnMain:
 *   post:
 *     summary: Create a new GRN main record
 *     tags: [GRN Main]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grnID:
 *                 type: integer
 *                 example: 6
 *               documentSerial:
 *                 type: string
 *                 example: "12345"
 *               DeliveryDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-05T12:26:37.000Z"
 *               VehiclePlate:
 *                 type: string
 *                 example: "ABC-123"
 *               GrossWeight:
 *                 type: string
 *                 example: "1000"
 *               PermitNo:
 *                 type: string
 *                 example: "P-123"
 *               TareWeight:
 *                 type: string
 *                 example: "500"
 *               grnNo:
 *                 type: string
 *                 example: "GRN-123"
 *               WeighBridgeNo:
 *                 type: string
 *                 example: "WB-123"
 *               DriverName:
 *                 type: string
 *                 example: "John Doe"
 *               DriverIDNo:
 *                 type: string
 *                 example: "D-123"
 *               SeasonID:
 *                 type: integer
 *                 example: 12
 *               WarehouseID:
 *                 type: integer
 *                 example: 1
 *               GrowerID:
 *                 type: integer
 *                 example: 1
 *               SupervisorID:
 *                 type: integer
 *                 example: 1
 *               WHManager:
 *                 type: integer
 *                 example: 1
 *               IsVerified:
 *                 type: integer
 *                 example: 0
 *               MillerID:
 *                 type: integer
 *                 example: 1
 *               Remarks:
 *                 type: string
 *                 example: "Test Remarks"
 *               GrowerWeight:
 *                 type: string
 *                 example: "500"
 *               WarrantNo:
 *                 type: string
 *                 example: "W-123"
 *               NetWeight:
 *                 type: string
 *                 example: "500"
 *               CoffeeTypeId:
 *                 type: integer
 *                 example: 1
 *               CreatedOn:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-05T12:26:37.000Z"
 *               RequiresStandardization:
 *                 type: integer
 *                 example: 0
 *               standardized:
 *                 type: string
 *                 example: "N"
 *     responses:
 *       201:
 *         description: GRN main record created successfully
 */
app.post('/grnMain', grnMain.createGRNMain);

/**
 * @swagger
 * /grnMain/{id}:
 *   put:
 *     summary: Update an existing GRN main record
 *     tags: [GRN Main]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 6
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentSerial:
 *                 type: string
 *                 example: "12345"
 *               DeliveryDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-05T12:26:37.000Z"
 *               VehiclePlate:
 *                 type: string
 *                 example: "ABC-123"
 *               GrossWeight:
 *                 type: string
 *                 example: "1000"
 *               PermitNo:
 *                 type: string
 *                 example: "P-123"
 *               TareWeight:
 *                 type: string
 *                 example: "500"
 *               grnNo:
 *                 type: string
 *                 example: "GRN-123"
 *               WeighBridgeNo:
 *                 type: string
 *                 example: "WB-123"
 *               DriverName:
 *                 type: string
 *                 example: "John Doe"
 *               DriverIDNo:
 *                 type: string
 *                 example: "D-123"
 *               SeasonID:
 *                 type: integer
 *                 example: 12
 *               WarehouseID:
 *                 type: integer
 *                 example: 1
 *               GrowerID:
 *                 type: integer
 *                 example: 1
 *               SupervisorID:
 *                 type: integer
 *                 example: 1
 *               WHManager:
 *                 type: integer
 *                 example: 1
 *               IsVerified:
 *                 type: integer
 *                 example: 0
 *               MillerID:
 *                 type: integer
 *                 example: 1
 *               Remarks:
 *                 type: string
 *                 example: "Test Remarks"
 *               GrowerWeight:
 *                 type: string
 *                 example: "500"
 *               WarrantNo:
 *                 type: string
 *                 example: "W-123"
 *               NetWeight:
 *                 type: string
 *                 example: "500"
 *               CoffeeTypeId:
 *                 type: integer
 *                 example: 1
 *               CreatedOn:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-05T12:26:37.000Z"
 *               RequiresStandardization:
 *                 type: integer
 *                 example: 0
 *               standardized:
 *                 type: string
 *                 example: "N"
 *     responses:
 *       200:
 *         description: GRN main record updated successfully
 */
app.put('/grnMain/:id', grnMain.updateGRNMain);

/**
 * @swagger
 * /grnMain/{id}:
 *   delete:
 *     summary: Delete an existing GRN main record
 *     tags: [GRN Main]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 6
 *     responses:
 *       200:
 *         description: GRN main record deleted successfully
 */

app.delete('/grnMain/:id', grnMain.deleteGRNMain);
app.get('/grnMain/:GrnNo/season/:seasonID', grnMain.getGRNMainsByGrnIdAndSeason);

/**
 * @swagger
 * /grnMain/{GrnNo}/season/{seasonID}:
 *   get:
 *     summary: Get an outturn record by GrnNo and SeasonID
 *     tags: [GRN Main]
 *     parameters:
 *       - in: path
 *         name: GrnNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The String No of the grn  record
 *       - in: path
 *         name: seasonID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the season
 *     responses:
 *       200:
 *         description: List of GRN main records matching the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: object
 *                 properties:
 *                   grnID:
 *                     type: integer
 *                     example: 6
 *                   documentSerial:
 *                     type: string
 *                     example: "12345"
 *                   DeliveryDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-05T12:26:37.000Z"
 *                   VehiclePlate:
 *                     type: string
 *                     example: "ABC-123"
 *                   GrossWeight:
 *                     type: string
 *                     example: "1000"
 *                   PermitNo:
 *                     type: string
 *                     example: "P-123"
 *                   TareWeight:
 *                     type: string
 *                     example: "500"
 *                   grnNo:
 *                     type: string
 *                     example: "GRN-123"
 *                   WeighBridgeNo:
 *                     type: string
 *                     example: "WB-123"
 *                   DriverName:
 *                     type: string
 *                     example: "John Doe"
 *                   DriverIDNo:
 *                     type: string
 *                     example: "D-123"
 *                   SeasonID:
 *                     type: integer
 *                     example: 12
 *                   WarehouseID:
 *                     type: integer
 *                     example: 1
 *                   GrowerID:
 *                     type: integer
 *                     example: 1
 *                   SupervisorID:
 *                     type: integer
 *                     example: 1
 *                   WHManager:
 *                     type: integer
 *                     example: 1
 *                   IsVerified:
 *                     type: integer
 *                     example: 0
 *                   MillerID:
 *                     type: integer
 *                     example: 1
 *                   Remarks:
 *                     type: string
 *                     example: "Test Remarks"
 *                   GrowerWeight:
 *                     type: string
 *                     example: "500"
 *                   WarrantNo:
 *                     type: string
 *                     example: "W-123"
 *                   NetWeight:
 *                     type: string
 *                     example: "500"
 *                   CoffeeTypeId:
 *                     type: integer
 *                     example: 1
 *                   CreatedOn:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-04-05T12:26:37.000Z"
 *                   RequiresStandardization:
 *                     type: integer
 *                     example: 0
 *                   standardized:
 *                     type: string
 *                     example: "N"
 */
// Routes for CRUD operations

/**
 * @swagger
 * /warrants:
 *   get:
 *     summary: Retrieve all warrants
 *     tags: [Warrants]
 *     responses:
 *       200:
 *         description: A list of warrants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get('/warrants', warrants.getAllWarrants);

/**
 * @swagger
 * /warrants/{id}:
 *   get:
 *     summary: Retrieve a warrant by ID
 *     tags: [Warrants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The warrant ID
 *     responses:
 *       200:
 *         description: A warrant object
 *       404:
 *         description: Warrant not found
 */
app.get('/warrants/:id', warrants.getWarrantById);

/**
 * @swagger
 * /warrants:
 *   post:
 *     summary: Create a new warrant
 *     tags: [Warrants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               WarrantNo:
 *                 type: string
 *               grnOutturnID:
 *                 type: integer
 *               WarrantedWeight:
 *                 type: number
 *               Bags:
 *                 type: integer
 *               Pkts:
 *                 type: integer
 *               Status:
 *                 type: integer
 *               SellableStatus:
 *                 type: integer
 *               SaleID:
 *                 type: integer
 *               LotNo:
 *                 type: integer
 *               Flag:
 *                 type: string
 *               Percentage:
 *                 type: number
 *     responses:
 *       201:
 *         description: Warrant created successfully
 *       500:
 *         description: Error creating warrant
 */
app.post('/warrants', warrants.createWarrant);

/**
 * @swagger
 * /warrants/{id}:
 *   put:
 *     summary: Update a warrant by ID
 *     tags: [Warrants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The warrant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               WarrantNo:
 *                 type: string
 *               grnOutturnID:
 *                 type: integer
 *               WarrantedWeight:
 *                 type: number
 *               Bags:
 *                 type: integer
 *               Pkts:
 *                 type: integer
 *               Status:
 *                 type: integer
 *               SellableStatus:
 *                 type: integer
 *               SaleID:
 *                 type: integer
 *               LotNo:
 *                 type: integer
 *               Flag:
 *                 type: string
 *               Percentage:
 *                 type: number
 *     responses:
 *       200:
 *         description: Warrant updated successfully
 *       404:
 *         description: Warrant not found
 */
app.put('/warrants/:id', warrants.updateWarrant);

/**
 * @swagger
 * /warrants/{id}:
 *   delete:
 *     summary: Delete a warrant by ID
 *     tags: [Warrants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The warrant ID
 *     responses:
 *       200:
 *         description: Warrant deleted successfully
 *       404:
 *         description: Warrant not found
 */
app.delete('/warrants/:id', warrants.deleteWarrant);

/**
 * @swagger
 * /warrants/{outturnNo}/season/{seasonID}/grade/{gradeID}:
 *   get:
 *     summary: Retrieve a warrant by OutturnNo, SeasonID, and GradeID
 *     tags: [Warrants]
 *     parameters:
 *       - in: path
 *         name: outturnNo
 *         schema:
 *           type: string
 *         required: true
 *         description: The Outturn Number of the warrant
 *       - in: path
 *         name: seasonID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Season ID
 *       - in: path
 *         name: gradeID
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Grade ID
 *     responses:
 *       200:
 *         description: Warrant details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Year:
 *                   type: string
 *                 OutturnNo:
 *                   type: string
 *                 WarrantNo:
 *                   type: string
 *                 Grade:
 *                   type: string
 *                 GrnWeight:
 *                   type: number
 *                 WarrantedWeight:
 *                   type: number
 *                 WBags:
 *                   type: integer
 *                 WPkts:
 *                   type: integer
 *                 class:
 *                   type: string
 *       400:
 *         description: Missing required parameters
 *       404:
 *         description: Warrant not found
 *       500:
 *         description: Error retrieving warrant
 */
app.get('/warrants/:outturnNo/season/:seasonID/grade/:gradeID', warrants.getWarrantByNoandSeason);


app.get('/warrants/:outturnNo/season/:seasonID/grade/:gradeID', warrants.getWarrantByNoandSeason);

