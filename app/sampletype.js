const pool = require('./connection');

// Get all sample types
const getAllSampleTypes = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM sampletype');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a sample type by ID
const getSampleTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM sampletype WHERE SampleTypeID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Sample type not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new sample type
const createSampleType = async (req, res) => {
  const newSampleType = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO sampletype SET ?', newSampleType);
    
    res.status(201).json({ SampleTypeID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a sample type by ID
const updateSampleType = async (req, res) => {
  const { id } = req.params;
  const updatedSampleType = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE sampletype SET ? WHERE SampleTypeID = ?', [updatedSampleType, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Sample type not found');
    } else {
      res.send('Sample type updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a sample type by ID
const deleteSampleType = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM sampletype WHERE SampleTypeID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Sample type not found');
    } else {
      res.send('Sample type deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSampleTypes,
  getSampleTypeById,
  createSampleType,
  updateSampleType,
  deleteSampleType,
};
