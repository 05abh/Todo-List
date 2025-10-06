const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add logging to see when data is saved
todoSchema.post('save', function(doc) {
  console.log('💾 Todo saved to MongoDB:', {
    id: doc._id,
    title: doc.title,
    database: mongoose.connection.name,
    collection: 'todos'
  });
});

module.exports = mongoose.model('Todo', todoSchema);