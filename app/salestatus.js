const pool = require('./connection');


// Get all sale statuses
const getAllSaleStatuses = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM salestatus');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a sale status by ID
const getSaleStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM salestatus WHERE SaleStatusId = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Sale status not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new sale status
const createSaleStatus = async (req, res) => {
  const newSaleStatus = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO salestatus SET ?', newSaleStatus);
    await connection.end();
    res.status(201).json({ SaleStatusId: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a sale status by ID
const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const updatedSaleStatus = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE salestatus SET ? WHERE SaleStatusId = ?', [updatedSaleStatus, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Sale status not found');
    } else {
      res.send('Sale status updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a sale status by ID
const deleteSaleStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM salestatus WHERE SaleStatusId = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Sale status not found');
    } else {
      res.send('Sale status deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllSaleStatuses,
  getSaleStatusById,
  createSaleStatus,
  updateSaleStatus,
  deleteSaleStatus,
};
