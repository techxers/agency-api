// roles.js
const pool = require('./connection'); // MySQL database connection

// Get all roles
async function getAllRoles(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM roles');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching roles:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

// Get a role by ID
async function getRoleById(req, res) {
  const roleId = req.params.id;

  try {
    const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [roleId]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Role Not Found',
        message: 'No role found with the provided ID.',
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching role:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

// Create a new role
async function createRole(req, res) {
  const { role, description } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO roles (role, description) VALUES (?, ?)',
      [role, description]
    );

    res.status(201).json({
      message: 'Role created successfully',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Error creating role:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

// Update a role by ID
async function updateRole(req, res) {
  const roleId = req.params.id;
  const { role, description } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE roles SET role = ?, description = ? WHERE id = ?',
      [role, description, roleId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Role Not Found',
        message: 'No role found with the provided ID.',
      });
    }

    res.status(200).json({
      message: 'Role updated successfully',
    });
  } catch (error) {
    console.error('Error updating role:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

// Delete a role by ID
async function deleteRole(req, res) {
  const roleId = req.params.id;

  try {
    const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [roleId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Role Not Found',
        message: 'No role found with the provided ID.',
      });
    }

    res.status(204).json({
      message: 'Role deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting role:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred. Please try again later.',
    });
  }
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
