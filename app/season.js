const express = require('express');
const pool = require('./connection'); // Assuming 'connection' provides the MySQL pool
const { validationResult, check } = require('express-validator');

// GET all coffee seasons
async function getAllCoffeeSeasons(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM coffeeseason');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching coffee seasons:', error);
    res.status(500).json({ message: 'Error fetching coffee seasons' });
  }
}

// GET coffee season by ID
async function getCoffeeSeasonById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM coffeeseason WHERE SeasonID = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Coffee season not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching coffee season:', error);
    res.status(500).json({ message: 'Error fetching coffee season' });
  }
}

// POST create a new coffee season
async function createCoffeeSeason(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Year, StartDate, EndDate, Description, IsCurrentSeason } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO coffeeseason (Year, StartDate, EndDate, Description, IsCurrentSeason) VALUES (?, ?, ?, ?, ?)',
      [Year, StartDate, EndDate, Description, IsCurrentSeason]
    );

    res.status(201).json({ message: 'Coffee season created', SeasonID: result.insertId });
  } catch (error) {
    console.error('Error creating coffee season:', error);
    res.status(500).json({ message: 'Error creating coffee season' });
  }
}

// PUT update a coffee season by ID
async function updateCoffeeSeason(req, res) {
  const { id } = req.params;
  const { Year, StartDate, EndDate, Description, IsCurrentSeason } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.query(
      'UPDATE coffeeseason SET Year = ?, StartDate = ?, EndDate = ?, Description = ?, IsCurrentSeason = ? WHERE SeasonID = ?',
      [Year, StartDate, EndDate, Description, IsCurrentSeason, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Coffee season not found' });
    }

    res.status(200).json({ message: 'Coffee season updated' });
  } catch (error) {
    console.error('Error updating coffee season:', error);
    res.status(500).json({ message: 'Error updating coffee season' });
  }
}

// DELETE a coffee season by ID
async function deleteCoffeeSeason(req, res) {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM coffeeseason WHERE SeasonID = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Coffee season not found' });
    }

    res.status(200).json({ message: 'Coffee season deleted' });
  } catch (error) {
    console.error('Error deleting coffee season:', error);
    res.status(500).json({ message: 'Error deleting coffee season' });
  }
}

module.exports = {
  getAllCoffeeSeasons,
  getCoffeeSeasonById,
  createCoffeeSeason,
  updateCoffeeSeason,
  deleteCoffeeSeason,
};
