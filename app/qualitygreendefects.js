const pool = require('./connection');

// Get all quality green defects
const getAllQualityGreenDefects = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualitygreendefects');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a quality green defect by ID
const getQualityGreenDefectById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualitygreendefects WHERE GreenDefectsID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Quality green defect not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new quality green defect
const createQualityGreenDefect = async (req, res) => {
  const newQualityGreenDefect = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO qualitygreendefects SET ?', newQualityGreenDefect);
    await connection.end();
    res.status(201).json({ GreenDefectsID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a quality green defect by ID
const updateQualityGreenDefect = async (req, res) => {
  const { id } = req.params;
  const updatedQualityGreenDefect = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE qualitygreendefects SET ? WHERE GreenDefectsID = ?', [updatedQualityGreenDefect, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality green defect not found');
    } else {
      res.send('Quality green defect updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a quality green defect by ID
const deleteQualityGreenDefect = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM qualitygreendefects WHERE GreenDefectsID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality green defect not found');
    } else {
      res.send('Quality green defect deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllQualityGreenDefects,
  getQualityGreenDefectById,
  createQualityGreenDefect,
  updateQualityGreenDefect,
  deleteQualityGreenDefect,
};
