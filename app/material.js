const pool = require('./connection');
// Get all materials
async function getAllMaterials(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM material');
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching material:', err);
    res.status(500).json({ message: 'Error fetching material' });

  }
}

// Get a material by ID
async function getMaterialById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM material WHERE MaterialID = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Material not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching Material:', error);
    res.status(500).json({ message: 'Error fetching Material' });
  }
}

// Create a new material
async function createMaterial(req, res) {
  const newMaterial = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO material SET ?', newMaterial);
    
    res.status(201).json({ message: 'Material created', MaterialID: result.insertId });
  } catch (error) {
    console.error('Error creating Material:', error);
    res.status(500).json({ message: 'Error creating Material' });
  }
}
// Update a material by ID
async function updateMaterial(req, res) {
  const { id } = req.params;
  const updatedMaterial = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE material SET ? WHERE MaterialID = ?', [updatedMaterial, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Material not found');
    } else {
      res.send('Material updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete a material by ID
async function deleteMaterial(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM material WHERE MaterialID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Material not found');
    } else {
      res.send('Material deleted successfully');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Material' });
  }
}

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
};
