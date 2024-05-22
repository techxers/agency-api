const pool = require('./connection');

// Get all stocks
const getAllStocks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stocks');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a stock by ID
const getStockById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM stocks WHERE StocksID = ?', [id]);
    if (rows.length === 0) {
      res.status(404).send('Stock not found');
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new stock
const createStock = async (req, res) => {
  const newStock = req.body;
  try {
    const [result] = await pool.query('INSERT INTO stocks SET ?', newStock);
    res.status(201).json({ StocksID: result.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a stock by ID
const updateStock = async (req, res) => {
  const { id } = req.params;
  const updatedStock = req.body;
  try {
    const [result] = await pool.query('UPDATE stocks SET ? WHERE StocksID = ?', [updatedStock, id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Stock not found');
    } else {
      res.send('Stock updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a stock by ID
const deleteStock = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM stocks WHERE StocksID = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Stock not found');
    } else {
      res.send('Stock deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
