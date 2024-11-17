const pool = require('./connection');

// Get all quality groups
const getAllQualityGroups = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM qualitygroups');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a quality group by ID
const getQualityGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('-----------getQualityGroupById-------------------------');

    const [rows] = await pool.query('SELECT * FROM qualitygroups WHERE QualityGroupID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Quality group not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new quality group
const createQualityGroup = async (req, res) => {
  const newQualityGroup = req.body;
  try {
    console.log('-----------createQualityGroup-------------------------');

    const [rows] = await pool.query('INSERT INTO qualitygroups SET ?', newQualityGroup);
    
    res.status(201).json({ QualityGroupID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a quality group by ID
const updateQualityGroup = async (req, res) => {
  const { id } = req.params;
  const updatedQualityGroup = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE qualitygroups SET ? WHERE QualityGroupID = ?', [updatedQualityGroup, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality group not found');
    } else {
      res.send('Quality group updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a quality group by ID
const deleteQualityGroup = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM qualitygroups WHERE QualityGroupID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Quality group not found');
    } else {
      res.send('Quality group deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllQualityGroups,
  getQualityGroupById,
  createQualityGroup,
  updateQualityGroup,
  deleteQualityGroup,
};
