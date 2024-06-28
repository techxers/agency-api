const pool = require('./connection');

// Get all payment modes
async function getAllPaymentModes(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM paymentmode');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get a payment mode by ID
async function getPaymentModeById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM paymentmode WHERE PayModeId = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Payment mode not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Create a new payment mode
async function createPaymentMode(req, res) {
  const newPaymentMode = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO paymentmode SET ?', newPaymentMode);
    
    res.status(201).json({ PayModeId: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update a payment mode by ID
async function updatePaymentMode(req, res) {
  const { id } = req.params;
  const updatedPaymentMode = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE paymentmode SET ? WHERE PayModeId = ?', [updatedPaymentMode, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Payment mode not found');
    } else {
      res.send('Payment mode updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete a payment mode by ID
async function deletePaymentMode(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM paymentmode WHERE PayModeId = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Payment mode not found');
    } else {
      res.send('Payment mode deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllPaymentModes,
  getPaymentModeById,
  createPaymentMode,
  updatePaymentMode,
  deletePaymentMode
};
