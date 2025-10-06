import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { todoAPI, authAPI, securityUtils } from './services/api';
import './App.css';

function App() {
  const { user, login, logout, isAuthenticated } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // Fetch todos when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await todoAPI.getTodos();
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('SECURITY BREACH DETECTED: Failed to load todos');
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      setError('');
      // Sanitize input
      const sanitizedData = {
        title: securityUtils.sanitizeInput(todoData.title),
        description: securityUtils.sanitizeInput(todoData.description),
        deadline: todoData.deadline,
        priority: todoData.priority
      };

      const response = await todoAPI.createTodo(sanitizedData);
      setTodos([response.data.data, ...todos]);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('SYSTEM ERROR: Failed to add todo');
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      setError('');
      const response = await todoAPI.updateTodo(id, updates);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data.data : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('SYSTEM ERROR: Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError('');
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('SYSTEM ERROR: Failed to delete todo');
    }
  };

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="auth-container">
          <header className="auth-header">
            <h1>🔐 CYBER-TODO</h1>
            <p>Secure Task Management System</p>
          </header>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onSwitchToRegister={() => setShowRegister(true)} />
          )}

          <div className="security-features">
            <h3>🛡️ SECURITY PROTOCOLS ACTIVE</h3>
            <div className="security-grid">
              <div className="security-item">
                <span>ENCRYPTED AUTHENTICATION</span>
              </div>
              <div className="security-item">
                <span>JWT TOKEN SECURITY</span>
              </div>
              <div className="security-item">
                <span>INPUT SANITIZATION</span>
              </div>
              <div className="security-item">
                <span>XSS PROTECTION</span>
              </div>
              <div className="security-item">
                <span>RATE LIMITING</span>
              </div>
              <div className="security-item">
                <span>CORS PROTECTION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show main app if authenticated
  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <h1>🚀 CYBER-TODO</h1>
            <p>Welcome, <span className="cyber-text">{user?.username}</span>! System secure.</p>
          </div>
          <div className="user-section">
            <span className="user-info">📍 {user?.email}</span>
            <button onClick={logout} className="logout-btn">
              LOGOUT
            </button>
          </div>
        </header>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="app-content">
          <div className="form-section">
            <TodoForm onSubmit={addTodo} />
          </div>

          <div className="list-section">
            {loading ? (
              <div className="loading">
                <div className="pulse">🔄 LOADING SECURE TASKS...</div>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onUpdateTodo={updateTodo}
                onDeleteTodo={deleteTodo}
              />
            )}
          </div>
        </div>

        <div className="security-status">
          <h4>🛡️ SYSTEM SECURITY STATUS</h4>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-indicator secure">●</span>
              <span>AUTHENTICATION: ACTIVE</span>
            </div>
            <div className="status-item">
              <span className="status-indicator secure">●</span>
              <span>DATA ENCRYPTION: ENABLED</span>
            </div>
            <div className="status-item">
              <span className="status-indicator secure">●</span>
              <span>INPUT VALIDATION: ACTIVE</span>
            </div>
            <div className="status-item">
              <span className="status-indicator secure">●</span>
              <span>SESSION: SECURE</span>
            </div>
            <div className="status-item">
              <span className="status-indicator secure">●</span>
              <span>FIREWALL: ACTIVE</span>
            </div>
            <div className="status-item">
              <span className="status-indicator secure">●</span>
              <span>THREAT DETECTION: ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;