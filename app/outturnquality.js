const pool = require('./connection');

// Get all outturn quality records
async function getAllOutturnQuality(req, res) {
  try {
    // Fetch all records from the outturnquality table
    const [rows] = await pool.query('SELECT * FROM outturnquality');

    // Array to hold the final combined results
    const results = [];

    for (const row of rows) {
      const OutturnID = row.OutturnQualityID;

      // Fetch related data from subtables
      const [greenDefects] = await pool.query(
        'SELECT * FROM t_outturn_quality_greendefects WHERE OutturnQualityID = ?',
        [OutturnID]
      );

      const [roastDefects] = await pool.query(
        'SELECT * FROM t_outturn_quality_roastdefects WHERE OutturnQualityID = ?',
        [OutturnID]
      );

      const [taints] = await pool.query(
        'SELECT * FROM t_outturn_quality_taint WHERE OutturnQualityID = ?',
        [OutturnID]
      );

      // Combine the main record with subtable data
      const combinedData = {
        ...row,
        greenDefects,
        roastDefects,
        taints,
      };

      results.push(combinedData);
    }

    // Respond with the final combined data
    return res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching outturn qualities:', error.message);
    return res.status(500).json({ error: 'Failed to retrieve outturn qualities' });
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

  console.log('----------- outturnNo---' + outturnNo + ' seasonID---' + seasonID + ' gradeID---' + gradeID);

  try {
    // Fetch the main record
    const [result] = await pool.query(
      'SELECT * FROM grn_outturns WHERE OutturnNo = ? AND SeasonID = ? AND GradeID = ?',
      [outturnNo, seasonID, gradeID]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'GRN Outturn records not found' });
    }

    const mainRecord = result[0];
    const OutturnQualityID = mainRecord.grnOutturnID;
    console.log('----------- grn outturn ---' +  OutturnQualityID);
    if (!OutturnQualityID) {
      return res.status(200).json({ ...mainRecord, greenDefects: [], roastDefects: [], taints: [] });
    }

    const [oc] = await pool.query(
      'SELECT * FROM outturnquality WHERE OutturnID = ?',
      [OutturnQualityID]
    );
    const outturnQuality = oc[0];
    const OutturnID = outturnQuality.OutturnQualityID;
    console.log('----------- Outturn Quality ID ---' +  OutturnID);

    // Fetch data from related subtables
    const [greenDefects] = await pool.query(
      'SELECT * FROM t_outturn_quality_greendefects WHERE OutturnQualityID = ?',
      [OutturnID]
    );

    const [roastDefects] = await pool.query(
      'SELECT * FROM t_outturn_quality_roastdefects WHERE OutturnQualityID = ?',
      [OutturnID]
    );

    const [taints] = await pool.query(
      'SELECT * FROM t_outturn_quality_taint WHERE OutturnQualityID = ?',
      [OutturnID]
    );

    // Combine the main record with subtable data
    const response = {
      ...outturnQuality,
      greenDefects,
      roastDefects,
      taints,
    };

    return res.status(200).json(response);
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
        new Date().toISOString().slice(0, 19).replace('T', ' '),  // CreatedOn as timestamp (seconds since epoch)
        new Date().toISOString().slice(0, 19).replace('T', ' ')         // EffectiveDate
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


async function updateOutturnQuality(req, res) {
  const { id } = req.params;
  const updatedOutturnQuality = req.body;

  const {
    greenDefects = [],
    roastDefects = [],
    taints = [],
    ...mainOutturnQuality
  } = updatedOutturnQuality;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Update the main outturn quality record
    const [mainResult] = await connection.query(
      'UPDATE outturnquality SET ? WHERE OutturnQualityID = ?',
      [mainOutturnQuality, id]
    );

    if (mainResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).send('Outturn quality record not found');
    }

    // Helper function to sync sub-tables
    const syncSubTable = async (table, data, foreignKeyColumn) => {
      // Fetch existing records
      const [existingRecords] = await connection.query(
        `SELECT QualityParamsID FROM ${table} WHERE ${foreignKeyColumn} = ?`,
        [id]
      );

      const existingIds = new Set(existingRecords.map((row) => row.QualityParamsID));
      const incomingIds = new Set(data.map((item) => item.QualityParamsID));

      // Identify records to insert
      const toInsert = data.filter((item) => !existingIds.has(item.QualityParamsID));
      if (toInsert.length > 0) {
        const insertValues = toInsert.map((item) => [item.QualityParamsID, id]);
        await connection.query(
          `INSERT INTO ${table} (QualityParamsID, ${foreignKeyColumn}) VALUES ?`,
          [insertValues]
        );
      }

      // Identify records to delete
      const toDelete = [...existingIds].filter((id) => !incomingIds.has(id));
      if (toDelete.length > 0) {
        await connection.query(
          `DELETE FROM ${table} WHERE ${foreignKeyColumn} = ? AND QualityParamsID IN (?)`,
          [id, toDelete]
        );
      }
    };

    // Sync sub-tables
    await syncSubTable('t_outturn_quality_greendefects', greenDefects, 'OutturnQualityID');
    await syncSubTable('t_outturn_quality_roastdefects', roastDefects, 'OutturnQualityID');
    await syncSubTable('t_outturn_quality_taint', taints, 'OutturnQualityID');

    await connection.commit();
    res.send('Outturn quality record updated successfully');
  } catch (error) {
    await connection.rollback();
    console.error('Error updating outturn quality:', error);
    res.status(500).send(error.message);
  } finally {
    connection.release();
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
