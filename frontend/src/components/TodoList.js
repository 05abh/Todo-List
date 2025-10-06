import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="no-todos">
        <h3>📝 Your Todo List</h3>
        <p>No todos yet. Add one to get started!</p>
        <div className="encryption-notice">
          <small>🔒 Your todos are securely encrypted and stored</small>
        </div>
      </div>
    );
  }

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list-container">
      <h3>📝 Your Secure Todo List</h3>
      
      {pendingTodos.length > 0 && (
        <div className="todo-section">
          <h4>Pending ({pendingTodos.length})</h4>
          <div className="todos-grid">
            {pendingTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={onUpdateTodo}
                onDelete={onDeleteTodo}
              />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h4>Completed ({completedTodos.length})</h4>
          <div className="todos-grid">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={onUpdateTodo}
                onDelete={onDeleteTodo}
              />
            ))}
          </div>
        </div>
      )}

      <div className="security-footer">
        <small>🔐 All data is securely transmitted and stored</small>
      </div>
    </div>
  );
};

export default TodoList;