const pool = require('./connection');

// Get all parchment types
const getAllParchmentTypes = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM perchmenttype');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a parchment type by ID
const getParchmentTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM perchmenttype WHERE pTypeID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Parchment type not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new parchment type
const createParchmentType = async (req, res) => {
  const newParchmentType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO perchmenttype SET ?', newParchmentType);
    await connection.end();
    res.status(201).json({ pTypeID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a parchment type by ID
const updateParchmentType = async (req, res) => {
  const { id } = req.params;
  const updatedParchmentType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE perchmenttype SET ? WHERE pTypeID = ?', [updatedParchmentType, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Parchment type not found');
    } else {
      res.send('Parchment type updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a parchment type by ID
const deleteParchmentType = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM perchmenttype WHERE pTypeID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Parchment type not found');
    } else {
      res.send('Parchment type deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllParchmentTypes,
  getParchmentTypeById,
  createParchmentType,
  updateParchmentType,
  deleteParchmentType,
};
