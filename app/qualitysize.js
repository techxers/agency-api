const pool = require('./connection');

// Get all quality sizes
const getAllQualitySizes = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM quality_size');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a quality size by ID
const getQualitySizeById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM quality_size WHERE QualitySizeID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Quality size not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new quality size
const createQualitySize = async (req, res) => {
  const newQualitySize = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO quality_size SET ?', newQualitySize);
    
    res.status(201).json({ QualitySizeID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a quality size by ID
const updateQualitySize = async (req, res) => {
  const { id } = req.params;
  const updatedQualitySize = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE quality_size SET ? WHERE QualitySizeID = ?', [updatedQualitySize, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality size not found');
    } else {
      res.send('Quality size updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a quality size by ID
const deleteQualitySize = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM quality_size WHERE QualitySizeID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality size not found');
    } else {
      res.send('Quality size deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQualitySizes,
  getQualitySizeById,
  createQualitySize,
  updateQualitySize,
  deleteQualitySize,
};
