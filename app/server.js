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

const app = express();
// Use CORS middleware
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



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

/**
 * @swagger
 * /auctionsale:
 *   get:
 *     summary: Get all auctions
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: List of all auctions
 */
app.get('/auctionsale', auctionsale.getAllAuctions);

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
app.post('/auctionsale', auctionsale.createAuction);

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
app.get('/auctionsale/:id', auctionsale.getAuctionById);

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
app.put('/auctionsale/:id', auctionsale.updateAuction);

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
app.delete('/auctionsale/:id', auctionsale.deleteAuction);
/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Fetch all departments
 *     tags:
 *       - Auction Sale
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
app.get('/departments', departments.getAllDepartments);

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
app.get('/departments/:id', departments.getDepartmentById);

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
app.get('/countries', location.getAllCountries); // Get all countrys

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
app.get('/country/:id', location.getCountyById); // Get country by ID

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
app.post('/country', [
  check('countryName').isLength({ min: 1 }).withMessage('countryName is required'),
  check('countryCode').isLength({ min: 1 }).withMessage('countryCode is required'),
], location.createCountry); // Create a new country

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
app.put('/country/:id', location.updateCountry); // Update a country by ID

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
app.delete('/country/:id', location.deleteCountry); // Delete a country by ID




/**
 * @swagger
 * /counties:
 *   get:
 *     summary: Get all counties
 *     description: Retrieve all counties from the database.
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
app.get('/counties', location.getAllCounties); // Get all counties

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
app.get('/counties/:id', location.getCountyById); // Get county by ID

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
app.post('/counties', [
  check('CountyName').isLength({ min: 1 }).withMessage('CountyName is required'),
  check('CountryID').isInt().withMessage('CountryID must be an integer'),
  check('RegionID').isInt().withMessage('RegionID must be an integer'),
], location.createCounty); // Create a new county

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
app.put('/counties/:id', location.updateCounty); // Update a county by ID

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
app.delete('/counties/:id', location.deleteCounty); // Delete a county by ID

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
app.get('/grades', grades.getAllGrades); // Get all grades
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
app.get('/grades/:id', grades.getGradeById); // Get grade by ID

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
app.post('/grades', grades.createGrade); // Get grade by ID

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

app.delete('/grades/:id', grades.deleteGrade); // Get grade by ID
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
app.get('/coffeeseasons', coffeeSeason.getAllCoffeeSeasons); // Get all coffee seasons
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

app.get('/coffeeseasons/:id', coffeeSeason.getCoffeeSeasonById); // Get coffee season by ID
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

app.post('/coffeeseasons', coffeeSeason.createCoffeeSeason); // Create a new coffee season
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

app.put('/coffeeseasons/:id', coffeeSeason.updateCoffeeSeason); // Update coffee season by ID
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

app.delete('/coffeeseasons/:id', coffeeSeason.deleteCoffeeSeason); // Delete coffee season by ID
/**
 * @swagger
 * components:
 *   schemas:
 *     Agent:
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
app.get('/agentsinfomation', agentsinfomation.getAllAgents);

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
app.get('/agentsinfomation/:id', agentsinfomation.getAgentById);

/**
 * @swagger
 * /agentsinfomation:
 *   post:
 *     summary: Create a new agent
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
app.post('/agentsinfomation', agentsinfomation.createAgent);

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
app.put('/agentsinfomation/:id', agentsinfomation.updateAgent);

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
 *           schema:
 *             $ref: '#/components/schemas/Bag'
 *     responses:
 *       201:
 *         description: The bag was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bag'
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
 *           schema:
 *             $ref: '#/components/schemas/Bag'
 *     responses:
 *       200:
 *         description: The bag was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bag'
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