const pool = require('./connection');

// Get all stocks
const getAllStocks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stocks');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
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
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new stock
const createStock = async (req, res) => {
  const newStock = req.body;
  try {
    const [result] = await pool.query('INSERT INTO stocks SET ?', newStock);
    res.status(201).json({ StocksID: result.insertId });
  } catch (error) {
    res.status(500).send(error);
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
  } catch (error) {
    res.status(500).send(error);
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
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
