const pool = require('./connection'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // Importing express-validator
const { getCurrentMySQLTimestamp } = require('./utill/getCurrentTimestamp'); // Importing the getCurrentMySQLTimestamp function

require('dotenv').config();

const jwtSecret = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {
      surname ,
      username,
      password,
      email,
      IsActive = true, // Default value
      employeeNo,
      workExtension,
      genderId,
      departmentId,
      fullName,
      roleId,
      createdDate
    } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(`password: ${hashedPassword}`);
  
      const [result] = await pool.query(
        'INSERT INTO users (name,Username , Password, email, IsActive, EmployeeNumber, WorkExtension, GenderID, DepartmentId, FullName, role_id,CreatedOn,created_at,email_verified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? ,?, ?)',
        [surname ,username, hashedPassword, email, IsActive, employeeNo, workExtension, genderId, departmentId, fullName, roleId,createdDate??getCurrentMySQLTimestamp(),getCurrentMySQLTimestamp(),getCurrentMySQLTimestamp()]
      );
  
      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err) {
 // Check for specific database error codes and return appropriate status
 if (err.code === 'ER_DUP_ENTRY') {
    res.status(409).json({
      error: 'Conflict',
      message: err.sqlMessage
    });
  } else if (err.sqlState) {
    // If there's a known database error, return 400 with detailed information
    res.status(400).json({
      error: 'Database Error',
      sqlState: err.sqlState,
      sqlMessage: err.sqlMessage,
      message: 'A database error occurred. Please check your request and try again.'
    });
  } else {
    // For unexpected errors, return a generic 500 response
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
}
};
// User Login
exports.login = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    // Find the user by username
    const [users] = await pool.query('SELECT * FROM users WHERE Username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = users[0];

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.Password);
    console.log(`passwordMatch: ${passwordMatch}`);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, username: user.Username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });  

    res.status(200).json({ token, user: user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login' });
  }
};
