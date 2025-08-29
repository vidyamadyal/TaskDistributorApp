const Agent = require('../models/Agent');

// Add a new agent
exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const agent = await Agent.create({ name, email, mobile, password });
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add agent', error: err.message });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};