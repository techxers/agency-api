const pool = require('./connection');

// Get all quality sizes
const getAllQualitySizes = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM quality_size');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a quality size by ID
const getQualitySizeById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM quality_size WHERE QualitySizeID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Quality size not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new quality size
const createQualitySize = async (req, res) => {
  const newQualitySize = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO quality_size SET ?', newQualitySize);
    await connection.end();
    res.status(201).json({ QualitySizeID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a quality size by ID
const updateQualitySize = async (req, res) => {
  const { id } = req.params;
  const updatedQualitySize = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE quality_size SET ? WHERE QualitySizeID = ?', [updatedQualitySize, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality size not found');
    } else {
      res.send('Quality size updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a quality size by ID
const deleteQualitySize = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM quality_size WHERE QualitySizeID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality size not found');
    } else {
      res.send('Quality size deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllQualitySizes,
  getQualitySizeById,
  createQualitySize,
  updateQualitySize,
  deleteQualitySize,
};
