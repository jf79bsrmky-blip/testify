const express = require('express');
const router = express.Router();

// Mock user database (in production, use a real database)
const users = [
  {
    id: '1',
    email: 'demo@testify.com',
    password: 'password123',
    uniqueCode: 'DEMO01',
    role: 'demo',
    name: 'Demo User'
  },
  {
    id: '2',
    email: 'client@example.com',
    password: 'password123',
    uniqueCode: 'CLIENT001',
    role: 'client',
    name: 'Client User'
  },
  {
    id: '3',
    email: 'lawyer@example.com',
    password: 'lawyer123',
    uniqueCode: 'FIRM001',
    role: 'law_firm',
    name: 'Lawyer User'
  },
  {
    id: '4',
    email: 'admin@testify.com',
    password: 'admin123',
    uniqueCode: 'ADMIN001',
    role: 'admin',
    name: 'Admin User'
  }
];

// Login endpoint
router.post('/login', (req, res) => {
  try {
    const { email, password, uniqueCode } = req.body;

    if (!email || !password || !uniqueCode) {
      return res.status(400).json({ 
        success: false,
        error: 'Email, password, and unique code are required',
        message: 'Email, password, and unique code are required'
      });
    }

    // Check if user exists by email
    const userByEmail = users.find(u => u.email === email);
    
    if (!userByEmail) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid email',
        message: 'The email address you entered is not registered. Please check and try again.'
      });
    }

    // Check password
    if (userByEmail.password !== password) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid password',
        message: 'The password you entered is incorrect. Please try again.'
      });
    }

    // Check unique code
    if (userByEmail.uniqueCode !== uniqueCode) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid unique code',
        message: 'The unique code you entered is incorrect. Please check and try again.'
      });
    }

    // All credentials are correct
    const user = userByEmail;

    // Create session token (in production, use JWT)
    const sessionToken = `session_${user.id}_${Date.now()}`;

    console.log(`🔐 User logged in: ${user.email} (${user.role})`);

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        uniqueCode: user.uniqueCode
      },
      token: sessionToken, // Frontend expects 'token', not 'sessionToken'
      sessionToken: sessionToken, // Keep for backward compatibility
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Login failed',
      message: error.message 
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  try {
    // Make sessionToken optional - allow logout without token for better UX
    const { sessionToken } = req.body || {};

    if (sessionToken) {
      console.log(`🔐 User logged out: ${sessionToken}`);
    } else {
      console.log(`🔐 User logged out (no token provided)`);
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Logout failed',
      message: error.message 
    });
  }
});

// Verify session token
router.post('/verify', (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken) {
      return res.status(400).json({ 
        error: 'Session token is required' 
      });
    }

    // Extract user ID from session token (in production, verify JWT)
    const userId = sessionToken.split('_')[1];
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid session token' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        uniqueCode: user.uniqueCode
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Session verification error:', error);
    res.status(500).json({ 
      error: 'Session verification failed',
      message: error.message 
    });
  }
});

// Get demo credentials
router.get('/demo-credentials', (req, res) => {
  try {
    const demoCredentials = users.map(user => ({
      email: user.email,
      password: user.password,
      uniqueCode: user.uniqueCode,
      role: user.role,
      name: user.name
    }));

    res.json({
      success: true,
      credentials: demoCredentials,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Demo credentials error:', error);
    res.status(500).json({ 
      error: 'Failed to get demo credentials',
      message: error.message 
    });
  }
});

module.exports = router;
