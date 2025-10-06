import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority
  });

  const handleToggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const isOverdue = () => {
    return new Date(todo.deadline) < new Date() && !todo.completed;
  };

  if (isEditing) {
    return (
      <div className={`todo-item editing ${getPriorityClass(editData.priority)}`}>
        <div className="edit-form">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="edit-input"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="edit-textarea"
            placeholder="Description"
          />
          <select
            value={editData.priority}
            onChange={(e) => setEditData({...editData, priority: e.target.value})}
            className="edit-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${getPriorityClass(todo.priority)} ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h4 onClick={handleToggleComplete} className="todo-title">
            {todo.completed ? '✅' : '⭕'} {todo.title}
          </h4>
          <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
            {todo.priority}
          </span>
        </div>
        
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        
        <div className="todo-meta">
          <span className="deadline">
            📅 {new Date(todo.deadline).toLocaleDateString()}
            {isOverdue() && <span className="overdue-label"> (Overdue)</span>}
          </span>
          <span className="created">
            🕒 {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        {!todo.completed && (
          <button onClick={handleEdit} className="btn edit-btn">
            Edit
          </button>
        )}
        <button 
          onClick={handleToggleComplete}
          className={`btn ${todo.completed ? 'incomplete-btn' : 'complete-btn'}`}
        >
          {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={handleDelete} className="btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;