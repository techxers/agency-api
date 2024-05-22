// growerreturns.js

const pool = require('./connection');

// Get all grower returns
exports.getAllGrowerReturns = (req, res) => {
  pool.query('SELECT * FROM growerreturns', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// Get a grower return by ID
exports.getGrowerReturnById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM growerreturns WHERE GrowerReturnID = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send('Grower return not found');
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

// Create a new grower return
exports.createGrowerReturn = (req, res) => {
  const { CoffeeTypeID, OutturnMark, AuctionSaleId, SeasonID, SocietyID, GrowerId, ...data } = req.body;

  pool.query(
    'INSERT INTO growerreturns (CoffeeTypeID, OutturnMark, AuctionSaleId, SeasonID, SocietyID, GrowerId, data) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [CoffeeTypeID, OutturnMark, AuctionSaleId, SeasonID, SocietyID, GrowerId, data],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// Update a grower return by ID
exports.updateGrowerReturn = (req, res) => {
  const id = parseInt(req.params.id);
  const { CoffeeTypeID, OutturnMark, AuctionSaleId, SeasonID, SocietyID, GrowerId, ...data } = req.body;

  pool.query(
    'UPDATE growerreturns SET CoffeeTypeID = $1, OutturnMark = $2, AuctionSaleId = $3, SeasonID = $4, SocietyID = $5, GrowerId = $6, data = $7 WHERE GrowerReturnID = $8 RETURNING *',
    [CoffeeTypeID, OutturnMark, AuctionSaleId, SeasonID, SocietyID, GrowerId, data, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        res.status(404).send('Grower return not found');
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
};

// Delete a grower return by ID
exports.deleteGrowerReturn = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM growerreturns WHERE GrowerReturnID = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rowCount === 0) {
      res.status(404).send('Grower return not found');
    } else {
      res.status(200).send('Grower return deleted successfully');
    }
  });
};
