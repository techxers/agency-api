const pool = require('./connection');

// Get all miller charges
async function getAllMillerCharges(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM millercharges');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get a miller charge by ID
async function getMillerChargeById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM millercharges WHERE MillerChargeID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Miller charge not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new miller charge
async function createMillerCharge(req, res) {
  const newMillerCharge = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO millercharges SET ?', newMillerCharge);
    await connection.end();
    res.status(201).json({ MillerChargeID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update a miller charge by ID
async function updateMillerCharge(req, res) {
  const { id } = req.params;
  const updatedMillerCharge = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE millercharges SET ? WHERE MillerChargeID = ?', [updatedMillerCharge, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Miller charge not found');
    } else {
      res.send('Miller charge updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete a miller charge by ID
async function deleteMillerCharge(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM millercharges WHERE MillerChargeID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Miller charge not found');
    } else {
      res.send('Miller charge deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllMillerCharges,
  getMillerChargeById,
  createMillerCharge,
  updateMillerCharge,
  deleteMillerCharge
};
