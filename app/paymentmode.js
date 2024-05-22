const pool = require('./connection');

// Get all payment modes
async function getAllPaymentModes(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM paymentmode');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get a payment mode by ID
async function getPaymentModeById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM paymentmode WHERE PayModeId = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Payment mode not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new payment mode
async function createPaymentMode(req, res) {
  const newPaymentMode = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO paymentmode SET ?', newPaymentMode);
    await connection.end();
    res.status(201).json({ PayModeId: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update a payment mode by ID
async function updatePaymentMode(req, res) {
  const { id } = req.params;
  const updatedPaymentMode = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE paymentmode SET ? WHERE PayModeId = ?', [updatedPaymentMode, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Payment mode not found');
    } else {
      res.send('Payment mode updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete a payment mode by ID
async function deletePaymentMode(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM paymentmode WHERE PayModeId = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Payment mode not found');
    } else {
      res.send('Payment mode deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllPaymentModes,
  getPaymentModeById,
  createPaymentMode,
  updatePaymentMode,
  deletePaymentMode
};
