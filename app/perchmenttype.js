const pool = require('./connection');

// Get all parchment types
const getAllParchmentTypes = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM perchmenttype');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a parchment type by ID
const getParchmentTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM perchmenttype WHERE pTypeID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Parchment type not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new parchment type
const createParchmentType = async (req, res) => {
  const newParchmentType = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO perchmenttype SET ?', newParchmentType);
    
    res.status(201).json({ pTypeID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a parchment type by ID
const updateParchmentType = async (req, res) => {
  const { id } = req.params;
  const updatedParchmentType = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE perchmenttype SET ? WHERE pTypeID = ?', [updatedParchmentType, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Parchment type not found');
    } else {
      res.send('Parchment type updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a parchment type by ID
const deleteParchmentType = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM perchmenttype WHERE pTypeID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Parchment type not found');
    } else {
      res.send('Parchment type deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllParchmentTypes,
  getParchmentTypeById,
  createParchmentType,
  updateParchmentType,
  deleteParchmentType,
};
