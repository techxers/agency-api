// coop-society.js
const pool = require('./connection');

// Get all cooperative societies
const getAllCoopSocieties = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `coop-society`');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cooperative societies:', err);
    res.status(500).json({ message: 'Error fetching cooperative societies' });
  }
};

// Get a single cooperative society by ID
const getCoopSocietyById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM `coop-society` WHERE SocietyID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cooperative society not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching cooperative society:', err);
    res.status(500).json({ message: 'Error fetching cooperative society' });
  }
};

// Create a new cooperative society
const createCoopSociety = async (req, res) => {
  const { SocietyName, BankAccountNO, BankID, BranchID, SocietyCode, Description, StartDate, EndDate } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO `coop-society` (SocietyName, BankAccountNO, BankID, BranchID, SocietyCode, Description, StartDate, EndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [SocietyName, BankAccountNO, BankID, BranchID, SocietyCode, Description, StartDate, EndDate]
    );
    res.status(201).json({ id: result.insertId, message: 'Cooperative society created' });
  } catch (err) {
    console.error('Error creating cooperative society:', err);
    res.status(500).json({ message: 'Error creating cooperative society' });
  }
};

// Update an existing cooperative society
const updateCoopSociety = async (req, res) => {
  const { id } = req.params;
  const { SocietyName, BankAccountNO, BankID, BranchID, SocietyCode, Description, StartDate, EndDate } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE `coop-society` SET SocietyName = ?, BankAccountNO = ?, BankID = ?, BranchID = ?, SocietyCode = ?, Description = ?, StartDate = ?, EndDate = ? WHERE SocietyID = ?',
      [SocietyName, BankAccountNO, BankID, BranchID, SocietyCode, Description, StartDate, EndDate, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cooperative society not found' });
    }

    res.json({ message: 'Cooperative society updated' });
  } catch (err) {
    console.error('Error updating cooperative society:', err);
    res.status(500).json({ message: 'Error updating cooperative society' });
  }
};

// Delete a cooperative society
const deleteCoopSociety = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM `coop-society` WHERE SocietyID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cooperative society not found' });
    }

    res.json({ message: 'Cooperative society deleted' });
  } catch (err) {
    console.error('Error deleting cooperative society:', err);
    res.status(500).json({ message: 'Error deleting cooperative society' });
  }
};
module.exports = {
  getAllCoopSocieties,
  getCoopSocietyById,
  createCoopSociety,
  updateCoopSociety,
  deleteCoopSociety,
};
