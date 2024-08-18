const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../Config/firebase');
const User = require('../models/user');

const router = express.Router();

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

    // Generate a JWT token
    const payload = {
      user: {
        id: user.id,
        uid: user.uid,
      },
    };

    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});



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

        // Generate a JWT token
        const payload = {
            user: {
                id: user.id,
                uid: user.uid,
            },
        };

        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

        // Return the token and Google UID
        res.json({ token, uid: user.uid });
    } catch (error) {
        res.status(400).send('Invalid Google ID Token');
    }
});


module.exports = router;
