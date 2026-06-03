const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all employees
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT e.*, d.DepartmentName, p.PostName
            FROM Employee e
            LEFT JOIN Department d ON e.DepartmentID = d.DepartmentID
            LEFT JOIN Position p ON e.PositionID = p.PositionID
        `);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get employee by id
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Employee WHERE EmpID=?',
            [req.params.id]
        );

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create employee
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const [result] = await db.query(
            `INSERT INTO Employee
            (EmpFirstName, EmpLastName, DepartmentID, PositionID)
            VALUES (?, ?, ?, ?)`,
            [
                data.EmpFirstName,
                data.EmpLastName,
                data.DepartmentID,
                data.PositionID
            ]
        );

        res.json({
            message: 'Employee added',
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update employee
router.put('/:id', async (req, res) => {
    try {
        const data = req.body;

        await db.query(
            `UPDATE Employee
            SET EmpFirstName=?, EmpLastName=?,
                DepartmentID=?, PositionID=?
            WHERE EmpID=?`,
            [
                data.EmpFirstName,
                data.EmpLastName,
                data.DepartmentID,
                data.PositionID,
                req.params.id
            ]
        );

        res.json({ message: 'Employee updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete employee
router.delete('/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Employee WHERE EmpID=?',
            [req.params.id]
        );

        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;