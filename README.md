cd mern-todo-app/backend
npm run dev

cd mern-todo-app/frontend
npm start


# 🔐 Secure MERN Stack Todo Application

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![Security](https://img.shields.io/badge/Security-Enterprise%20Level-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-22.17.1-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248)

A production-ready Todo application built with the MERN stack featuring **enterprise-level security** implementation and a futuristic cyber-themed UI.

## 🚀 Live Demo

### 🌐 **Application Links**
- **🎨 Frontend Application**: [Live Demo](http://localhost:3000)
- **⚙️ Backend API**: [API Documentation](http://localhost:5001)
- **🗄️ Database**: MongoDB on localhost:27017

### 📱 **Quick Access**
> **💡 Interviewer Tip**: Click the links above to see the running application!

## 🎥 Application Preview

| **Authentication** | **Todo Management** | **Security Dashboard** |
|:------------------:|:-------------------:|:---------------------:|
| ![Login](https://via.placeholder.com/300x200/0a0a1a/00f3ff?text=🔐+Secure+Login) | ![Todos](https://via.placeholder.com/300x200/0a0a1a/b967ff?text=📝+Todo+List) | ![Security](https://via.placeholder.com/300x200/0a0a1a/ff2a6d?text=🛡️+Security+Status) |

## 🛠️ Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### **Security**
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-2A4A6E?style=for-the-badge&logo=key&logoColor=white)
![Helmet](https://img.shields.io/badge/Helmet.js-FF6B6B?style=for-the-badge&logo=helmet&logoColor=white)

## ✨ Key Features

### 🔐 **Security First Approach**
- **JWT Authentication** - Secure token-based auth with expiration
- **Password Encryption** - bcrypt with 12 salt rounds
- **XSS Protection** - Input sanitization & validation
- **SQL Injection Prevention** - Parameterized queries
- **Rate Limiting** - Brute force attack protection
- **CORS Protection** - Controlled cross-origin requests

### 📱 **User Experience**
- **CRUD Operations** - Full Create, Read, Update, Delete functionality
- **Priority System** - High, Medium, Low priority levels
- **Deadline Tracking** - Smart due date management
- **Real-time UI** - Instant updates with React state
- **Responsive Design** - Mobile-first approach
- **Cyber Theme** - Futuristic security-focused UI

## 🏗️ Architecture

<img width="846" height="514" alt="image" src="https://github.com/user-attachments/assets/d4c3d7f6-3bff-4cf2-8fab-f9ebe0ff4e6a" />

# 🔐 Secure MERN Stack Todo Application

A full-stack, production-ready Todo application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring enterprise-level security implementation and modern UI design.

# 🚀 Live Demo

Frontend: http://localhost:3000
Backend API: http://localhost:5001
Database: MongoDB on localhost:27017

# 🛠️ Tech Stack

Frontend

React 18 - Modern functional components with hooks
Axios - HTTP client for API communication
Context API - State management for authentication
CSS3 - Futuristic cyber-security themed UI with glass morphism
Backend

Node.js & Express.js - RESTful API server
MongoDB & Mongoose - Database with schema validation
JWT - Stateless authentication
bcryptjs - Password hashing
Security Middleware - Helmet, CORS, rate limiting, etc.
Security

JWT Authentication - Secure token-based auth
Password Encryption - bcrypt with 12 salt rounds
Input Sanitization - XSS and injection prevention
Rate Limiting - Brute force protection
CORS Protection - Cross-origin resource sharing
Security Headers - Helmet.js for HTTP headers
✨ Key Features

# 🔐 Security Features

Authentication System - JWT-based login/register
Password Security - Strong password validation & hashing
Input Validation - Server-side and client-side sanitization
XSS Protection - Prevents cross-site scripting attacks
SQL Injection Prevention - Input sanitization and validation
Rate Limiting - API abuse prevention
CORS Configuration - Restricted cross-origin requests

# 📱 Application Features

CRUD Operations - Create, read, update, delete todos
User Authentication - Secure login/registration
Priority System - High, medium, low priority levels
Deadline Tracking - Due date management with overdue detection
Real-time Updates - Instant UI updates with state management
Responsive Design - Mobile-friendly interface
Modern UI - Cyber-security themed with futuristic design

# 🏗️ Project Architecture


<img width="453" height="294" alt="image" src="https://github.com/user-attachments/assets/d9786733-2231-497d-aa29-b9dc99bbe450" />


# 🔧 Installation & Setup

Prerequisites

Node.js (v14 or higher)
MongoDB (local or Docker)
npm or yarn
1. Clone Repository

bash
git clone https://github.com/yourusername/mern-todo-app.git
cd mern-todo-app
2. Backend Setup

bash
cd backend
npm install

 
# Start Development Server
npm run dev
3. Frontend Setup

bash
cd frontend
npm install
npm start

4. Database Setup (Docker)
bash
# Start MongoDB with Docker
docker run -d -p 27017:27017 --name todo-mongodb mongo:7.0
🎯 API Endpoints

# Authentication

Method	 Endpoint	        Description
POST	 /api/auth/register	User registration
POST	 /api/auth/login	User login
GET	     /api/auth/me	    Get current user

Todos:

Method	   Endpoint	        Description
GET	       /api/todos	    Get user's todos
POST	   /api/todos	    Create new todo
PUT	       /api/todos/:id	Update todo
DELETE	   /api/todos/:id	Delete todo



# HOW IS MY TODO APP SECURE 

🔐 Security Layers Implemented

1. 🔒 Authentication & Authorization Security

JWT Token Security

// Secure token generation with expiration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, // 30 days
    issuer: 'todo-app',
    audience: 'todo-app-users'
  });
};

// Token verification middleware
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

# Password Security

// bcrypt password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12); // High salt rounds
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Secure password comparison
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

# 2. 🛡️ Input Validation & Sanitization
# XSS Prevention

exports.preventXSS = (input) => {
  if (typeof input !== 'string') return input;
  
  const xssPatterns = [
    { pattern: /</g, replacement: '&lt;' },
    { pattern: />/g, replacement: '&gt;' },
    { pattern: /"/g, replacement: '&quot;' },
    { pattern: /'/g, replacement: '&#x27;' },
    { pattern: /\//g, replacement: '&#x2F;' }
  ];
  
  let sanitized = input;
  xssPatterns.forEach(({ pattern, replacement }) => {
    sanitized = sanitized.replace(pattern, replacement);
  });
  return sanitized;
};

# SQL/NoSQL Injection Prevention

exports.hasSQLInjection = (input) => {
  const sqlInjectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC)\b)/i,
    /('|"|;|--|\/\*|\*\/)/i
  ];
  return sqlInjectionPatterns.some(pattern => pattern.test(input));
};

// In your routes - sanitize all inputs
const addTodo = async (todoData) => {
  const sanitizedData = {
    title: securityUtils.sanitizeInput(todoData.title),
    description: securityUtils.sanitizeInput(todoData.description),
    deadline: todoData.deadline,
    priority: todoData.priority
  };
  // ... save to database
};

# 3. 🌐 HTTP & Network Security
# CORS Protection

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

# Security Headers with Helmet

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// XSS Clean middleware
app.use(xssClean());

# 4. ⚡ Rate Limiting & Brute Force Protection

// General API rate limiting
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { success: false, message: 'Too many requests' }
});

// Stricter limits for auth endpoints
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per window
  message: { success: false, message: 'Too many login attempts' }
});

// Account lockout after failed attempts
userSchema.methods.incLoginAttempts = async function() {
  this.loginAttempts += 1;
  if (this.loginAttempts >= 5) {
    this.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
  }
  await this.save();
};

# 5. 🔑 Environment & Configuration Security
# Secure Environment Variables

# Backend/.env - NEVER commit this to git
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5001
JWT_SECRET=your-super-secret-jwt-key-change-in-production-minimum-32-characters
JWT_EXPIRE=30d
BCRYPT_SALT_ROUNDS=12
NODE_ENV=production

# Production Security
// Additional production security
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.set('trust proxy', 1); // For rate limiting behind proxy
  // Disable detailed error messages in production
  app.use((err, req, res, next) => {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!'
    });
  });
}

# 6. 🗄️ Database Security

# MongoDB Schema Validation

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
    validate: {
      validator: function(title) {
        return !/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(title);
      },
      message: 'Invalid title content'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Prevents unauthorized access
  }
}, {
  timestamps: true
});

# Data Ownership Protection
// Ensure users can only access their own todos
const getTodos = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT token
    const todos = await Todo.find({ user: userId }); // Only user's todos
    res.json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching todos' });
  }
};

# 7. 📱 Frontend Security

# Secure API Calls
// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = securityUtils.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      securityUtils.removeToken();
      window.location.href = '/login'; // Auto logout on unauthorized
    }
    return Promise.reject(error);
  }
);

# Frontend Input Validation
export const securityUtils = {
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .trim()
      .substring(0, 500); // Length limits
  },

  isStrongPassword: (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    return password.length >= 8 && strongPasswordRegex.test(password);
  }
};

🛡️ Security Summary

Security Layer    	Implementation.   	    Protects Against
Authentication	    JWT + bcrypt	        Unauthorized access
Authorization	    User-based data access	Data leakage
Input Validation	XSS sanitization	    Injection attacks
Rate Limiting	    Express Rate Limit	    Brute force attacks
CORS	            Restricted origins	    CSRF attacks
Headers	            Helmet.js	            Various web vulnerabilities
Data Validation. 	Mongoose schemas	    Data corruption
Error Handling  	Secure error messages	Information leakage


# 🔍 Security Testing

You can test your security by trying:

SQL Injection: Try ' OR '1'='1 in any input field
XSS Attack: Try <script>alert('xss')</script> as todo title
Brute Force: Try wrong password multiple times
CORS Attack: Try accessing API from different origin
All these attacks should be blocked by your security measures

# App is Secured Against:

✅ XSS Attacks (Cross-Site Scripting)
✅ SQL/NoSQL Injection
✅ Brute Force Attacks
✅ CSRF Attacks (Cross-Site Request Forgery)
✅ Data Tampering
✅ Information Disclosure
✅ Session Hijacking
✅ DDoS Attacks (basic level)
