// Load environment variables first
const dotenv = require('dotenv');
dotenv.config();

// Debug logs
console.log('Starting server...');
console.log('MONGO_URI:', process.env.MONGO_URI);

// Core dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/admin', authRoutes);
const agentRoutes = require('./routes/agentRoutes');
app.use('/api/agents', agentRoutes);
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Test route
app.get('/', (req, res) => res.send('API is running...'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));