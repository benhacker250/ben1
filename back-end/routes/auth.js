const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
    try {
        const { Username, Password } = req.body;

        const [users] = await db.query(
            'SELECT * FROM Users WHERE Username=?',
            [Username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const user = users[0];

        const match = await bcrypt.compare(
            Password,
            user.Password
        );

        if (!match) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user.UserID,
                role: user.Role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const [existing] = await db.query(
            'SELECT UserID FROM Users WHERE Username = ?',
            [Username]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const [result] = await db.query(
            'INSERT INTO Users (Username, Password, Role) VALUES (?, ?, ?)',
            [Username, hashedPassword, 'user']
        );

        res.status(201).json({
            message: 'Registration successful',
            userId: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;