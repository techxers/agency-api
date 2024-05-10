const pool = require('./connection');
const { validationResult } = require('express-validator');

// GET all grades
async function getAllGrades(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM grades');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching grades:', error);
    res.status(500).json({ message: 'Error fetching grades' });
  }
}

// GET grade by ID
async function getGradeById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM grades WHERE GradeID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching grade:', error);
    res.status(500).json({ message: 'Error fetching grade' });
  }
}

// POST create a new grade
async function createGrade(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Grade, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO grades (Grade, Remarks) VALUES (?, ?)',
      [Grade, Remarks]
    );

    res.status(201).json({ message: 'Grade created', GradeID: result.insertId });
  } catch (error) {
    console.error('Error creating grade:', error);
    res.status(500).json({ message: 'Error creating grade' });
  }
}

// PUT update a grade by ID
async function updateGrade(req, res) {
  const { id } = req.params;
  const { Grade, Remarks } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.query(
      'UPDATE grades SET Grade = ?, Remarks = ? WHERE GradeID = ?',
      [Grade, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.status(200).json({ message: 'Grade updated' });
  } catch (error) {
    console.error('Error updating grade:', error);
    res.status(500).json({ message: 'Error updating grade' });
  }
}

// DELETE a grade by ID
async function deleteGrade(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM grades WHERE GradeID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.status(200).json({ message: 'Grade deleted' });
  } catch (error) {
    console.error('Error deleting grade:', error);
    res.status(500).json({ message: 'Error deleting grade' });
  }
}

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};
