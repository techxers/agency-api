const pool = require('./connection');

// Get all quality green defects
const getAllQualityGreenDefects = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualitygreendefects');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a quality green defect by ID
const getQualityGreenDefectById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualitygreendefects WHERE GreenDefectsID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Quality green defect not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new quality green defect
const createQualityGreenDefect = async (req, res) => {
  const newQualityGreenDefect = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO qualitygreendefects SET ?', newQualityGreenDefect);
    
    res.status(201).json({ GreenDefectsID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a quality green defect by ID
const updateQualityGreenDefect = async (req, res) => {
  const { id } = req.params;
  const updatedQualityGreenDefect = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE qualitygreendefects SET ? WHERE GreenDefectsID = ?', [updatedQualityGreenDefect, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality green defect not found');
    } else {
      res.send('Quality green defect updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a quality green defect by ID
const deleteQualityGreenDefect = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM qualitygreendefects WHERE GreenDefectsID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality green defect not found');
    } else {
      res.send('Quality green defect deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQualityGreenDefects,
  getQualityGreenDefectById,
  createQualityGreenDefect,
  updateQualityGreenDefect,
  deleteQualityGreenDefect,
};
