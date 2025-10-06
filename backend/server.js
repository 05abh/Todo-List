const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', require('./routes/todoRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Todo API is running with MongoDB!',
    database: 'MongoDB Connected',
    timestamp: new Date().toISOString()
  });
});

// Database status route
app.get('/api/db-status', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const Todo = require('./models/Todo');
    
    const db = mongoose.connection.db;
    const dbStats = await db.stats();
    const todosCount = await Todo.countDocuments();
    
    res.json({
      success: true,
      database: {
        name: db.databaseName,
        collections: dbStats.collections,
        objects: dbStats.objects,
        dataSize: `${(dbStats.dataSize / 1024 / 1024).toFixed(2)} MB`
      },
      todos: {
        count: todosCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking database status'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}`);
  console.log(`🗄️ Database: ${process.env.MONGODB_URI}`);
});