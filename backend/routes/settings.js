const express = require('express');
const router = express.Router();

// In-memory storage for user settings (in production, use a database)
const userSettings = {};

// Get user settings
router.get('/', (req, res) => {
  try {
    // Get user ID from token or session (simplified - in production, verify JWT)
    const userId = req.headers['x-user-id'] || '1'; // Default to user 1 for demo

    const settings = userSettings[userId] || {
      defaultDifficulty: 'medium',
      defaultAvatar: 'Dexter_Lawyer_Sitting_public',
      defaultLanguage: 'en-US',
      notifications: true,
      autoSave: true,
    };

    res.json({
      success: true,
      settings: settings,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get settings',
      message: error.message
    });
  }
});

// Update user settings
router.put('/', (req, res) => {
  try {
    // Get user ID from token or session (simplified - in production, verify JWT)
    const userId = req.headers['x-user-id'] || '1'; // Default to user 1 for demo

    const {
      name,
      email,
      defaultDifficulty,
      defaultAvatar,
      defaultLanguage,
      notifications,
      autoSave
    } = req.body;

    // Validate inputs
    if (defaultDifficulty && !['easy', 'medium', 'hard'].includes(defaultDifficulty)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid difficulty level',
        message: 'Difficulty must be easy, medium, or hard'
      });
    }

    // Update or create settings
    if (!userSettings[userId]) {
      userSettings[userId] = {};
    }

    // Update settings
    if (defaultDifficulty !== undefined) {
      userSettings[userId].defaultDifficulty = defaultDifficulty;
    }
    if (defaultAvatar !== undefined) {
      userSettings[userId].defaultAvatar = defaultAvatar;
    }
    if (defaultLanguage !== undefined) {
      userSettings[userId].defaultLanguage = defaultLanguage;
    }
    if (notifications !== undefined) {
      userSettings[userId].notifications = notifications;
    }
    if (autoSave !== undefined) {
      userSettings[userId].autoSave = autoSave;
    }

    // Note: name and email would typically be updated in a user profile endpoint
    // For now, we'll just acknowledge them
    if (name || email) {
      console.log(`User ${userId} updated profile: name=${name}, email=${email}`);
    }

    console.log(`⚙️ Settings updated for user ${userId}`);

    res.json({
      success: true,
      message: 'Settings saved successfully',
      settings: userSettings[userId],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update settings',
      message: error.message
    });
  }
});

module.exports = router;

