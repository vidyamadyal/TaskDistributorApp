const mongoose = require('mongoose');
const Agent = require('./models/Agent');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/agentTaskDB');

const agents = [
  { name: 'Agent A', email: 'a@demo.com', mobile: '+91-9000000001', password: 'pass123' },
  { name: 'Agent B', email: 'b@demo.com', mobile: '+91-9000000002', password: 'pass123' },
  { name: 'Agent C', email: 'c@demo.com', mobile: '+91-9000000003', password: 'pass123' },
  { name: 'Agent D', email: 'd@demo.com', mobile: '+91-9000000004', password: 'pass123' },
  { name: 'Agent E', email: 'e@demo.com', mobile: '+91-9000000005', password: 'pass123' }
];

(async () => {
  await Agent.deleteMany();
  for (let agent of agents) {
    const hashed = await bcrypt.hash(agent.password, 10);
    await Agent.create({ ...agent, password: hashed });
  }
  console.log('Agents seeded');
  mongoose.disconnect();
})();