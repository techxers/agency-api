// outturns.js

const pool = require('./connection');

// Get all outturn records
async function getAllOutturns(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM outturns');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get an outturn record by ID
async function getOutturnById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM outturns WHERE OutturnID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Outturn record not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Create a new outturn record
async function createOutturn(req, res) {
  const newOutturn = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO outturns SET ?', newOutturn);
    
    res.status(201).json({ OutturnID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update an outturn record by ID
async function updateOutturn(req, res) {
  const { id } = req.params;
  const updatedOutturn = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE outturns SET ? WHERE OutturnID = ?', [updatedOutturn, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn record not found');
    } else {
      res.send('Outturn record updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete an outturn record by ID
async function deleteOutturn(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM outturns WHERE OutturnID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn record not found');
    } else {
      res.send('Outturn record deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllOutturns,
  getOutturnById,
  createOutturn,
  updateOutturn,
  deleteOutturn
};
