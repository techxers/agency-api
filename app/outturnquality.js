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

// Get an outturn quality record by Outturn Number and Season ID
// Get an outturn quality record by Outturn Number and Season ID (with optional gradeID)
async function getOutturnQualityBySeason(req, res) {
  const { outturnNo, seasonID, gradeID } = req.params;
  console.log('----------- grade-------------------------'+ gradeID);

  try {
    let rows; // Use let to allow reassignment

    // Check if gradeID is provided or not
    if (gradeID && gradeID !== 'null') {

      console.log('-----------without grade-------------------------');

      // Query when gradeID is not provided
      const [result] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnNo = ? AND SeasonID = ?', [outturnNo, seasonID]);
      rows = result; // Assign the rows from the result of the query
    } else {
      console.log('-----------with grade-------------------gradeID------' + gradeID);

      // Query when gradeID is provided
      const [result] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnNo = ? AND SeasonID = ? AND GradeID = ?', [outturnNo, seasonID, gradeID]);
      rows = result; // Assign the rows from the result of the query
    }

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



// Create a new outturn quality record
async function createOutturnQuality(req, res) {
  const { id } = req.body;
  try {
    console.log('Request Body:', req.body);

    console.log('-----------getAllGRNOutturns---------------------OutturnID = ----' + id);

    const [rows] = await pool.query('INSERT INTO outturnquality SET OutturnID =  ?', id);
    
    res.status(201).json({ OutturnQualityID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
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
  getOutturnQualityBySeason
};
