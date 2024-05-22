const pool = require('./connection');

// Get all outturn grades
async function getAllOutturnGrades(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM outturngrades');
    await connection.end();
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Get an outturn grade by ID
async function getOutturnGradeById(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('SELECT * FROM outturngrades WHERE OutturnGradesID = ?', [id]);
    await connection.end();
    if (results.length === 0) {
      res.status(404).send('Outturn grade not found');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Create a new outturn grade
async function createOutturnGrade(req, res) {
  const newOutturnGrade = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('INSERT INTO outturngrades SET ?', newOutturnGrade);
    await connection.end();
    res.status(201).json({ OutturnGradesID: results.insertId });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Update an outturn grade by ID
async function updateOutturnGrade(req, res) {
  const { id } = req.params;
  const updatedOutturnGrade = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('UPDATE outturngrades SET ? WHERE OutturnGradesID = ?', [updatedOutturnGrade, id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Outturn grade not found');
    } else {
      res.send('Outturn grade updated successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete an outturn grade by ID
async function deleteOutturnGrade(req, res) {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute('DELETE FROM outturngrades WHERE OutturnGradesID = ?', [id]);
    await connection.end();
    if (results.affectedRows === 0) {
      res.status(404).send('Outturn grade not found');
    } else {
      res.send('Outturn grade deleted successfully');
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getAllOutturnGrades,
  getOutturnGradeById,
  createOutturnGrade,
  updateOutturnGrade,
  deleteOutturnGrade
};
