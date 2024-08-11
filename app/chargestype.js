const pool = require('./connection');
const { validationResult } = require('express-validator');

// GET all charge types
async function getAllChargeTypes(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM chargetypes');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching charge types:', error);
    res.status(500).json({ message: 'Error fetching charge types' });
  }
}

// GET charge type by ID
async function getChargeTypeById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM chargetypes WHERE ChargeTypeID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Charge type not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching charge type:', error);
    res.status(500).json({ message: 'Error fetching charge type' });
  }
}

// POST create a new charge type
async function createChargeType(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ChargeTypeDescription, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO chargetypes (ChargeTypeDescription, Remarks) VALUES (?, ?)',
      [ChargeTypeDescription, Remarks]
    );

    res.status(201).json({ message: 'Charge type created', ChargeTypeID: result.insertId });
  } catch (error) {
    console.error('Error creating charge type:', error);
    res.status(500).json({ message: 'Error creating charge type' });
  }
}

// PUT update a charge type by ID
async function updateChargeType(req, res) {
  const { id } = req.params;
  const { ChargeTypeDescription, Remarks } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.query(
      'UPDATE chargetypes SET ChargeTypeDescription = ?, Remarks = ? WHERE ChargeTypeID = ?',
      [ChargeTypeDescription, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Charge type not found' });
    }

    res.status(200).json({ message: 'Charge type updated' });
  } catch (error) {
    console.error('Error updating charge type:', error);
    res.status(500).json({ message: 'Error updating charge type' });
  }
}

// DELETE a charge type by ID
async function deleteChargeType(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM chargetypes WHERE ChargeTypeID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Charge type not found' });
    }

    res.status(200).json({ message: 'Charge type deleted' });
  } catch (error) {
    console.error('Error deleting charge type:', error);
    res.status(500).json({ message: 'Error deleting charge type' });
  }
}

module.exports = {
  getAllChargeTypes,
  getChargeTypeById,
  createChargeType,
  updateChargeType,
  deleteChargeType,
};
