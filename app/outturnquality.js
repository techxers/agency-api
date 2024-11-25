const pool = require('./connection');

// Get all outturn quality records
async function getAllOutturnQuality(req, res) {
  try {
    
    const [rows] = await pool.query('SELECT * FROM outturnquality');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get an outturn quality record by ID
async function getOutturnQualityById(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM outturnquality WHERE OutturnQualityID = ?', [id]);
    
    if (rows.length === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Get an outturn quality record by Outturn Number and Season ID (with optional gradeID)


async function getOutturnQualityByGrade(req, res) {
  const { outturnNo, seasonID, gradeID } = req.params;
  console.log('----------- outturnNo---'+ outturnNo +  'seasonID---'+ seasonID +  'gradeID---'+ gradeID);

  try {
    let rows; // Use let to allow reassignment

    // Check if gradeID is provided or not
 
      console.log('-----------with grade-------------------gradeID------' + gradeID);

      // Query when gradeID is provided
      const [result] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnNo = ? AND SeasonID = ? AND GradeID = ?', [outturnNo, seasonID, gradeID]);
      
      // Ensure result is an array and assign it to rows
      rows = Array.isArray(result) ? result : [];
 // Check if any records were found
    if (rows.length === 0) {
      return res.status(404).json('GRN Outturn records not found');
    } else {
      return res.status(200).json(rows); // Return the records in JSON format
    }
    
    

   
  } catch (error) {
    console.error('Error retrieving GRN Outturn:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve the GRN Outturn' });
  }
}
async function getOutturnQualityBySeason(req, res) {
  const { outturnNo, seasonID  } = req.params;
  console.log('----------- outturnNo---'+ outturnNo +  'seasonID---'+ seasonID );

  try {
    let rows; // Use let to allow reassignment

    // Check if gradeID is provided or not

      console.log('-----------without grade-------------------------');

      // Query when gradeID is not provided
      const [result] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnNo = ? AND SeasonID = ?', [outturnNo, seasonID]);
      
      // Ensure result is an array and assign it to rows
      rows = Array.isArray(result) ? result : [];
   
    // Check if any records were found
    if (rows.length === 0) {
      return res.status(404).json('GRN Outturn records not found');
    } else {
      return res.status(200).json(rows); // Return the records in JSON format
    }
  } catch (error) {
    console.error('Error retrieving GRN Outturn:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve the GRN Outturn' });
  }
}


async function createOutturnQuality(req, res) {
  const { grnOutturnID } = req.body;

  // Log the incoming request body for debugging
  console.log('Request Body:', req.body);
  console.log('-----------Creating Outturn Quality for OutturnID = ----' + grnOutturnID);

  try {
    // Step 1: Check if a record with the same grnOutturnID already exists in outturnquality table
    const [existingRows] = await pool.query('SELECT * FROM outturnquality WHERE OutturnID = ?', [grnOutturnID]);

    // If a record with the same grnOutturnID already exists, return a 409 Conflict response
    if (existingRows.length > 0) {
      return res.status(409).json({
        message: `Outturn quality record with OutturnID ${grnOutturnID} already exists`
      });
    }

    // Step 2: Insert the new record with hardcoded values
    const [result] = await pool.query(
      'INSERT INTO outturnquality (OutturnID, CuppedBy, ConfirmedBy, CreatedOn, EffectiveDate) VALUES (?, ?, ?, ?, ?)', 
      [
        grnOutturnID,        // OutturnID
        25,                  // CuppedBy
        25,                  // ConfirmedBy
        Math.floor(Date.now() / 1000),  // CreatedOn as timestamp (seconds since epoch)
        new Date()           // EffectiveDate
      ]
    );

    // Respond with the new OutturnQualityID from the insert
    res.status(201).json({ OutturnQualityID: result.insertId });

  } catch (error) {
    console.error('Error creating outturn quality record:', error.message);

    // Return a generic server error with the error message
    res.status(500).json({
      error: 'Failed to create the Outturn quality record',
      details: error.message // Include error details for debugging
    });
  }
}


// Update an outturn quality record by ID
async function updateOutturnQuality(req, res) {
  const { id } = req.params;
  const updatedOutturnQuality = req.body;
  try {
    
    const [rows] = await pool.query('UPDATE outturnquality SET ? WHERE OutturnQualityID = ?', [updatedOutturnQuality, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.send('Outturn quality record updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete an outturn quality record by ID
async function deleteOutturnQuality(req, res) {
  const { id } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM outturnquality WHERE OutturnQualityID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn quality record not found');
    } else {
      res.send('Outturn quality record deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllOutturnQuality,
  getOutturnQualityById,
  createOutturnQuality,
  updateOutturnQuality,
  deleteOutturnQuality,
  getOutturnQualityBySeason,
  getOutturnQualityByGrade
};
