const pool = require('./connection');

// Get all miller charges
async function getAllMillerCharges(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM millercharges');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get a miller charge by ID
async function getMillerChargeById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM millercharges WHERE MillerChargeID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Miller charge not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Create a new miller charge
async function createMillerCharge(req, res) {
  const newMillerCharge = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO millercharges SET ?', newMillerCharge);
    
    res.status(201).json({ MillerChargeID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update a miller charge by ID
async function updateMillerCharge(req, res) {
  const { id } = req.params;
  const updatedMillerCharge = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE millercharges SET ? WHERE MillerChargeID = ?', [updatedMillerCharge, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Miller charge not found');
    } else {
      res.send('Miller charge updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete a miller charge by ID
async function deleteMillerCharge(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM millercharges WHERE MillerChargeID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Miller charge not found');
    } else {
      res.send('Miller charge deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllMillerCharges,
  getMillerChargeById,
  createMillerCharge,
  updateMillerCharge,
  deleteMillerCharge
};
