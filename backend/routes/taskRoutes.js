const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// File filter to allow only .csv, .xlsx, .xls
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.csv', '.xlsx', '.xls'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV, XLSX, and XLS files are allowed'), false);
  }
};

const upload = multer({
  dest: 'uploads/',
  fileFilter
});

// ✅ Upload and distribute tasks
router.post('/upload', protect, upload.single('file'), uploadTasks);

// ✅ View tasks by agent
router.get('/by-agent/:agentId', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ agentId: req.params.agentId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
});

module.exports = router;