const pool = require('./connection');

// Get all sample types
const getAllSampleTypes = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM sampletype');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a sample type by ID
const getSampleTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM sampletype WHERE SampleTypeID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Sample type not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new sample type
const createSampleType = async (req, res) => {
  const newSampleType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO sampletype SET ?', newSampleType);
    await connection.end();
    res.status(201).json({ SampleTypeID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a sample type by ID
const updateSampleType = async (req, res) => {
  const { id } = req.params;
  const updatedSampleType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE sampletype SET ? WHERE SampleTypeID = ?', [updatedSampleType, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Sample type not found');
    } else {
      res.send('Sample type updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a sample type by ID
const deleteSampleType = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM sampletype WHERE SampleTypeID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Sample type not found');
    } else {
      res.send('Sample type deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllSampleTypes,
  getSampleTypeById,
  createSampleType,
  updateSampleType,
  deleteSampleType,
};
