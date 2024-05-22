const pool = require('./connection');

// Get all sale types
const getAllSaleTypes = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM saletype');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a sale type by ID
const getSaleTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM saletype WHERE SaleTypeID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Sale type not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new sale type
const createSaleType = async (req, res) => {
  const newSaleType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO saletype SET ?', newSaleType);
    await connection.end();
    res.status(201).json({ SaleTypeID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a sale type by ID
const updateSaleType = async (req, res) => {
  const { id } = req.params;
  const updatedSaleType = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE saletype SET ? WHERE SaleTypeID = ?', [updatedSaleType, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Sale type not found');
    } else {
      res.send('Sale type updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a sale type by ID
const deleteSaleType = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM saletype WHERE SaleTypeID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Sale type not found');
    } else {
      res.send('Sale type deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllSaleTypes,
  getSaleTypeById,
  createSaleType,
  updateSaleType,
  deleteSaleType,
};
