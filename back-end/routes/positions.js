const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all positions
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Position');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create position
router.post('/', async (req, res) => {
    try {
        const { PostName, RequiredQualification } = req.body;

        const [result] = await db.query(
            'INSERT INTO Position(PostName, RequiredQualification) VALUES (?,?)',
            [PostName, RequiredQualification]
        );

        res.json({
            message: 'Position added',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update position
router.put('/:id', async (req, res) => {
    try {
        const { PostName, RequiredQualification } = req.body;

        await db.query(
            'UPDATE Position SET PostName=?, RequiredQualification=? WHERE PositionID=?',
            [PostName, RequiredQualification, req.params.id]
        );

        res.json({ message: 'Position updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete position
router.delete('/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Position WHERE PositionID=?',
            [req.params.id]
        );

        res.json({ message: 'Position deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;