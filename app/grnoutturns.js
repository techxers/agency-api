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
async function getGetGrnGradesBulk(req, res) {
    console.log('-----------getGetGrnGradesBulk-------------------------');



    try {
        const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE SaleStatusID = 2 AND OutturnBulkID IS NULL AND BulkStatus IS NULL AND Weight <= 100');
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
    const grnOutturnData = req.body;
    try {
        const [result] = await pool.query('INSERT INTO grn_outturns SET ?', [grnOutturnData]);
        res.status(201).json({ message: 'GRN outturn created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating GRN outturn:', error);
        res.status(500).json({ message: 'Error creating GRN outturn' + error });
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
// Save Bulk Collection for GRN Outturns
async function saveBulkCollection(req, res) {
    const { selectedBulkItems, totalKgs, grnOutturnID } = req.body;

    if (!selectedBulkItems || !selectedBulkItems.length) {
        return res.status(400).json({ message: 'Please select outturns to bulk before saving!' });
    }

    // Prepare array to store all new bulk items
    const bulkItems = selectedBulkItems.map(item => ({
        grnOutturnID: item.grnOutturnID,
        GrossWeight: 0,
        GRNID: item.GRNID,
        SeasonID: item.SeasonID,
        Location: item.Location,
        Weight: item.Weight,
        Bags: item.Bags,
        Pkts: item.Pkts,
        GradeID: item.GradeID,
        MaClass: item.MaClass,
        CleanTypeID: item.CleanTypeID,
        OutturnMark: item.OutturnMark,
        Quality: item.Quality,
        SaleStatusID: item.SaleStatusID,
        GrowerId: item.GrowerId,
        CreatedOn: item.CreatedOn,
        OutturnNo: item.OutturnNo,
        SellableStatusID: item.SellableStatusID,
        BulkStatus: item.BulkStatus,
        Season: item.Season,
        PercentOfBulk: parseFloat((item.Weight / totalKgs).toFixed(15)),
        BulkerID: item.BulkerID,
        BagTypeID: item.BagTypeID,
        CompleteLot: item.CompleteLot,
        LotNo: item.LotNo,
        OutturnBulkID: item.OutturnBulkID,
        OutturnQualityID: item.OutturnQualityID,
        PartialDelivery: item.PartialDelivery,
        SaleID: item.SaleID,
        WarrantID: item.WarrantID,
        WarrantedWeight: item.WarrantedWeight
    }));

    // Confirm operation
    if (!req.body.confirmation) {
        return res.status(400).json({ message: 'Operation not confirmed by the user.' });
    }

    try {
        // Insert bulk items into the database
        const [result] = await pool.query('INSERT INTO grn_outturns SET ?', [bulkItems]);

        // Update the GrossWeight after bulk processing
        const updateBulk = {
            grnOutturnID: grnOutturnID,
            GrossWeight: totalKgs
        };
        await pool.query('UPDATE grn_outturns SET ? WHERE grnOutturnID = ?', [updateBulk, grnOutturnID]);

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
    saveBulkCollection  

};