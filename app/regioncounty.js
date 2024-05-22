const pool = require('./connection');

// Get all region counties
const getAllRegionCounties = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM regioncounty');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a region county by CountyID and RegionID
const getRegionCountyById = async (req, res) => {
  const { countyId, regionId } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM regioncounty WHERE CountyID = ? AND RegionID = ?', [countyId, regionId]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Region county not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new region county
const createRegionCounty = async (req, res) => {
  const { countyId, regionId } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO regioncounty (CountyID, RegionID) VALUES (?, ?)', [countyId, regionId]);
    await connection.end();
    res.status(201).json({ CountyID: countyId, RegionID: regionId });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a region county by CountyID and RegionID
const deleteRegionCounty = async (req, res) => {
  const { countyId, regionId } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM regioncounty WHERE CountyID = ? AND RegionID = ?', [countyId, regionId]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Region county not found');
    } else {
      res.send('Region county deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllRegionCounties,
  getRegionCountyById,
  createRegionCounty,
  deleteRegionCounty,
};
