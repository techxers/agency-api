// bags.js
const pool = require('./connection'); // Assume pool is a MySQL connection pool

// Get all bags
exports.getAllBags = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bags');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching bags:', err);
    res.status(500).json({ message: 'Error fetching bags' });
  }
};

// Get a single bag by ID
exports.getBagById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM bags WHERE BagID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Bag not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching bag:', err);
    res.status(500).json({ message: 'Error fetching bag' });
  }
};

// Create a new bag
exports.createBag = async (req, res) => {
  const { Description, weight, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO bags (Description, weight, Remarks) VALUES (?, ?, ?)',
      [Description, weight, Remarks]
    );
    res.status(201).json({ id: result.insertId, message: 'Bag created' });
  } catch (err) {
    console.error('Error creating bag:', err);
    res.status(500).json({ message: 'Error creating bag' });
  }
};

// Update an existing bag
exports.updateBag = async (req, res) => {
  const { id } = req.params;
  const { Description, weight, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE bags SET Description = ?, weight = ?, Remarks = ? WHERE BagID = ?',
      [Description, weight, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    res.json({ message: 'Bag updated' });
  } catch (err) {
    console.error('Error updating bag:', err);
    res.status(500).json({ message: 'Error updating bag' });
  }
};

// Delete a bag
exports.deleteBag = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM bags WHERE BagID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    res.json({ message: 'Bag deleted' });
  } catch (err) {
    console.error('Error deleting bag:', err);
    res.status(500).json({ message: 'Error deleting bag' });
  }
};
