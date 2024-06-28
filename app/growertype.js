const pool = require('./connection');

// Get all grower types
async function getAllGrowerTypes(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM growertype');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching growertype' });
  }
}

// Get a grower type by ID
async function getGrowerTypeById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM growertype WHERE GrowerTypeId = ?', [id]);
   
    if (rows.length === 0) {
      res.status(404).send('Grower type not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Create a new grower type
async function createGrowerType(req, res) {
  const newGrowerType = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO growertype SET ?', newGrowerType);
   
    res.status(201).json({ GrowerTypeId: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update a grower type by ID
async function updateGrowerType(req, res) {
  const { id } = req.params;
  const updatedGrowerType = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE growertype SET ? WHERE GrowerTypeId = ?', [updatedGrowerType, id]);
   
    if (rows.affectedRows === 0) {
      res.status(404).send('Grower type not found');
    } else {
      res.send('Grower type updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete a grower type by ID
async function deleteGrowerType(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM growertype WHERE GrowerTypeId = ?', [id]);
   
    if (rows.affectedRows === 0) {
      res.status(404).send('Grower type not found');
    } else {
      res.send('Grower type deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllGrowerTypes,
  getGrowerTypeById,
  createGrowerType,
  updateGrowerType,
  deleteGrowerType
};
