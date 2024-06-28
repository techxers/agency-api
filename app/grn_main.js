// grn_main.js
const pool = require('./connection');

// Get all GRN mains
exports.getAllGRNMain = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM grn_main');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching GRN mains:', err);
    res.status(500).json({ message: 'Error fetching GRN mains' });
  }
};

// Get a single GRN main by ID
exports.getGRNMainById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM grn_main WHERE grnID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'GRN main not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching GRN main:', err);
    res.status(500).json({ message: 'Error fetching GRN main' });
  }
};

// Create a new GRN main
exports.createGRNMain = async (req, res) => {
  const {
    documentSerial,
    DeliveryDate,
    VehiclePlate,
    GrossWeight,
    PermitNo,
    TareWeight,
    grnNo,
    WeighBridgeNo,
    DriverName,
    DriverIDNo,
    SeasonID,
    WarehouseID,
    GrowerID,
    SupervisorID,
    WHManager,
    MillerID,
    Remarks,
    GrowerWeight,
    WarrantNo,
    NetWeight,
    CoffeeTypeId,
    RequiresStandardization,
    standardized
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO grn_main 
      (documentSerial, DeliveryDate, VehiclePlate, GrossWeight, PermitNo, TareWeight, grnNo, WeighBridgeNo, 
      DriverName, DriverIDNo, SeasonID, WarehouseID, GrowerID, SupervisorID, WHManager, MillerID, Remarks, 
      GrowerWeight, WarrantNo, NetWeight, CoffeeTypeId, RequiresStandardization, standardized) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        documentSerial,
        DeliveryDate,
        VehiclePlate,
        GrossWeight,
        PermitNo,
        TareWeight,
        grnNo,
        WeighBridgeNo,
        DriverName,
        DriverIDNo,
        SeasonID,
        WarehouseID,
        GrowerID,
        SupervisorID,
        WHManager,
        MillerID,
        Remarks,
        GrowerWeight,
        WarrantNo,
        NetWeight,
        CoffeeTypeId,
        RequiresStandardization,
        standardized
      ]
    );
    res.status(201).json({ id: result.insertId, message: 'GRN main created' });
  } catch (error) {
    console.error('Error creating GRN main:', err);
    res.status(500).json({ message: 'Error creating GRN main' });
  }
};

// Update an existing GRN main
exports.updateGRNMain = async (req, res) => {
  const { id } = req.params;
  const {
    documentSerial,
    DeliveryDate,
    VehiclePlate,
    GrossWeight,
    PermitNo,
    TareWeight,
    grnNo,
    WeighBridgeNo,
    DriverName,
    DriverIDNo,
    SeasonID,
    WarehouseID,
    GrowerID,
    SupervisorID,
    WHManager,
    MillerID,
    Remarks,
    GrowerWeight,
    WarrantNo,
    NetWeight,
    CoffeeTypeId,
    RequiresStandardization,
    standardized
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE grn_main SET documentSerial = ?, DeliveryDate = ?, VehiclePlate = ?, GrossWeight = ?, PermitNo = ?, 
      TareWeight = ?, grnNo = ?, WeighBridgeNo = ?, DriverName = ?, DriverIDNo = ?, SeasonID = ?, WarehouseID = ?, 
      GrowerID = ?, SupervisorID = ?, WHManager = ?, MillerID = ?, Remarks = ?, GrowerWeight = ?, WarrantNo = ?, 
      NetWeight = ?, CoffeeTypeId = ?, RequiresStandardization = ?, standardized = ? WHERE grnID = ?`,
      [
        documentSerial,
        DeliveryDate,
        VehiclePlate,
        GrossWeight,
        PermitNo,
        TareWeight,
        grnNo,
        WeighBridgeNo,
        DriverName,
        DriverIDNo,
        SeasonID,
        WarehouseID,
        GrowerID,
        SupervisorID,
        WHManager,
        MillerID,
        Remarks,
        GrowerWeight,
        WarrantNo,
        NetWeight,
        CoffeeTypeId,
        RequiresStandardization,
        standardized,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'GRN main not found' });
    }

    res.json({ message: 'GRN main updated' });
  } catch (error) {
    console.error('Error updating GRN main:', err);
    res.status(500).json({ message: 'Error updating GRN main' });
  }
};

// Delete a GRN main
exports.deleteGRNMain = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM grn_main WHERE grnID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'GRN main not found' });
    }

    res.json({ message: 'GRN main deleted' });
  } catch (error) {
    console.error('Error deleting GRN main:', err);
    res.status(500).json({ message: 'Error deleting GRN main' });
  }
};
