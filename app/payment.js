const pool = require('./connection');

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM payments');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM payments WHERE PaymentId = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Payment not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new payment
const createPayment = async (req, res) => {
  const newPayment = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO payments SET ?', newPayment);
    await connection.end();
    res.status(201).json({ PaymentId: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const updatedPayment = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE payments SET ? WHERE PaymentId = ?', [updatedPayment, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Payment not found');
    } else {
      res.send('Payment updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM payments WHERE PaymentId = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Payment not found');
    } else {
      res.send('Payment deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
