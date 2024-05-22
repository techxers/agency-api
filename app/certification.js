// certification.js
const pool = require('./connection');

// Get all certifications
exports.getAllCertifications = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM certification');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching certifications:', err);
    res.status(500).json({ message: 'Error fetching certifications' });
  }
};

// Get a single certification by ID
exports.getCertificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM certification WHERE CertificationId = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching certification:', err);
    res.status(500).json({ message: 'Error fetching certification' });
  }
};

// Create a new certification
exports.createCertification = async (req, res) => {
  const { CertificationName, CertDescription, StartDate, EndDate } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO certification (CertificationName, CertDescription, StartDate, EndDate) VALUES (?, ?, ?, ?)',
      [CertificationName, CertDescription, StartDate, EndDate]
    );
    res.status(201).json({ id: result.insertId, message: 'Certification created' });
  } catch (err) {
    console.error('Error creating certification:', err);
    res.status(500).json({ message: 'Error creating certification' });
  }
};

// Update an existing certification
exports.updateCertification = async (req, res) => {
  const { id } = req.params;
  const { CertificationName, CertDescription, StartDate, EndDate } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE certification SET CertificationName = ?, CertDescription = ?, StartDate = ?, EndDate = ? WHERE CertificationId = ?',
      [CertificationName, CertDescription, StartDate, EndDate, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.json({ message: 'Certification updated' });
  } catch (err) {
    console.error('Error updating certification:', err);
    res.status(500).json({ message: 'Error updating certification' });
  }
};

// Delete a certification
exports.deleteCertification = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM certification WHERE CertificationId = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.json({ message: 'Certification deleted' });
  } catch (err) {
    console.error('Error deleting certification:', err);
    res.status(500).json({ message: 'Error deleting certification' });
  }
};
