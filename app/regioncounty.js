const pool = require('./connection');

// Get all region counties
const getAllRegionCounties = async (req, res) => {
  try {
    
    const [rows] = await pool.query('SELECT * FROM regioncounty');
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a region county by CountyID and RegionID
const getRegionCountyById = async (req, res) => {
  const { countyId, regionId } = req.params;
  try {
    
    const [rows] = await pool.query('SELECT * FROM regioncounty WHERE CountyID = ? AND RegionID = ?', [countyId, regionId]);
    
    if (rows.length === 0) {
      res.status(404).send('Region county not found');
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create a new region county
const createRegionCounty = async (req, res) => {
  const { countyId, regionId } = req.body;
  try {
    
    const [rows] = await pool.query('INSERT INTO regioncounty (CountyID, RegionID) VALUES (?, ?)', [countyId, regionId]);
    
    res.status(201).json({ CountyID: countyId, RegionID: regionId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a region county by CountyID and RegionID
const deleteRegionCounty = async (req, res) => {
  const { countyId, regionId } = req.params;
  try {
    
    const [rows] = await pool.query('DELETE FROM regioncounty WHERE CountyID = ? AND RegionID = ?', [countyId, regionId]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Region county not found');
    } else {
      res.send('Region county deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllRegionCounties,
  getRegionCountyById,
  createRegionCounty,
  deleteRegionCounty,
};
