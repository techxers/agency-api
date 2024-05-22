const pool = require('./connection');

// Get all quality groups
const getAllQualityGroups = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualitygroups');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a quality group by ID
const getQualityGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM qualitygroups WHERE QualityGroupID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Quality group not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new quality group
const createQualityGroup = async (req, res) => {
  const newQualityGroup = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO qualitygroups SET ?', newQualityGroup);
    await connection.end();
    res.status(201).json({ QualityGroupID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a quality group by ID
const updateQualityGroup = async (req, res) => {
  const { id } = req.params;
  const updatedQualityGroup = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE qualitygroups SET ? WHERE QualityGroupID = ?', [updatedQualityGroup, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality group not found');
    } else {
      res.send('Quality group updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a quality group by ID
const deleteQualityGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM qualitygroups WHERE QualityGroupID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Quality group not found');
    } else {
      res.send('Quality group deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllQualityGroups,
  getQualityGroupById,
  createQualityGroup,
  updateQualityGroup,
  deleteQualityGroup,
};
