const express = require('express');
const router = express.Router();
const { client } = require('./../database/db');
const db = client.db('myshows');
const usersCollection = db.collection('users');

router.post('/signup', async (req, res) => {
  const {firstName, lastName, email, passwd, city, state} = req.body;
  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address already used!' });
    }
    const newUser = {firstName,lastName,email,passwd,city,state}; 
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Modified login route
router.post('/login', async (req, res) => {  
  console.log('Received login request:', req.body);  // Debug log
  const {email, passwd} = req.body;
  
  try {
    const user = await usersCollection.findOne({email});
    if (!user) {
      return res.status(401).json({message: 'User does not exist!'});
    }
    if (user.passwd !== passwd) {
      return res.status(401).json({message: 'Invalid password'});
    }
    
    const token = `fake-jwt-token-${user.email}`;
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({message: 'Internal server error'});
  }
});

module.exports = router;
