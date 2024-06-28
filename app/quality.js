const pool = require('./connection');

// Get all qualities
const getAllQualities = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM quality');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a quality by ID
const getQualityById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM quality WHERE QualityID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Quality not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new quality
const createQuality = async (req, res) => {
  const newQuality = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO quality SET ?', newQuality);
    
    res.status(201).json({ QualityID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a quality by ID
const updateQuality = async (req, res) => {
  const { id } = req.params;
  const updatedQuality = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE quality SET ? WHERE QualityID = ?', [updatedQuality, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality not found');
    } else {
      res.send('Quality updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a quality by ID
const deleteQuality = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM quality WHERE QualityID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality not found');
    } else {
      res.send('Quality deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQualities,
  getQualityById,
  createQuality,
  updateQuality,
  deleteQuality,
};
