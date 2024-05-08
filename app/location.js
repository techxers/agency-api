const pool = require('./connection'); // MySQL database connection
const { check, validationResult } = require('express-validator'); // Importing express-validator


// CRUD operations for country
// GET all countries
async function getAllCountries(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM country');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching countries:', err);
    res.status(500).json({ message: 'Error fetching countries' });
  }
}

// GET country by ID
async function getCountryById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM country WHERE CountryID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching country:', err);
    res.status(500).json({ message: 'Error fetching country' });
  }
}

// POST create a new country
async function createCountry(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { CountryName, Code, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO country (CountryName, Code, Remarks) VALUES (?, ?, ?)',
      [CountryName, Code, Remarks]
    );

    res.status(201).json({ message: 'Country created', CountryID: result.insertId });
  } catch (err) {
    console.error('Error creating country:', err);
    res.status(500).json({ message: 'Error creating country' });
  }
}

// PUT update a country by ID
async function updateCountry(req, res) {
  const { id } = req.params;
  const { CountryName, Code, Remarks } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.query(
      'UPDATE country SET CountryName = ?, Code = ?, Remarks = ? WHERE CountryID = ?',
      [CountryName, Code, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json({ message: 'Country updated' });
  } catch (err) {
    console.error('Error updating country:', err);
    res.status(500).json({ message: 'Error updating country' });
  }
}

// DELETE a country by ID
async function deleteCountry(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM country WHERE CountryID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json({ message: 'Country deleted' });
  } catch (err) {
    console.error('Error deleting country:', err);
    res.status(500).json({ message: 'Error deleting country' });
  }
}

// CRUD operations for county
// GET all counties
async function getAllCounties(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM county');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching counties:', err);
    res.status(500).json({ message: 'Error fetching counties' });
  }
}

// GET county by ID
async function getCountyById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM county WHERE CountyID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'County not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching county:', err);
    res.status(500).json({ message: 'Error fetching county' });
  }
}

// POST create a new county
async function createCounty(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { CountyName, CountryID, RegionID, Remarks } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO county (CountyName, CountryID, RegionID, Remarks) VALUES (?, ?, ?, ?)',
      [CountyName, CountryID, RegionID, Remarks]
    );

    res.status(201).json({ message: 'County created', CountyID: result.insertId });
  } catch (err) {
    console.error('Error creating county:', err);
    res.status(500).json({ message: 'Error creating county' });
  }
}

// PUT update a county by ID
async function updateCounty(req, res) {
  const { id } = req.params;
  const { CountyName, CountryID, RegionID, Remarks } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.query(
      'UPDATE county SET CountyName = ?, CountryID = ?, RegionID = ?, Remarks = ? WHERE CountyID = ?',
      [CountyName, CountryID, RegionID, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'County not found' });
    }

    res.status(200).json({ message: 'County updated' });
  } catch (err) {
    console.error('Error updating county:', err);
    res.status(500).json({ message: 'Error updating county' });
  }
}

// DELETE a county by ID
async function deleteCounty(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM county WHERE CountyID = ?', [id]);
  //  if the result.affectedRows are 0, then return a status 404 because the county does not exist. Otherwise, delete the county and return a status 200.
  if (result.affectedRows === 0) {
    return res.status(200).json({ message: 'Succes deleting county' });
  }
  } catch (error) {
    console.error('Error deleting county:', error);
    res.status(500).json({ message: 'Error deleting county' });
  }
}

// Export CRUD functions
module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
  getAllCounties,
  getCountyById,
  createCounty,
  updateCounty,
  deleteCounty,
};
