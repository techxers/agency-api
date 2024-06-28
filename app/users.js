const pool = require('./connection'); // Import the database connection pool

exports.createUser = async (req, res) => {
  try {
    // Extract all fields from the request body
    const userFields = req.body;

    // Get the column names and their corresponding values
    const insertFields = Object.keys(userFields);
    const insertValues = Object.values(userFields);

    // Build the SQL query dynamically
    const sql = `
      INSERT INTO users (${insertFields.join(', ')}) 
      VALUES (${insertFields.map(() => '?').join(', ')})
    `;

    // Execute the query with the values
    const [result] = await pool.query(sql, insertValues);

    // Retrieve the ID of the newly created user
    const newUserId = result.insertId;

    // Fetch the newly created user from the database
    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [newUserId]);

    // Return the created user with a 201 status
    res.status(201).json({
      error: 'Success',
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', err);

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


exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error retrieving users');
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'error',
        message: 'User not found in the database. Please check the ID and try again.'
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, IsActive, EmployeeNumber, ...otherFields } = req.body;

  try {
    const updateData = { name, email, IsActive, EmployeeNumber, ...otherFields };
    const updateKeys = Object.keys(updateData);
    const updateValues = Object.values(updateData);

    await pool.query('UPDATE users SET ? WHERE id = ?', [updateData, userId]);

    const updatedUser = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', err);
    res.status(500).send('Error deleting user');
  }
};
