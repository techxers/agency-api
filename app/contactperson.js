// contactperson.js
const pool = require('./connection');

// Get all contact persons for a grower
exports.getAllContactPersons = async (req, res) => {
  const { growerId } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM contactperson WHERE GrowerId = ?', [growerId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching contact persons:', err);
    res.status(500).json({ message: 'Error fetching contact persons' });
  }
};

// Get a single contact person by ID
exports.getContactPersonById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await pool.query('SELECT * FROM contactperson WHERE ContactId = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Contact person not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching contact person:', err);
    res.status(500).json({ message: 'Error fetching contact person' });
  }
};

// Create a new contact person
exports.createContactPerson = async (req, res) => {
  const { GrowerId, ContactName, ContactNumber, Remarks, IsMainContact, ContactTitleID } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO contactperson (GrowerId, ContactName, ContactNumber, Remarks, IsMainContact, ContactTitleID) VALUES (?, ?, ?, ?, ?, ?)',
      [GrowerId, ContactName, ContactNumber, Remarks, IsMainContact, ContactTitleID]
    );
    res.status(201).json({ id: result.insertId, message: 'Contact person created' });
  } catch (err) {
    console.error('Error creating contact person:', err);
    res.status(500).json({ message: 'Error creating contact person' });
  }
};

// Update an existing contact person
exports.updateContactPerson = async (req, res) => {
  const { id } = req.params;
  const { GrowerId, ContactName, ContactNumber, Remarks, IsMainContact, ContactTitleID } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE contactperson SET GrowerId = ?, ContactName = ?, ContactNumber = ?, Remarks = ?, IsMainContact = ?, ContactTitleID = ? WHERE ContactId = ?',
      [GrowerId, ContactName, ContactNumber, Remarks, IsMainContact, ContactTitleID, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact person not found' });
    }

    res.json({ message: 'Contact person updated' });
  } catch (err) {
    console.error('Error updating contact person:', err);
    res.status(500).json({ message: 'Error updating contact person' });
  }
};

// Delete a contact person
exports.deleteContactPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM contactperson WHERE ContactId = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact person not found' });
    }

    res.json({ message: 'Contact person deleted' });
  } catch (err) {
    console.error('Error deleting contact person:', err);
    res.status(500).json({ message: 'Error deleting contact person' });
  }
};
