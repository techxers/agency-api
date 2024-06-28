const pool = require('./connection');

// Get all outturn grades
async function getAllOutturnGrades(req, res) {
  try {

    const [rows] = await pool.query('SELECT * FROM outturngrades LIMIT 100');
    res.status(200).json(rows);

  } catch (error) {
    console.error('Error fetching grades:', err);
    res.status(500).json({ message: 'Error fetching outturn grades' });
  }

}

// Get an outturn grade by ID
async function getOutturnGradeById(req, res) {
  const { id } = req.params;
  try {
    console.log(`-------------STARTSTART----------`);

    const [rows] = await pool.query('SELECT * FROM outturngrades WHERE OutturnGradesID = ?', [id]);
    
    if (rows.length === 0) {
      console.log(`-------------Length == 0----------`);

      res.status(404).send('Outturn grade not found');
    } else {
      res.status(200).json(rows[0]);
    }
    console.log(`-------------END----------`);

  } catch (error) {
    res.status(500).send(error);
    console.log(`-------------CATCH----------`);

  }
}

// Create a new outturn grade
async function createOutturnGrade(req, res) {
  const newOutturnGrade = req.body;
  try {
    const [rows] = await pool.query('INSERT INTO outturngrades SET ?', newOutturnGrade);
    
    res.status(201).json({ OutturnGradesID: rows.insertId });
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update an outturn grade by ID
async function updateOutturnGrade(req, res) {
  const { id } = req.params;
  const updatedOutturnGrade = req.body;
  try {
    const [rows] = await pool.query('UPDATE outturngrades SET ? WHERE OutturnGradesID = ?', [updatedOutturnGrade, id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn grade not found');
    } else {
      res.send('Outturn grade updated successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete an outturn grade by ID
async function deleteOutturnGrade(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('DELETE FROM outturngrades WHERE OutturnGradesID = ?', [id]);
    
    if (rows.affectedRows === 0) {
      res.status(404).send('Outturn grade not found');
    } else {
      res.send('Outturn grade deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllOutturnGrades,
  getOutturnGradeById,
  createOutturnGrade,
  updateOutturnGrade,
  deleteOutturnGrade
};
