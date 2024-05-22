// outturns.js

const pool = require('./connection');

// Get all outturn records
async function getAllOutturns(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM outturns');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get an outturn record by ID
async function getOutturnById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM outturns WHERE OutturnID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Outturn record not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new outturn record
async function createOutturn(req, res) {
  const newOutturn = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO outturns SET ?', newOutturn);
    await connection.end();
    res.status(201).json({ OutturnID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update an outturn record by ID
async function updateOutturn(req, res) {
  const { id } = req.params;
  const updatedOutturn = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE outturns SET ? WHERE OutturnID = ?', [updatedOutturn, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Outturn record not found');
    } else {
      res.send('Outturn record updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete an outturn record by ID
async function deleteOutturn(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM outturns WHERE OutturnID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Outturn record not found');
    } else {
      res.send('Outturn record deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllOutturns,
  getOutturnById,
  createOutturn,
  updateOutturn,
  deleteOutturn
};
