// factories.js
const pool = require('./connection');

// Get all factories
exports.getAllFactories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM factories');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching factories:', err);
    res.status(500).json({ message: 'Error fetching factories' });
  }
};

// Get a single factory by ID
exports.getFactoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM factories WHERE FactoryID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Factory not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching factory:', err);
    res.status(500).json({ message: 'Error fetching factory' });
  }
};

// Create a new factory
exports.createFactory = async (req, res) => {
  const { SocietyID, FactoryCode, FactoryName, Remarks, StartDate, EndDate, AccountNo, BankID, BranchID } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO factories (SocietyID, FactoryCode, FactoryName, Remarks, StartDate, EndDate, AccountNo, BankID, BranchID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [SocietyID, FactoryCode, FactoryName, Remarks, StartDate, EndDate, AccountNo, BankID, BranchID]
    );
    res.status(201).json({ id: result.insertId, message: 'Factory created' });
  } catch (err) {
    console.error('Error creating factory:', err);
    res.status(500).json({ message: 'Error creating factory' });
  }
};

// Update an existing factory
exports.updateFactory = async (req, res) => {
  const { id } = req.params;
  const { SocietyID, FactoryCode, FactoryName, Remarks, StartDate, EndDate, AccountNo, BankID, BranchID } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE factories SET SocietyID = ?, FactoryCode = ?, FactoryName = ?, Remarks = ?, StartDate = ?, EndDate = ?, AccountNo = ?, BankID = ?, BranchID = ? WHERE FactoryID = ?',
      [SocietyID, FactoryCode, FactoryName, Remarks, StartDate, EndDate, AccountNo, BankID, BranchID, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Factory not found' });
    }

    res.json({ message: 'Factory updated' });
  } catch (err) {
    console.error('Error updating factory:', err);
    res.status(500).json({ message: 'Error updating factory' });
  }
};

// Delete a factory
exports.deleteFactory = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM factories WHERE FactoryID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Factory not found' });
    }

    res.json({ message: 'Factory deleted' });
  } catch (err) {
    console.error('Error deleting factory:', err);
    res.status(500).json({ message: 'Error deleting factory' });
  }
};
