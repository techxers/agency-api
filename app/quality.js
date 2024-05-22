const pool = require('./connection');

// Get all qualities
const getAllQualities = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM quality');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a quality by ID
const getQualityById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM quality WHERE QualityID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Quality not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new quality
const createQuality = async (req, res) => {
  const newQuality = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO quality SET ?', newQuality);
    await connection.end();
    res.status(201).json({ QualityID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a quality by ID
const updateQuality = async (req, res) => {
  const { id } = req.params;
  const updatedQuality = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE quality SET ? WHERE QualityID = ?', [updatedQuality, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality not found');
    } else {
      res.send('Quality updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a quality by ID
const deleteQuality = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM quality WHERE QualityID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality not found');
    } else {
      res.send('Quality deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllQualities,
  getQualityById,
  createQuality,
  updateQuality,
  deleteQuality,
};
