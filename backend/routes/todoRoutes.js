const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - Get all todos for authenticated user
router.get('/', async (req, res) => {
  try {
    // For now, we'll use a mock user ID since auth isn't fully set up
    const mockUserId = '65a1b2c3d4e5f67890123456';
    
    const todos = await Todo.find({ user: mockUserId }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todos from database'
    });
  }
});

// POST /api/todos - Create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    // Mock user ID for now
    const mockUserId = '65a1b2c3d4e5f67890123456';

    const todo = new Todo({
      title,
      description: description || '',
      completed: false,
      deadline: deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      priority: priority || 'medium',
      user: mockUserId
    });

    const savedTodo = await todo.save();
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully in MongoDB',
      data: savedTodo
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating todo in database'
    });
  }
});

// PUT /api/todos/:id - Update todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, deadline, priority } = req.body;
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { 
        title, 
        description, 
        completed, 
        deadline, 
        priority,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found in database'
      });
    }

    res.json({
      success: true,
      message: 'Todo updated successfully in MongoDB',
      data: updatedTodo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating todo in database'
    });
  }
});

// DELETE /api/todos/:id - Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found in database'
      });
    }

    res.json({
      success: true,
      message: 'Todo deleted successfully from MongoDB',
      data: deletedTodo
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting todo from database'
    });
  }
});

module.exports = router;