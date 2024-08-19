const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../Config/firebase');
const User = require('../models/user');
const router = express.Router();
const secretKey = "MeghEcon"; // Ensure this key is consistent

// Register with Email/Password
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    // Register the user with Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Hash the password and save the user in MongoDB
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      uid: userRecord.uid,
      email,
      displayName,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error.message);
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

// Route to verify token and get user info
router.post('/verify-token', (req, res) => {
  const { token } = req.cookies; // Get token from cookies

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ user: decoded.user });
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
});

module.exports = router;
