const pool = require('./connection');
const { validationResult } = require('express-validator');

// Get all outturn records
async function getAllOutturns(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM outturns LIMIT 100');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve outturn records' });
  }
}

// Get an outturn record by ID
async function getOutturnById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM outturns WHERE OutturnID = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Outturn record not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the outturn record' });
  }
}

// Create a new outturn record
async function createOutturn(req, res) {
  const {
    OutturnMark,
    OutturnNo,
    MaterialID,
    GrowerID,
    MillerID,
    CoffeeTypeID,
    BagID,
    BagWeight,
    Nweight,
    Status,
    TotalMillerCharges,
    TotalChargesRecovered,
    TotalWeightSold,
    GrowerPayee,
    SeasonID,
    MilledDate,
    WeightMargin,
    Pkts,
    MillerClassID,
    Remarks,
    Bags,
    Sign,
    DeliveryDate,
    BulkOutturnNo,
    GrossPWeight,
    Sampled,
    BulkPercentage,
    GrnReceivediD
  } = req.body;

  const newOutturn = {
    OutturnMark,
    OutturnNo,
    MaterialID,
    GrowerID,
    MillerID,
    CoffeeTypeID,
    BagID,
    BagWeight,
    Nweight,
    Status,
    TotalMillerCharges,
    TotalChargesRecovered,
    TotalWeightSold,
    GrowerPayee,
    SeasonID,
    MilledDate,
    WeightMargin,
    Pkts,
    MillerClassID,
    Remarks,
    Bags,
    Sign,
    DeliveryDate,
    BulkOutturnNo,
    GrossPWeight,
    Sampled,
    BulkPercentage,
    GrnReceivediD
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [rows] = await pool.query('INSERT INTO outturns SET ?', newOutturn);
    res.status(201).json({ OutturnID: rows.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create outturn record' + error.message });
  }
}

// Update an outturn record by ID
async function updateOutturn(req, res) {
  const { id } = req.params;
  const updatedOutturn = req.body;

  try {
    const [rows] = await pool.query('UPDATE outturns SET ? WHERE OutturnID = ?', [updatedOutturn, id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: 'Outturn record not found' });
    } else {
      res.status(200).json({ message: 'Outturn record updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update outturn record' });
  }
}

// Delete an outturn record by ID
async function deleteOutturn(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('DELETE FROM outturns WHERE OutturnID = ?', [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: 'Outturn record not found' });
    } else {
      res.status(200).json({ message: 'Outturn record deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete outturn record' });
  }
}

module.exports = {
  getAllOutturns,
  getOutturnById,
  createOutturn,
  updateOutturn,
  deleteOutturn
};