const pool = require('./connection');

// Get all quality classes
const getAllQualityClasses = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualityclass');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a quality class by ID
const getQualityClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualityclass WHERE classID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Quality class not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new quality class
const createQualityClass = async (req, res) => {
  const newQualityClass = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO qualityclass SET ?', newQualityClass);
    await connection.end();
    res.status(201).json({ classID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a quality class by ID
const updateQualityClass = async (req, res) => {
  const { id } = req.params;
  const updatedQualityClass = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE qualityclass SET ? WHERE classID = ?', [updatedQualityClass, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality class not found');
    } else {
      res.send('Quality class updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a quality class by ID
const deleteQualityClass = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM qualityclass WHERE classID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality class not found');
    } else {
      res.send('Quality class deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllQualityClasses,
  getQualityClassById,
  createQualityClass,
  updateQualityClass,
  deleteQualityClass,
};
