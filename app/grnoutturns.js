// grnoutturns.js
const pool = require('./connection');

// Retrieve all GRN outturns
exports.getAllGRNOutturns = async (req, res) => {
  try {
    console.log('============Fetching GRN outturns===========');
    const [rows] = await pool.query('SELECT name FROM grn_outturns');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching GRN outturns:', err);
    res.status(500).json({ message: 'Error fetching GRN outturns' });
  }
};

// Retrieve a single GRN outturn by ID
exports.getGRNOutturnById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE grnOutturnID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'GRN outturn not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching GRN outturn:', err);
    res.status(500).json({ message: 'Error fetching GRN outturn' });
  }
};

// Create a new GRN outturn
exports.createGRNOutturn = async (req, res) => {
  const grnOutturnData = req.body;
  try {
    const result = await pool.query('INSERT INTO grn_outturns SET ?', [grnOutturnData]);
    res.json({ message: 'GRN outturn created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating GRN outturn:', err);
    res.status(500).json({ message: 'Error creating GRN outturn' });
  }
};

// Update an existing GRN outturn
exports.updateGRNOutturn = async (req, res) => {
  const { id } = req.params;
  const grnOutturnData = req.body;
  try {
    const result = await pool.query('UPDATE grn_outturns SET ? WHERE grnOutturnID = ?', [grnOutturnData, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'GRN outturn not found' });
    }
    res.json({ message: 'GRN outturn updated successfully' });
  } catch (error) {
    console.error('Error updating GRN outturn:', err);
    res.status(500).json({ message: 'Error updating GRN outturn' });
  }
};

// Delete an existing GRN outturn
exports.deleteGRNOutturn = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM grn_outturns WHERE grnOutturnID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'GRN outturn not found' });
    }
    res.json({ message: 'GRN outturn deleted successfully' });
  } catch (error) {
    console.error('Error deleting GRN outturn:', err);
    res.status(500).json({ message: 'Error deleting GRN outturn' });
  }
};
