const express = require('express');
const router = express.Router();
const { addAgent, getAgents } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add', protect, addAgent);
router.get('/all', protect, getAgents);

module.exports = router;