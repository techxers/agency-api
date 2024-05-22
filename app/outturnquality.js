const pool = require('./connection');

// Get all outturn quality records
async function getAllOutturnQuality(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM outturnquality');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get an outturn quality record by ID
async function getOutturnQualityById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM outturnquality WHERE OutturnQualityID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new outturn quality record
async function createOutturnQuality(req, res) {
  const newOutturnQuality = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO outturnquality SET ?', newOutturnQuality);
    await connection.end();
    res.status(201).json({ OutturnQualityID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update an outturn quality record by ID
async function updateOutturnQuality(req, res) {
  const { id } = req.params;
  const updatedOutturnQuality = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE outturnquality SET ? WHERE OutturnQualityID = ?', [updatedOutturnQuality, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.send('Outturn quality record updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete an outturn quality record by ID
async function deleteOutturnQuality(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM outturnquality WHERE OutturnQualityID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.send('Outturn quality record deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllOutturnQuality,
  getOutturnQualityById,
  createOutturnQuality,
  updateOutturnQuality,
  deleteOutturnQuality
};
