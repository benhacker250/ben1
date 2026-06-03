const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all departments
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Department');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get one department
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Department WHERE DepartmentID = ?',
            [req.params.id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create department
router.post('/', async (req, res) => {
    try {
        const { DepartmentName } = req.body;

        const [result] = await db.query(
            'INSERT INTO Department (DepartmentName) VALUES (?)',
            [DepartmentName]
        );

        res.json({
            message: 'Department created',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update department
router.put('/:id', async (req, res) => {
    try {
        const { DepartmentName } = req.body;

        await db.query(
            'UPDATE Department SET DepartmentName=? WHERE DepartmentID=?',
            [DepartmentName, req.params.id]
        );

        res.json({ message: 'Department updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete department
router.delete('/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Department WHERE DepartmentID=?',
            [req.params.id]
        );

        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;