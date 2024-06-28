const pool = require('./connection'); // MySQL database connection
const { check, validationResult } = require('express-validator'); // Importing express-validator

// GET all departments
async function getAllDepartments(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM departments');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching departments:', err);
    res.status(500).json({ message: 'Error fetching departments' });
  }
}

// GET department by ID
async function getDepartmentById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM departments WHERE DepartmentId = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching department:', err);
    res.status(500).json({ message: 'Error fetching department' });
  }
}

// POST create a new department
async function createDepartment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { DepartmentName } = req.body;

  try {
    const [existing] = await pool.query('SELECT * FROM departments WHERE DepartmentName = ?', [DepartmentName]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Department already exists' });
    }

    const [result] = await pool.query('INSERT INTO departments (DepartmentName) VALUES (?)', [DepartmentName]);

    res.status(201).json({ message: 'Department created', DepartmentId: result.insertId });
  } catch (error) {
    console.error('Error creating department:', err);
    res.status(500).json({ message: 'Error creating department' });
  }
}

// PUT update a department by ID
async function updateDepartment(req, res) {
  const { id } = req.params;
  const { DepartmentName } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM departments WHERE DepartmentName = ?', [DepartmentName]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Department already exists' });
    }

    const [result] = await pool.query(
      'UPDATE departments SET DepartmentName = ? WHERE DepartmentId = ?',
      [DepartmentName, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department updated' });
  } catch (error) {
    console.error('Error updating department:', err);
    res.status(500).json({ message: 'Error updating department' });
  }
}

// DELETE a department by ID
async function deleteDepartment(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM departments WHERE DepartmentId = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted' });
  } catch (error) {
    console.error('Error deleting department:', err);
    res.status(500).json({ message: 'Error deleting department' });
  }
}

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};