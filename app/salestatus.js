const pool = require('./connection');


// Get all sale statuses
const getAllSaleStatuses = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM salestatus');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a sale status by ID
const getSaleStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM salestatus WHERE SaleStatusId = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Sale status not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new sale status
const createSaleStatus = async (req, res) => {
  const newSaleStatus = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO salestatus SET ?', newSaleStatus);
    
    res.status(201).json({ SaleStatusId: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a sale status by ID
const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const updatedSaleStatus = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE salestatus SET ? WHERE SaleStatusId = ?', [updatedSaleStatus, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Sale status not found');
    } else {
      res.send('Sale status updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a sale status by ID
const deleteSaleStatus = async (req, res) => {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM salestatus WHERE SaleStatusId = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Sale status not found');
    } else {
      res.send('Sale status deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSaleStatuses,
  getSaleStatusById,
  createSaleStatus,
  updateSaleStatus,
  deleteSaleStatus,
};
