
const pool = require('./connection'); // Assume pool is a MySQL connection pool

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM agency.agentsinfomation');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ message: 'Error fetching agents' });
  }
};

// Get a single agent by ID
exports.getAgentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM agentsinfomation WHERE agentsinfomationID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching agent:', err);
    res.status(500).json({ message: 'Error fetching agent' });
  }
};

// Create a new agent
exports.createAgent = async (req, res) => {
  const {
    BusinessLocation, BoxOfficeNo, PrimaryMobile, Mobile,
    PrimaryLandline, LandLine, PhoneNumber, FaxNo,
    PrimaryEmailAddress, SecondaryEmailAdress, ContactPerson,
    AgentID, BoxCode
  } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO agentsinfomation (BusinessLocation, BoxOfficeNo, PrimaryMobile, Mobile, PrimaryLandline, LandLine, PhoneNumber, FaxNo, PrimaryEmailAddress, SecondaryEmailAdress, ContactPerson, AgentID, BoxCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [BusinessLocation, BoxOfficeNo, PrimaryMobile, Mobile, PrimaryLandline, LandLine, PhoneNumber, FaxNo, PrimaryEmailAddress, SecondaryEmailAdress, ContactPerson, AgentID, BoxCode]
    );
    res.status(201).json({ id: result.insertId, message: 'Agent created' });
  } catch (err) {
    console.error('Error creating agent:', err);
    res.status(500).json({ message: 'Error creating agent' });
  }
};

// Update an existing agent
exports.updateAgent = async (req, res) => {
  const { id } = req.params;
  const {
    BusinessLocation, BoxOfficeNo, PrimaryMobile, Mobile,
    PrimaryLandline, LandLine, PhoneNumber, FaxNo,
    PrimaryEmailAddress, SecondaryEmailAdress, ContactPerson,
    AgentID, BoxCode
  } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE agentsinfomation SET BusinessLocation = ?, BoxOfficeNo = ?, PrimaryMobile = ?, Mobile = ?, PrimaryLandline = ?, LandLine = ?, PhoneNumber = ?, FaxNo = ?, PrimaryEmailAddress = ?, SecondaryEmailAdress = ?, ContactPerson = ?, AgentID = ?, BoxCode = ? WHERE agentsinfomationID = ?',
      [BusinessLocation, BoxOfficeNo, PrimaryMobile, Mobile, PrimaryLandline, LandLine, PhoneNumber, FaxNo, PrimaryEmailAddress, SecondaryEmailAdress, ContactPerson, AgentID, BoxCode, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.json({ message: 'Agent updated' });
  } catch (err) {
    console.error('Error updating agent:', err);
    res.status(500).json({ message: 'Error updating agent' });
  }
};

// Delete an agent
exports.deleteAgent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM agentsinfomation WHERE agentsinfomationID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.json({ message: 'Agent deleted' });
  } catch (err) {
    console.error('Error deleting agent:', err);
    res.status(500).json({ message: 'Error deleting agent' });
  }
};
