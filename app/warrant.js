const pool = require('./connection');

// Retrieve all warrants
async function getAllWarrants(req, res) {
    try {
        console.log('============Fetching all warrants===========');
        const [rows] = await pool.query('SELECT * FROM warranted_coffee LIMIT 100');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching warrants:', error);
        res.status(500).json({ message: `Error fetching warrant: ${error.message}` });
    }
}

// Retrieve a single warrant by ID
async function getWarrantById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM warranted_coffee WHERE WarrantID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Warrant not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching warrant:', error);
        res.status(500).json({ message: `Error fetching warrant: ${error.message}` });
    }
}
// Retrieve a single warrant by ID
async function getWarrantByNoandSeason(req, res) {
    const { outturnNo } = req.params;
    const { seasonID } = req.params;
    const { gradeID  } = req.params;
    try {
        const [rows] = await pool.query('SELECT cs.Year, g.OutturnNo, wc.WarrantNo, m.MaterialName as Grade, g.Weight as GrnWeight, g.OutturnBulkID, wc.WarrantedWeight, wc.Bags as WBags , wc.Pkts as WPkts , g.MaClass class FROM warranted_coffee wc JOIN grn_outturns g ON wc.grnOutturnID = g.grnOutturnID JOIN coffeeseason cs ON g.SeasonID = cs.SeasonID JOIN material m on m.MaterialID = g.GradeID WHERE g.OutturnNo = ?  and cs.SeasonID = ?  AND g.GradeID = ?' , [outturnNo,seasonID,gradeID]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Warrant not found or grade is in a bulk' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching warrant:', error);
        res.status(500).json({ message: `Error fetching warrant: ${error.message}` });
    }
}

// Retrieve warrants by GRN Outturn ID
async function getWarrantsByGRNOutturnId(req, res) {
    const { grnOutturnID } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM warranted_coffee WHERE grnOutturnID = ?', [grnOutturnID]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No warrants found for the given GRN outturn' });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching warrants by GRN outturn:', error);
        res.status(500).json({ message: `Error fetching warrant: ${error.message}` });
    }
}

// Create a new warrant
async function createWarrant(req, res) {
    const warrantData = req.body;
    try {
        const [result] = await pool.query('INSERT INTO warranted_coffee SET ?', [warrantData]);
        res.status(201).json({ message: 'Warrant created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating warrant:', error);
        res.status(500).json({ message: `Error creating warrant: ${error.message}` });
    }
}


// Update an existing warrant
async function updateWarrant(req, res) {
    const { id } = req.params;
    const warrantData = req.body;
    try {
        const [result] = await pool.query('UPDATE warranted_coffee SET ? WHERE WarrantID = ?', [warrantData, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Warrant not found' });
        }
        res.status(200).json({ message: 'Warrant updated successfully' });
    } catch (error) {
        console.error('Error updating warrant:', error);
        res.status(500).json({ message: `Error updating warrant: ${error.message}` });
    }
}

// Delete an existing warrant
async function deleteWarrant(req, res) {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM warranted_coffee WHERE WarrantID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Warrant not found' });
        }
        res.status(200).json({ message: 'Warrant deleted successfully' });
    } catch (error) {
        console.error('Error deleting warrant:', error);
        res.status(500).json({ message: `Error deleting warrant: ${error.message}` });
    }
}

module.exports = {
    getAllWarrants,
    getWarrantById,
    getWarrantsByGRNOutturnId,
    createWarrant,
    updateWarrant,
    deleteWarrant,
    getWarrantByNoandSeason
};