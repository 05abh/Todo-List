import React, { useState } from 'react';
import { securityUtils } from '../services/api';

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: securityUtils.sanitizeInput(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    // Set default deadline to 7 days from now if not provided
    const todoData = {
      ...formData,
      deadline: formData.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    onSubmit(todoData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      deadline: ''
    });
  };

  return (
    <div className="todo-form-container">
      <h3>➕ Add New Todo</h3>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="200"
            placeholder="What needs to be done?"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            maxLength="1000"
            placeholder="Add details (optional)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Secure Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;