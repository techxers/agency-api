const pool = require('./connection');

// Get all quality classes
const getAllQualityClasses = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualityclass');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a quality class by ID
const getQualityClassById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualityclass WHERE classID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Quality class not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new quality class
const createQualityClass = async (req, res) => {
  const newQualityClass = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO qualityclass SET ?', newQualityClass);
    
    res.status(201).json({ classID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a quality class by ID
const updateQualityClass = async (req, res) => {
  const { id } = req.params;
  const updatedQualityClass = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE qualityclass SET ? WHERE classID = ?', [updatedQualityClass, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality class not found');
    } else {
      res.send('Quality class updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a quality class by ID
const deleteQualityClass = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM qualityclass WHERE classID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality class not found');
    } else {
      res.send('Quality class deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQualityClasses,
  getQualityClassById,
  createQualityClass,
  updateQualityClass,
  deleteQualityClass,
};
