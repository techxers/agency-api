const pool = require('./connection'); // Assume pool is a MySQL connection pool

// Fetch all auctions
exports.getAllAuctions = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM auctionsale');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching auctions:', err);
    res.status(500).send('Error retrieving auctions');
  }
};

// Create a new auction
exports.createAuction = async (req, res) => {
  const {
    SaleDate,
    SaleNumber,
    SaleDescription,
    IsOpen,
    PromptDate,
    SeasonID,
    Weight,
    TotalLots,
    Remarks,
  } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO auctionsale (SaleDate, SaleNumber, SaleDescription, IsOpen, PromptDate, SeasonID, Weight, TotalLots, Remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [SaleDate, SaleNumber, SaleDescription, IsOpen, PromptDate, SeasonID, Weight, TotalLots, Remarks]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error creating auction:', err);
    res.status(500).send('Error creating auction');
  }
};

// Fetch a specific auction by ID
exports.getAuctionById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM auctionsale WHERE AuctionSaleId = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Auction not found');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching auction:', err);
    res.status(500).send('Error retrieving auction');
  }
};

// Update a specific auction by ID
exports.updateAuction = async (req, res) => {
  const id = req.params.id;
  const {
    SaleDate,
    SaleNumber,
    SaleDescription,
    IsOpen,
    PromptDate,
    SeasonID,
    Weight,
    TotalLots,
    Remarks,
  } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE auctionsale SET SaleDate = ?, SaleNumber = ?, SaleDescription = ?, IsOpen = ?, PromptDate = ?, SeasonID = ?, Weight = ?, TotalLots = ?, Remarks = ? WHERE AuctionSaleId = ?',
      [SaleDate, SaleNumber, SaleDescription, IsOpen, PromptDate, SeasonID, Weight, TotalLots, Remarks, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send('Auction not found');
    }
    res.status(200).json({ message: 'Auction updated' });
  } catch (error) {
    console.error('Error updating auction:', err);
    res.status(500).send('Error updating auction');
  }
};

// Delete a specific auction by ID
exports.deleteAuction = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query('DELETE FROM auctionsale WHERE AuctionSaleId = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send('Auction not found');
    }
    res.status(200).json({ message: 'Auction deleted' });
  } catch (error) {
    console.error('Error deleting auction:', err);
    res.status(500).send('Error deleting auction');
  }
};
