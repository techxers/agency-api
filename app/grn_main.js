const pool = require('./connection');

// Retrieve all GRN main records
async function getAllGRNMains(req, res) {
    try {
        console.log('============Fetching GRN main records===========');
        const [rows] = await pool.query('SELECT * FROM grn_main LIMIT 100');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching GRN main records:', error);
        res.status(500).json({ message: 'Error fetching GRN main records' });
    }
}

// Retrieve a single GRN main record by ID
async function getGRNMainById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM grn_main WHERE grnID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'GRN main record not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching GRN main record:', error);
        res.status(500).json({ message: 'Error fetching GRN main record' });
    }
}

// Create a new GRN main record
async function createGRNMain(req, res) {
    const grnMainData = req.body;
    try {
        const [result] = await pool.query('INSERT INTO grn_main SET ?', [grnMainData]);
        res.status(201).json({ message: 'GRN main record created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating GRN main record:', error);
        res.status(500).json({ message: 'Error creating GRN main record' });
    }
}

// Update an existing GRN main record
async function updateGRNMain(req, res) {
    const { id } = req.params;
    const grnMainData = req.body;
    try {
        const [result] = await pool.query('UPDATE grn_main SET ? WHERE grnID = ?', [grnMainData, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'GRN main record not found' });
        }
        res.status(200).json({ message: 'GRN main record updated successfully' });
    } catch (error) {
        console.error('Error updating GRN main record:', error);
        res.status(500).json({ message: 'Error updating GRN main record' });
    }
}

// Delete an existing GRN main record
async function deleteGRNMain(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM grn_main WHERE grnID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'GRN main record not found' });
        }
        res.status(200).json({ message: 'GRN main record deleted successfully' });
    } catch (error) {
        console.error('Error deleting GRN main record:', error);
        res.status(500).json({ message: 'Error deleting GRN main record' });
    }
}
async function getGRNMainsByGrnIdAndSeason(req, res) {
    const { GrnNo } = req.params;
    const { seasonID } = req.params;
    console.log(' grnID ' + GrnNo + ' SeasonID' + seasonID);

    try {
        console.log('============Fetching GRN main records===========');
        const [rows] = await pool.query('SELECT * FROM grn_main WHERE GrnNo = ? AND seasonID = ?', [GrnNo, seasonID]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'GRN main record not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching GRN main records:', error);
        res.status(500).json({ message: 'Error fetching GRN main records' });
    }


};

module.exports = {
    getAllGRNMains,
    getGRNMainsByGrnIdAndSeason,
    getGRNMainById,
    createGRNMain,
    updateGRNMain,
    deleteGRNMain,
};