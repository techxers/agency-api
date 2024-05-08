const pool = require('./connection'); 
const { validationResult, check } = require('express-validator'); // For validation


// GET all genders
async function getAllGenders(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM gender');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching genders:', error);
    res.status(500).json({ message: 'Error fetching genders' });
  }
}

// GET gender by ID
async function getGenderById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM gender WHERE GenderID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Gender not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching gender:', error);
    res.status(500).json({ message: 'Error fetching gender' });
  }
}

// POST create a new gender
async function createGender(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { GenderName, GenderChar, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO gender (GenderName, GenderChar, Remarks) VALUES (?, ?, ?)',
      [GenderName, GenderChar, Remarks]
    );

    res.status(201).json({ message: 'Gender created', GenderID: result.insertId });
  } catch (error) {
    console.error('Error creating gender:', error);
    res.status(500).json({ message: 'Error creating gender' });
  }
}

// PUT update a gender by ID
async function updateGender(req, res) {
  const { id } = req.params;
  const { GenderName, GenderChar, Remarks } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.query(
      'UPDATE gender SET GenderName = ?, GenderChar = ?, Remarks = ? WHERE GenderID = ?',
      [GenderName, GenderChar, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gender not found' });
    }

    res.status(200).json({ message: 'Gender updated' });
  } catch (error) {
    console.error('Error updating gender:', error);
    res.status(500).json({ message: 'Error updating gender' });
  }
}

// DELETE a gender by ID
async function deleteGender(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM gender WHERE GenderID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gender not found' });
    }

    res.status(200).json({ message: 'Gender deleted' });
  } catch (error) {
    console.error('Error deleting gender:', error);
    res.status(500).json({ message: 'Error deleting gender' });
  }
}

module.exports = {
  getAllGenders,
  getGenderById,
  createGender,
  updateGender,
  deleteGender,
};
