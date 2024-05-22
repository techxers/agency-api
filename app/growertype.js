const pool = require('./connection');

// Get all grower types
async function getAllGrowerTypes(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM growertype');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get a grower type by ID
async function getGrowerTypeById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM growertype WHERE GrowerTypeId = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Grower type not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new grower type
async function createGrowerType(req, res) {
  const newGrowerType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO growertype SET ?', newGrowerType);
    await connection.end();
    res.status(201).json({ GrowerTypeId: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update a grower type by ID
async function updateGrowerType(req, res) {
  const { id } = req.params;
  const updatedGrowerType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE growertype SET ? WHERE GrowerTypeId = ?', [updatedGrowerType, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Grower type not found');
    } else {
      res.send('Grower type updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete a grower type by ID
async function deleteGrowerType(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM growertype WHERE GrowerTypeId = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Grower type not found');
    } else {
      res.send('Grower type deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllGrowerTypes,
  getGrowerTypeById,
  createGrowerType,
  updateGrowerType,
  deleteGrowerType
};
