const pool = require('./connection');

// Get all quality parameters
const getAllQualityParameters = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualityparameters');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a quality parameter by ID
const getQualityParameterById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualityparameters WHERE QualityParamsID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Quality parameter not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new quality parameter
const createQualityParameter = async (req, res) => {
  const newQualityParameter = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO qualityparameters SET ?', newQualityParameter);
    await connection.end();
    res.status(201).json({ QualityParamsID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a quality parameter by ID
const updateQualityParameter = async (req, res) => {
  const { id } = req.params;
  const updatedQualityParameter = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE qualityparameters SET ? WHERE QualityParamsID = ?', [updatedQualityParameter, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality parameter not found');
    } else {
      res.send('Quality parameter updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a quality parameter by ID
const deleteQualityParameter = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM qualityparameters WHERE QualityParamsID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality parameter not found');
    } else {
      res.send('Quality parameter deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllQualityParameters,
  getQualityParameterById,
  createQualityParameter,
  updateQualityParameter,
  deleteQualityParameter,
};
