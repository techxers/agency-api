const pool = require('./connection');

// Get all standardizations
const getAllStandardizations = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM standardization');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a standardization by ID
const getStandardizationById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM standardization WHERE StandardizationID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Standardization not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new standardization
const createStandardization = async (req, res) => {
  const newStandardization = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO standardization SET ?', newStandardization);
    await connection.end();
    res.status(201).json({ StandardizationID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a standardization by ID
const updateStandardization = async (req, res) => {
  const { id } = req.params;
  const updatedStandardization = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE standardization SET ? WHERE StandardizationID = ?', [updatedStandardization, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Standardization not found');
    } else {
      res.send('Standardization updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a standardization by ID
const deleteStandardization = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM standardization WHERE StandardizationID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Standardization not found');
    } else {
      res.send('Standardization deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllStandardizations,
  getStandardizationById,
  createStandardization,
  updateStandardization,
  deleteStandardization,
};
