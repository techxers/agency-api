const pool = require('./connection');

// Get all outturn quality records
async function getAllOutturnQuality(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM outturnquality');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get an outturn quality record by ID
async function getOutturnQualityById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM outturnquality WHERE OutturnQualityID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Create a new outturn quality record
async function createOutturnQuality(req, res) {
  const newOutturnQuality = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO outturnquality SET ?', newOutturnQuality);
    
    res.status(201).json({ OutturnQualityID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update an outturn quality record by ID
async function updateOutturnQuality(req, res) {
  const { id } = req.params;
  const updatedOutturnQuality = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE outturnquality SET ? WHERE OutturnQualityID = ?', [updatedOutturnQuality, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.send('Outturn quality record updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete an outturn quality record by ID
async function deleteOutturnQuality(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM outturnquality WHERE OutturnQualityID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.send('Outturn quality record deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllOutturnQuality,
  getOutturnQualityById,
  createOutturnQuality,
  updateOutturnQuality,
  deleteOutturnQuality
};
