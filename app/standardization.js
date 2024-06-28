const pool = require('./connection');

// Get all standardizations
const getAllStandardizations = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM standardization');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a standardization by ID
const getStandardizationById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM standardization WHERE StandardizationID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Standardization not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new standardization
const createStandardization = async (req, res) => {
  const newStandardization = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO standardization SET ?', newStandardization);
    
    res.status(201).json({ StandardizationID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a standardization by ID
const updateStandardization = async (req, res) => {
  const { id } = req.params;
  const updatedStandardization = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE standardization SET ? WHERE StandardizationID = ?', [updatedStandardization, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Standardization not found');
    } else {
      res.send('Standardization updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a standardization by ID
const deleteStandardization = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM standardization WHERE StandardizationID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Standardization not found');
    } else {
      res.send('Standardization deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllStandardizations,
  getStandardizationById,
  createStandardization,
  updateStandardization,
  deleteStandardization,
};
