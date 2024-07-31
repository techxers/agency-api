// cleantype.js

const pool = require('./connection');


// Get all clean types
async function getAllCleanTypes(req, res) {
  try {
    const [cleanTypes] = await pool.query('SELECT * FROM cleantype');
    res.status(200).json(cleanTypes);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Get a single clean type by ID
async function getCleanTypeById(req, res) {
  const { id } = req.params;
  try {
    const [cleanType] = await pool.query('SELECT * FROM cleantype WHERE cleanTypeID = ?', [id]);
    if (cleanType.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Clean type not found',
      });
    }
    res.status(200).json(cleanType[0]);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Create a new clean type
async function createCleanType(req, res) {
  const { Description, Remarks, CoffeeType } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO cleantype (Description, Remarks, CoffeeType) VALUES (?, ?, ?)',
      [Description, Remarks, CoffeeType]
    );
    const insertedCleanType = {
      cleanTypeID: result.insertId,
      Description,
      Remarks,
      CoffeeType,
    };
    res.status(201).json({
      message: 'Clean type created successfully',
      cleanType: insertedCleanType,
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Update a clean type by ID
async function updateCleanType(req, res) {
  const { id } = req.params;
  const { Description, Remarks, CoffeeType } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE cleantype SET Description = ?, Remarks = ?, CoffeeType = ? WHERE cleanTypeID = ?',
      [Description, Remarks, CoffeeType, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Clean type not found',
      });
    }

    res.status(200).json({
      message: 'Clean type updated successfully',
      cleanType: {
        cleanTypeID: id,
        Description,
        Remarks,
        CoffeeType,
      },
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Delete a clean type by ID
async function deleteCleanType(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM cleantype WHERE cleanTypeID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Clean type not found',
      });
    }

    res.status(200).json({
      message: 'Clean type deleted successfully',
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

module.exports = {
    getAllCleanTypes,
    getCleanTypeById,
    createCleanType,
    updateCleanType,
    deleteCleanType
  };

