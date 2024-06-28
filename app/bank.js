// bank.js
const pool = require('./connection');

// Get all banks
exports.getAllBanks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bank');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching banks:', err);
    res.status(500).json({ message: 'Error fetching banks' });
  }
};

// Get a single bank by ID
exports.getBankById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM bank WHERE BankId = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching bank:', err);
    res.status(500).json({ message: 'Error fetching bank' });
  }
};

// Create a new bank
exports.createBank = async (req, res) => {
  const { BankName, BankSwiftCode, Remarks, IsActive, BankCode } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO bank (BankName, BankSwiftCode, Remarks, IsActive, BankCode) VALUES (?, ?, ?, ?, ?)',
      [BankName, BankSwiftCode, Remarks, IsActive, BankCode]
    );
    res.status(201).json({ id: result.insertId, message: 'Bank created' });
  } catch (error) {
    console.error('Error creating bank:', err);
    res.status(500).json({ message: 'Error creating bank' });
  }
};

// Update an existing bank
exports.updateBank = async (req, res) => {
  const { id } = req.params;
  const { BankName, BankSwiftCode, Remarks, IsActive, BankCode } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE bank SET BankName = ?, BankSwiftCode = ?, Remarks = ?, IsActive = ?, BankCode = ? WHERE BankId = ?',
      [BankName, BankSwiftCode, Remarks, IsActive, BankCode, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bank not found' });
    }

    res.json({ message: 'Bank updated' });
  } catch (error) {
    console.error('Error updating bank:', err);
    res.status(500).json({ message: 'Error updating bank' });
  }
};

// Delete a bank
exports.deleteBank = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM bank WHERE BankId = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bank not found' });
    }

    res.json({ message: 'Bank deleted' });
  } catch (error) {
    console.error('Error deleting bank:', err);
    res.status(500).json({ message: 'Error deleting bank' });
  }
};
