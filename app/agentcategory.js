// agentcategory.js
const pool = require('./connection');
// Get all agent categories
async function getAllAgentCategories(req, res) {
  try {
    const [agentCategories] = await pool.query('SELECT * FROM agentcategory');
    res.status(200).json(agentCategories);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Get a single agent category by ID
async function getAgentCategoryById(req, res) {
  const { id } = req.params;
  try {
    const [agentCategory] = await pool.query('SELECT * FROM agentcategory WHERE AgentCategoryId = ?', [id]);
    if (agentCategory.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent category not found',
      });
    }
    res.status(200).json(agentCategory[0]);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Create a new agent category
async function createAgentCategory(req, res) {
  const { AgentCategoryName, Remarks } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO agentcategory (AgentCategoryName, Remarks) VALUES (?, ?)',
      [AgentCategoryName, Remarks]
    );
    const insertedAgentCategory = {
      AgentCategoryId: result.insertId,
      AgentCategoryName,
      Remarks,
    };
    res.status(201).json({
      message: 'Agent category created successfully',
      agentCategory: insertedAgentCategory,
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Update an agent category by ID
async function updateAgentCategory(req, res) {
  const { id } = req.params;
  const { AgentCategoryName, Remarks } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE agentcategory SET AgentCategoryName = ?, Remarks = ? WHERE AgentCategoryId = ?',
      [AgentCategoryName, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent category not found',
      });
    }

    res.status(200).json({
      message: 'Agent category updated successfully',
      agentCategory: {
        AgentCategoryId: id,
        AgentCategoryName,
        Remarks,
      },
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Delete an agent category by ID
async function deleteAgentCategory(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM agentcategory WHERE AgentCategoryId = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent category not found',
      });
    }

    res.status(200).json({
      message: 'Agent category deleted successfully',
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

module.exports = {
    getAllAgentCategories,
    getAgentCategoryById,
    createAgentCategory,
    updateAgentCategory,
    deleteAgentCategory,
  };
  