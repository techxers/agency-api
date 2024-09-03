// grnoutturns.js
const pool = require('./connection');

// Retrieve all GRN outturns
async function getAllGRNOutturns(req, res) {
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
    const { GRNID } = req.params;
    const { seasonID } = req.params;

    console.log('GRNID ' + GRNID);

    try {
        const [rows] = await pool.query('SELECT * FROM grn_outturns WHERE GRNID = ? ', [GRNID]);
        if (rows.length === 0) {

            res.status(404).json({ error: 'GRN Outturns record not found' });
        } else {

            res.status(200).json(rows);
        }
    } catch (error) {

        res.status(500).json({ error: 'Failed to retrieve the GRNNo record' + error.message });
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

// Update an existing GRN outturn
async function updateGRNOutturn(req, res) {
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

module.exports = {
    getAllGRNOutturns,
    getGRNOutturnById,
    createGRNOutturn,
    updateGRNOutturn,
    deleteGRNOutturn,
    getGRNOutturnByIdandSeason
};