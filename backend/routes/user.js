const express = require('express');
const router = express.Router();
const { client } = require('../db');  // Importing the MongoDB client from db.js

// Access the "myshows" database
const db = client.db("myshows");
const users = db.collection('users');  // Reference the "users" collection

// API endpoint to fetch user data based on email
router.get('/user', async (req, res) => {
    try {
        const userEmail = req.query.email; // Getting email from query parameter

        if (!userEmail) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await users.findOne({ email: userEmail });  // Query the users collection

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Sending back only the firstName to the frontend
        res.json({ firstName: user.firstName });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
