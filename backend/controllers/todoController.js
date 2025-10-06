const Todo = require('../models/Todo');
const { preventXSS, hasSQLInjection } = require('../utils/security');

// Get all todos for authenticated user
const getTodos = async (req, res) => {
  try {
    // Prevent NoSQL injection
    const userId = req.user.id;
    
    const todos = await Todo.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'username email');
    
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos'
    });
  }
};

// Create new todo with input sanitization
const createTodo = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    
    // Sanitize input
    const sanitizedTitle = preventXSS(title);
    const sanitizedDescription = preventXSS(description);
    
    // Check for SQL injection patterns
    if (hasSQLInjection(sanitizedTitle) || hasSQLInjection(sanitizedDescription)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input detected'
      });
    }
    
    const todo = new Todo({
      title: sanitizedTitle,
      description: sanitizedDescription,
      deadline,
      priority,
      user: req.user.id
    });

    const savedTodo = await todo.save();
    await savedTodo.populate('user', 'username email');
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: savedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update todo with ownership check
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, deadline, priority } = req.body;
    
    // Find todo and check ownership
    let todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    // Check if user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo'
      });
    }
    
    // Sanitize input
    const updates = {};
    if (title) updates.title = preventXSS(title);
    if (description) updates.description = preventXSS(description);
    if (completed !== undefined) updates.completed = completed;
    if (deadline) updates.deadline = deadline;
    if (priority) updates.priority = priority;
    
    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).populate('user', 'username email');

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete todo with ownership check
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    
    const todo = await Todo.findById(id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    // Check if user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this todo'
      });
    }
    
    await Todo.findByIdAndDelete(id);
    
    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};