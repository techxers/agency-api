const pool = require('./connection');

// Get all sale types
const getAllSaleTypes = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM saletype');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a sale type by ID
const getSaleTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM saletype WHERE SaleTypeID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Sale type not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new sale type
const createSaleType = async (req, res) => {
  const newSaleType = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO saletype SET ?', newSaleType);
    
    res.status(201).json({ SaleTypeID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a sale type by ID
const updateSaleType = async (req, res) => {
  const { id } = req.params;
  const updatedSaleType = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE saletype SET ? WHERE SaleTypeID = ?', [updatedSaleType, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Sale type not found');
    } else {
      res.send('Sale type updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a sale type by ID
const deleteSaleType = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM saletype WHERE SaleTypeID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Sale type not found');
    } else {
      res.send('Sale type deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSaleTypes,
  getSaleTypeById,
  createSaleType,
  updateSaleType,
  deleteSaleType,
};
