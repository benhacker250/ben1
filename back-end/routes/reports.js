const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Employee count by department
router.get('/department-summary', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                d.DepartmentName,
                COUNT(e.EmpID) AS TotalEmployees
            FROM Department d
            LEFT JOIN Employee e
            ON d.DepartmentID = e.DepartmentID
            GROUP BY d.DepartmentID
        `);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;