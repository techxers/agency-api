const pool = require('./connection'); // Import the database connection pool

// Create a new grower
async function createGrower(req, res) {
  const {
    GrowerName,
    OrganisationName,
    GrowerCode,
    GrowerMark,
    GrowerPin,
    GrowerEmail,
    GrowerMobile,
    GrowerPostalAdress,
    GrowerLandline,
    GrowerVATnumber,
    GrowerPhysicalAdress,
    DateRegistered,
    SubCountyId,
    IsActive,
    GrowerTypeId,
    AppTransactionId,
    GrowerPostalTown,
    CountyID,
    RegionID,
    CountryID,
    BulkMyCoffee,
    GrowerPostCode,
    FactoryID,
    MgtCommision,
    Cert,
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO grower (
        GrowerName, 
        OrganisationName, 
        GrowerCode, 
        GrowerMark, 
        GrowerPin, 
        GrowerEmail, 
        GrowerMobile, 
        GrowerPostalAdress, 
        GrowerLandline, 
        GrowerVATnumber, 
        GrowerPhysicalAdress, 
        DateRegistered, 
        SubCountyId, 
        IsActive, 
        GrowerTypeId, 
        AppTransactionId, 
        GrowerPostalTown, 
        CountyID, 
        RegionID, 
        CountryID, 
        BulkMyCoffee, 
        GrowerPostCode, 
        FactoryID, 
        MgtCommision, 
        Cert
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        GrowerName,
        OrganisationName,
        GrowerCode,
        GrowerMark,
        GrowerPin,
        GrowerEmail,
        GrowerMobile,
        GrowerPostalAdress,
        GrowerLandline,
        GrowerVATnumber,
        GrowerPhysicalAdress,
        DateRegistered,
        SubCountyId,
        IsActive,
        GrowerTypeId,
        AppTransactionId,
        GrowerPostalTown,
        CountyID,
        RegionID,
        CountryID,
        BulkMyCoffee,
        GrowerPostCode,
        FactoryID,
        MgtCommision,
        Cert,
      ]
    );

    res.status(201).json({ message: 'Grower created successfully', GrowerId: result.insertId });
  } catch (error) {
    console.error('Error creating grower:', err);
    res.status(500).json({ message: 'Error creating grower' });
  }
}

// Get all growers
async function getAllGrowers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM grower LIMIT 100');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching growers:', err);
    res.status(500).json({ message: 'Error fetching growers' });
  }
}

// Get a grower by ID
async function getGrowerById(req, res) {
  const growerId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM grower WHERE GrowerId = ?', [growerId]);
    if (rows.length === 0) {
      res.status(404).json({ message: 'Grower not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching grower:', err);
    res.status(500).json({ message: 'Error fetching grower' });
  }
}

// Update a grower by ID
async function updateGrower(req, res) {
  const growerId = req.params.id;
  const {
    GrowerName,
    OrganisationName,
    GrowerCode,
    GrowerMark,
    GrowerPin,
    GrowerEmail,
    GrowerMobile,
    GrowerPostalAdress,
    GrowerLandline,
    GrowerVATnumber,
    GrowerPhysicalAdress,
    DateRegistered,
    SubCountyId,
    IsActive,
    GrowerTypeId,
    AppTransactionId,
    GrowerPostalTown,
    CountyID,
    RegionID,
    CountryID,
    BulkMyCoffee,
    GrowerPostCode,
    FactoryID,
    MgtCommision,
    Cert,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE grower 
      SET 
        GrowerName = ?, 
        OrganisationName = ?, 
        GrowerCode = ?, 
        GrowerMark = ?, 
        GrowerPin = ?, 
        GrowerEmail = ?, 
        GrowerMobile = ?, 
        GrowerPostalAdress = ?, 
        GrowerLandline = ?, 
        GrowerVATnumber = ?, 
        GrowerPhysicalAdress = ?, 
        DateRegistered = ?, 
        SubCountyId = ?, 
        IsActive = ?, 
        GrowerTypeId = ?, 
        AppTransactionId = ?, 
        GrowerPostalTown = ?, 
        CountyID, 
        RegionID, 
        CountryID, 
        BulkMyCoffee, 
        GrowerPostCode, 
        FactoryID, 
        MgtCommision, 
        Cert 
      WHERE GrowerId = ?`,
      [
        GrowerName,
        OrganisationName,
        GrowerCode,
        GrowerMark,
        GrowerPin,
        GrowerEmail,
        GrowerMobile,
        GrowerPostalAdress,
        GrowerLandline,
        GrowerVATnumber,
        GrowerPhysicalAdress,
        DateRegistered,
        SubCountyId,
        IsActive,
        GrowerTypeId,
        AppTransactionId,
        GrowerPostalTown,
        CountyID,
        RegionID,
        CountryID,
        BulkMyCoffee,
        GrowerPostCode,
        FactoryID,
        MgtCommision,
        Cert,
        growerId,
      ]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Grower not found' });
    } else {
      res.status(200).json({ message: 'Grower updated successfully' });
    }
  } catch (error) {
    console.error('Error updating grower:', err);
    res.status(500).json({ message: 'Error updating grower' });
  }
}

// Delete a grower by ID
async function deleteGrower(req, res) {
  const growerId = req.params.id;

  try {
    const [result] = await pool.query('DELETE FROM grower WHERE GrowerId = ?', [growerId]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Grower not found' });
    } else {
      res.status(204).json({ message: 'Grower deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting grower:', err);
    res.status(500).json({ message: 'Error deleting grower' });
  }
}

module.exports = {
  createGrower,
  getAllGrowers,
  getGrowerById,
  updateGrower,
  deleteGrower,
};
