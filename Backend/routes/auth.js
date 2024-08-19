const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../Config/firebase'); // Ensure Firebase Admin SDK is properly initialized
const User = require('../models/user'); // Adjust the path to your User model
const router = express.Router();

const secretKey = 'MeghEcon'; // Make sure this matches your JWT secret

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate a JWT token with id and email
    const payload = {
      user: {
        id: user._id,
        email: user.email, // Add email to the payload     
      },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    res.json({ msg: 'Registration successful' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login with Email/Password
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Generate a JWT token with id and email
    const payload = {
      user: {
        id: user._id,
        email: user.email, // Add email to the payload
      },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    res.json({ msg: 'Login successful' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Google Sign-In
router.post('/google-signin', async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify the ID token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    // Check if the user exists in MongoDB
    let user = await User.findOne({ uid });
    
    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        uid,
        email,
        displayName: name,
      });

      await user.save();
    }

    // Generate a JWT token with id and email
    const payload = {
      user: {
        id: user._id,
        email: user.email, // Add email to the payload
      },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    // Return the Google UID
    res.json({ msg: 'Login successful', uid: user.uid });
  } catch (error) {
    res.status(400).send('Invalid Google ID Token');
  }
});

// Route to retrieve user info
router.get('/user-info', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Token is not valid' });
    }

    res.json({ user: decoded.user });
  });
});
// In your server-side routes file (e.g., routes/auth.js)
router.post('/logout', (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');
        res.json({ msg: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
