const fs = require('fs');
const csv = require('csv-parser');
const Task = require('../models/Task');
const Agent = require('../models/Agent');

exports.uploadTasks = async (req, res) => {
  const results = [];
  const expectedHeaders = ['FirstName', 'Phone', 'Notes'];

  try {
    const stream = fs.createReadStream(req.file.path).pipe(csv());

    let validated = false;

    stream.on('headers', (headers) => {
      validated = expectedHeaders.every(h => headers.includes(h));
      if (!validated) {
        stream.destroy();
        return res.status(400).json({
          message: 'Invalid CSV format. Expected headers: FirstName, Phone, Notes'
        });
      }
    });

    stream.on('data', (data) => {
      if (validated) {
        results.push({
          firstName: data.FirstName,
          phone: data.Phone,
          notes: data.Notes
        });
      }
    });

    stream.on('end', async () => {
      if (!validated) return;

      const agents = await Agent.find().limit(5);
      if (agents.length < 1) {
        return res.status(400).json({ message: 'No agents available for distribution' });
      }

      const distributedTasks = [];
      let agentIndex = 0;

      results.forEach((task) => {
        const assignedAgent = agents[agentIndex];
        distributedTasks.push({
          firstName: task.firstName,
          phone: task.phone,
          notes: task.notes,
          agentId: assignedAgent._id
        });

        agentIndex = (agentIndex + 1) % agents.length;
      });

      await Task.insertMany(distributedTasks);

      res.status(201).json({
        message: 'Tasks distributed and uploaded successfully',
        count: distributedTasks.length
      });
    });

  } catch (err) {
    res.status(500).json({
      message: 'Upload failed',
      error: err.message
    });
  }
};