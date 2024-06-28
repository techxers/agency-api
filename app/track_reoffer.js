const pool = require('./connection');

// Get all reoffers
const getAllReoffers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM track_reoffer');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a reoffer by ID
const getReofferById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM track_reoffer WHERE ReOfferID = ?', [id]);
    if (rows.length === 0) {
      res.status(404).send('Reoffer not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new reoffer
const createReoffer = async (req, res) => {
  const newReoffer = req.body;
  try {
    const [result] = await pool.query('INSERT INTO track_reoffer SET ?', newReoffer);
    res.status(201).json({ ReOfferID: result.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a reoffer by ID
const updateReoffer = async (req, res) => {
  const { id } = req.params;
  const updatedReoffer = req.body;
  try {
    const [result] = await pool.query('UPDATE track_reoffer SET ? WHERE ReOfferID = ?', [updatedReoffer, id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Reoffer not found');
    } else {
      res.send('Reoffer updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a reoffer by ID
const deleteReoffer = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM track_reoffer WHERE ReOfferID = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Reoffer not found');
    } else {
      res.send('Reoffer deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllReoffers,
  getReofferById,
  createReoffer,
  updateReoffer,
  deleteReoffer,
};
