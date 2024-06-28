const pool = require('./connection');

// Get all quality parameters
const getAllQualityParameters = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualityparameters');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a quality parameter by ID
const getQualityParameterById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualityparameters WHERE QualityParamsID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Quality parameter not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new quality parameter
const createQualityParameter = async (req, res) => {
  const newQualityParameter = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO qualityparameters SET ?', newQualityParameter);
    
    res.status(201).json({ QualityParamsID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a quality parameter by ID
const updateQualityParameter = async (req, res) => {
  const { id } = req.params;
  const updatedQualityParameter = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE qualityparameters SET ? WHERE QualityParamsID = ?', [updatedQualityParameter, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality parameter not found');
    } else {
      res.send('Quality parameter updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a quality parameter by ID
const deleteQualityParameter = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM qualityparameters WHERE QualityParamsID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality parameter not found');
    } else {
      res.send('Quality parameter deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQualityParameters,
  getQualityParameterById,
  createQualityParameter,
  updateQualityParameter,
  deleteQualityParameter,
};
