const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
});

module.exports = mongoose.model('Task', taskSchema);
