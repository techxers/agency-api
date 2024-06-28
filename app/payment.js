const pool = require('./connection');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM payments');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM payments WHERE PaymentId = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Payment not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const newPayment = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO payments SET ?', newPayment);
    
    res.status(201).json({ PaymentId: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const updatedPayment = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE payments SET ? WHERE PaymentId = ?', [updatedPayment, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Payment not found');
    } else {
      res.send('Payment updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM payments WHERE PaymentId = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Payment not found');
    } else {
      res.send('Payment deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
