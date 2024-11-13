// grnoutturns.js
const pool = require('./connection');

// Retrieve all GRN outturns
async function getAllGRNOutturns(req, res) {
    console.log('-----------getAllGRNOutturns-------------------------');

    try {
        console.log('============Fetching GRN outturns===========');
        const [rows] = await pool.query('SELECT * FROM grn_outturns LIMIT 100');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching GRN outturns:', error);
        res.status(500).json({ message: 'Error fetching GRN outturns' });
    }
}

// Retrieve a single GRN outturn by ID
async function getGRNOutturnById(req, res) {
    console.log('-----------getGRNOutturnById-------------------------');

    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE grnOutturnID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'GRN outturn not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching GRN outturn:', error);
        res.status(500).json({ message: 'Error fetching GRN outturn' });
    }
}
// Get an outturn record by ID and seaon
async function getGRNOutturnByIdandSeason(req, res) {
    const { id } = req.params;
    const { seasonID } = req.params;
    console.log('-----------getGRNOutturnByIdandSeason-------------------------');

    console.log('GRNID ' + id);

    try {
        const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE GRNID = ? ', [id]);
        if (rows.length === 0) {

            res.status(404).json({ error: 'GRN Outturns record not found' });
        } else {

            res.status(200).json(rows);
        }
    } catch (error) {

        res.status(500).json({ error: 'Failed to retrieve the GRNNo record' + error.message });
    }
}
// Get an outturn record by ID and seaon
async function getOutturnInBulkByIdandSeason(req, res) {
    const { OutturnNo, SeasonID } = req.params;
    console.log('-----------getOutturnInBulkByIdandSeason-------------------------');
    console.log(`OutturnNo and SeasonID: ${OutturnNo} --- ${SeasonID}`);

    try {
        const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnNo = ? AND SeasonID = ?', [OutturnNo, SeasonID]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'GRN Outturns is not a bulk' });
        } else {
            console.log('----------- rows[0]-------------------------' +  rows[0]);

            const OutturnBulkID = rows[0].grnOutturnID;  // Extract OutturnBulkID from the first row
            console.log('-----------OutturnBulkID-------------------------' + OutturnBulkID);

            // Query for related records
            const [rows2] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnBulkID = ?', [OutturnBulkID]);

            // Send both the original and related records in a single response
            return res.status(200).json(rows2);
        }
    } catch (error) {
        console.error('Error retrieving Bulk Outturn record:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve the Bulk Outturn record' });
    }
}



// Get an outturn record by ID and seaon
async function getBulkOutturns(req, res) {
    console.log('-----------getBulkOutturns-------------------------');

    try {
        const [rows] = await pool.query('SELECT * FROM agency.grn_outturns  where OutturnBulkID is not null LIMIT 300');

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No GRN Outturns ' });
        } else {
            res.status(200).json(rows);

        }
    } catch (error) {
        console.error('Error retrieving Bulk Outturn record:', error.message);
        return res.status(500).json({ error: 'Failed to retrieve the Bulk Outturn record' });
    }
}
// Get an outturn record by ID and seaon
async function getGetGrnGradesBulk(req, res) {
    console.log('-----------getGetGrnGradesBulk-------------------------');



    try {
        const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE   OutturnBulkID IS NULL AND Weight <= 1200');
        if (rows.length === 0) {
            console.log('----------- rows.length === 0-------------------------');

            res.status(404).json({ error: 'Grades to Bulk GRN Outturns records not found' });
        } else {
            console.log('----------- res.status(200)-------------------------' + rows.length);

            res.status(200).json(rows);
        }
    } catch (error) {

        res.status(500).json({ error: 'Failed to retrieve the Grades to Bulk' + error.message });
    }
}

// Create a new GRN outturn
async function createGRNOutturn(req, res) {
    const grnOutturnData = req.body;
    try {
        const [result] = await pool.query('INSERT INTO grn_outturns SET ?', [grnOutturnData]);
        res.status(201).json({ message: 'GRN outturn created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating GRN outturn:', error);
        res.status(500).json({ message: 'Error creating GRN outturn' + error });
    }
}
// Create a new GRN outturn
async function createBulkOutturn(req, res) {
    const { GrowerId, SeasonID, BulkOutturn, TotalKgs, GradeID, MaClass } = req.body;
    console.log('----------- res.status(200)-------------------------' + JSON.stringify(req.params, null, 2));

    // Validate TotalKgs
    if (TotalKgs == null) {
        return res.status(400).json({ message: 'TotalKgs is required.' });
    }

    // Calculate bags and packets
    const bags = Math.floor(TotalKgs / 60); // Use Math.floor for integers
    const pkts = TotalKgs % 60; // Remainder for packets

    // Create the grn_main entry first
    const grnMainData = {
        documentSerial: "BULK",
        GrowerID: GrowerId, // Use incoming GrowerId
        DeliveryDate: new Date(), // Current date
        VehiclePlate: "N/A",
        GrossWeight: 0, // Initial gross weight, can be updated later
        PermitNo: "N/A",
        TareWeight: 0,
        SeasonID: SeasonID,
        NetWeight: 0, // Initial net weight, can be updated later
        grnNo: "BULK" + BulkOutturn + SeasonID,
        WeighBridgeNo: "N/A",
        DriverName: "N/A",
        DriverIDNo: "N/A",
        IsVerified: true,
        WarrantNo: "N/A",
        WHManager: 20,
        SupervisorID: 19,
        WarehouseID: 3,
        MillerID: 186,
        CoffeeTypeId: 3,
        Remarks: "SYSTEM GENERATED BULK",
        CreatedOn: new Date(), // Current timestamp
    };

    try {
        // Insert into grn_main
        const [grnMainResult] = await pool.query('INSERT INTO grn_main SET ?', [grnMainData]);
        const grnMainId = grnMainResult.insertId; // Get the inserted ID

        // Prepare data for grn_outturns
        const grnOutturn = {
            GRNID: grnMainId, // Use the grn_main ID
            SeasonID: SeasonID,
            Location: "ABL", // Assuming this is a fixed value
            Weight: 0, // If you need to calculate this, adjust accordingly
            GrossWeight: TotalKgs, // Assuming total gross weight is provided
            Bags: bags,
            Pkts: pkts,
            GradeID: GradeID,
            MaClass: MaClass,
            CleanTypeID: 3, // Fixed value
            OutturnMark: BulkOutturn + '/' + SeasonID,
            Quality: "Y", // Fixed value
            SaleStatusID: 1, // Fixed value
            GrowerId: GrowerId,
            CreatedOn: new Date(), // Current timestamp
            OutturnNo: BulkOutturn, // Using BulkOutturn directly
            SellableStatusID: 3, // Fixed value
            BulkStatus: 2, // Fixed value
            OutturnQualityID:null,
            Season: new Date().getFullYear().toString(), // Current year as string
        };

        // Insert into grn_outturns
        await pool.query('INSERT INTO grn_outturns SET ?', [grnOutturn]);

        // Respond with success message
        res.status(201).json({ message: ' BULK GRN outturn  created successfully', grnMainId });
    } catch (error) {
        console.error('Error creating GRN outturn or main:', error);
        res.status(500).json({ message: 'Error creating GRN outturn or main: ' + error.message });
    }
}

// Get an outturn record by ID and season
// {
//     "Approved": 1 --  0 = Rejected , 1 =Approved
//     "grnOutturnID": 1,
//     "ActionDate":"2024-07-29",
//     "ConfirmedBy" : 28 ,
//     "ActualWeight": 2000  
//  }
async function finalizeOutturnTemplate(req, res) {
    try {
        const { grnOutturnId, Approved, ActionDate, ConfirmedBy, ActualWeight } = req.body;
        console.log("Request body:", req.body); // Check if req.body is populated

        console.log('----------- res.status(200)-------------------------' + req.body.grnOutturnID);
      // 1. Retrieve the Goutturn data by GrnOutturnId and Season (modify as per ORM or query syntax)
      // Retrieve the Goutturn data by GrnOutturnId
      const [goutturn] = await pool.query('SELECT * FROM grn_outturns WHERE grnOutturnId = ?', [req.body.grnOutturnID]);

      if (goutturn.length === 0) {
        return res.status(404).json({ message: "bulk Outturn record not found" });
      }
        console.log('----OT Record found now cresting template ' + goutturn[0].Weight);
      // 2. Prepare data for the new bulk record
      const newBulkData = {
        BulkFlagID: 3,
        Remarks: "Saved Automatically",
        CreatedOn: new Date(),
        EffectiveDate: new Date(),
        Weight:goutturn[0].Weight,
        OuttutnNo: goutturn[0].OutturnNo,
        GradeID: goutturn[0].GradeID,
        GrnOutturnId: goutturn[0].grnOutturnID,
        SeasonID: goutturn[0].SeasonID,
        ComputedWeight: req.body.ActualWeight,
        PreparedBy: req.body.ConfirmedBy,
        ConfirmedBy: req.body.ConfirmedBy, // Assuming user ID is available from req.user
        BulkerID: 2,
      };
  
      // 3. Insert into t_outturn_bulks table
      await pool.query('INSERT INTO t_outturn_bulks SET ?', [newBulkData]);

      //Update bulk items with status 3 

      const [bulkmembers] = await pool.query('SELECT * FROM grn_outturns WHERE OutturnBulkID = ?', [goutturn[0].OutturnBulkID]);
      console.log('----Number of bulk members is ' + bulkmembers.length);

      for (const b of bulkmembers) {
        await pool.query('UPDATE grn_outturns SET BulkStatus = ? WHERE OutturnBulkID = ?', [2, b.OutturnBulkID]);
      }
      

  
      // 4. Send success response
      res.status(201).json({ message: "Outturn bulk approval completed successfully" });
    } catch (error) {
      console.error("Error Approvinf bulk:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }
  

// Update an existing GRN outturn
async function updateGRNOutturn(req, res) {
    console.log('-----------updateGRNOutturn-------------------------');

    const { id } = req.params;
    const grnOutturnData = req.body;
    try {
        const [result] = await pool.query('UPDATE grn_outturns SET ? WHERE grnOutturnID = ?', [grnOutturnData, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'GRN outturn not found' });
        }
        res.status(200).json({ message: 'GRN outturn updated successfully' });
    } catch (error) {
        console.error('Error updating GRN outturn:', error);
        res.status(500).json({ message: 'Error updating GRN outturn' });
    }
}

async function removeBulkFromGRNOutturn(req, res) {
    const { grnOutturnID } = req.params;  // Assuming these values are passed in the request body
    console.log('----------- res.grnOutturnID-------------------------' + grnOutturnID );

    try {
        // Start the transaction to ensure consistency

        // Perform the update to the grn_outturns table where the grnOutturnID matches
        const [result] = await pool.query(
            'UPDATE grn_outturns SET OutturnBulkID = null, SellableStatusID = 2, BulkStatus = null, SaleStatusID = 2 WHERE grnOutturnID = ?',
            [grnOutturnID]
        );
        
        if (result.affectedRows === 0) {
            // If no rows were affected, return an error message
            return res.status(404).json({ message: 'GRN outturn not found' });
        }

        // Commit the transaction if everything is successful
        
        // Return success response
        res.status(200).json({ message: 'GRN outturn updated successfully' });
        
    } catch (error) {
        // In case of any errors, rollback the transaction
        console.error('Error updating GRN outturn:', error);
        res.status(500).json({ message: 'Error updating GRN outturn' });
    }
}


// Delete an existing GRN outturn
async function deleteGRNOutturn(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM grn_outturns WHERE grnOutturnID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'GRN outturn not found' });
        }
        res.status(200).json({ message: 'GRN outturn deleted successfully' });
    } catch (error) {
        console.error('Error deleting GRN outturn:', error);
        res.status(500).json({ message: 'Error deleting GRN outturn' });
    }
}
async function saveBulkCollection(req, res) {
    const { selectedBulkItems, totalKgs, grnOutturnID } = req.body;
    console.log('-----------updateGRNOutturn-------------------------');

    try {
        for (const item of selectedBulkItems) {
            const percentOfBulk = parseFloat((item.Weight / totalKgs).toFixed(15));
            const updateData = {
                OutturnBulkID: item.OutturnBulkID,
                SellableStatusID: item.SellableStatusID,
                BulkStatus: item.BulkStatus,
                GrowerId: item.GrowerId,
                SaleStatusID: item.SaleStatusID,
                PercentOfBulk: percentOfBulk
            };

            console.log(`Updating GRN Outturn ID: ${item.grnOutturnID} with data:`, updateData);
            
            try {
                const [result] = await pool.query(
                    'UPDATE grn_outturns SET ? WHERE grnOutturnID = ?',
                    [updateData, item.grnOutturnID]
                );
                console.log(`Update result for grnOutturnID ${item.grnOutturnID}:`, result);
            } catch (error) {
                console.error(`Error updating grnOutturnID ${item.grnOutturnID}:`, error);
            }
        }

        // Optional: Update the GrossWeight for the main grnOutturnID after all items have been processed
        const updateBulk = { grnOutturnID, GrossWeight: totalKgs };
        await pool.query('UPDATE grn_outturns SET ? WHERE grnOutturnID = ?', [updateBulk, grnOutturnID]);
        console.log(`GrossWeight updated for grnOutturnID ${grnOutturnID} with totalKgs: ${totalKgs}`);

        res.status(200).json({ message: 'Bulk process completed successfully.' });
    } catch (error) {
        console.error('Error in bulk processing:', error);
        res.status(500).json({ message: 'Bulk process failed.' });
    }
};

module.exports = {
    getAllGRNOutturns,
    getGRNOutturnById,
    createGRNOutturn,
    updateGRNOutturn,
    deleteGRNOutturn,
    getGRNOutturnByIdandSeason,
    getOutturnInBulkByIdandSeason,
    createBulkOutturn,
    getGetGrnGradesBulk,
    saveBulkCollection,
    finalizeOutturnTemplate,
    getBulkOutturns,
    removeBulkFromGRNOutturn

};