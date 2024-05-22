const pool = require('./connection');
// Get all materials
async function getAllMaterials(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM material');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get a material by ID
async function getMaterialById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM material WHERE MaterialID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Material not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new material
async function createMaterial(req, res) {
  const newMaterial = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO material SET ?', newMaterial);
    await connection.end();
    res.status(201).json({ MaterialID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update a material by ID
async function updateMaterial(req, res) {
  const { id } = req.params;
  const updatedMaterial = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE material SET ? WHERE MaterialID = ?', [updatedMaterial, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Material not found');
    } else {
      res.send('Material updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete a material by ID
async function deleteMaterial(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM material WHERE MaterialID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Material not found');
    } else {
      res.send('Material deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
};
