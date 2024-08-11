// agent.js

const pool = require('./connection');
const { validationResult } = require('express-validator');



// Get all agents
async function getAllAgents(req, res) {
  try {
    const [agents] = await pool.query('SELECT * FROM agent');
    res.status(200).json(agents);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Get a single agent by ID
async function getAgentById(req, res) {
  const { id } = req.params;
  try {
    const [agent] = await pool.query('SELECT * FROM agent WHERE AgentId = ?', [id]);
    if (agent.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent not found',
      });
    }
    res.status(200).json(agent[0]);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Get a single agent by Category ID
async function getByCategory(req, res) {
  const { catID } = req.params;
  console.log('Agent Category is :' + catID)
  try {
    const [agent] = await pool.query('SELECT * FROM agent WHERE AgentCategoryId = ?', [catID]);
    if (agent.length === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent not found',
      });
    }
    res.status(200).json(agent);
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Create a new agent
async function createAgent(req, res) {
  const { AgentCategoryId, AgentName, AgentCode, IsActive, Remarks } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO agent (AgentCategoryId, AgentName, AgentCode, IsActive, Remarks) VALUES (?, ?, ?, ?, ?)',
      [AgentCategoryId, AgentName, AgentCode, IsActive ?? 1, Remarks]
    );
    const insertedAgent = {
      AgentId: result.insertId,
      AgentCategoryId,
      AgentName,
      AgentCode,
      IsActive,
      Remarks,
    };
    res.status(201).json({
      message: 'Agent created successfully',
      agent: insertedAgent,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({
        error: 'Conflict',
        message: 'AgentCode already exists',
      });
    } else {
      sqlErrorHandler(err, res);
    }
  }
}

// Update an agent by ID
async function updateAgent(req, res) {
  const { id } = req.params;
  const { AgentCategoryId, AgentName, AgentCode, IsActive, Remarks } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE agent SET AgentCategoryId = ?, AgentName = ?, AgentCode = ?, IsActive = ?, Remarks = ? WHERE AgentId = ?',
      [AgentCategoryId, AgentName, AgentCode, IsActive ?? 1, Remarks, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent not found',
      });
    }

    res.status(200).json({
      message: 'Agent updated successfully',
      agent: {
        AgentId: id,
        AgentCategoryId,
        AgentName,
        AgentCode,
        IsActive,
        Remarks,
      },
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}

// Delete an agent by ID
async function deleteAgent(req, res) {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM agent WHERE AgentId = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Agent not found',
      });
    }

    res.status(200).json({
      message: 'Agent deleted successfully',
    });
  } catch (err) {
    sqlErrorHandler(err, res);
  }
}


module.exports = {
    getAllAgents,
    getAgentById,
    getByCategory,
    createAgent,
    updateAgent,
    deleteAgent
  };
