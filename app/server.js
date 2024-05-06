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


const app = express();
const port = process.env.PORT || 3000;



app.use(bodyParser.json());

// Serve Swagger UI at the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with all necessary fields.
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
 *   get:
 *     summary: Get all growers
 *     responses:
 *       200:
 *         description: List of all growers
 */
app.post('/growers', growers.createGrower);
app.get('/growers', growers.getAllGrowers);
app.get('/growers/:id', growers.getGrowerById);
app.put('/growers/:id', growers.updateGrower);
app.delete('/growers/:id', growers.deleteGrower);



/**
 * @swagger
 * /growers/{id}:
 *   get:
 *     summary: Get a grower by ID
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
