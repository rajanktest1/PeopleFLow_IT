const express = require('express');
const pool = require('../db/pool');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/employees — admin, hr
router.get('/', requireRole('admin', 'hr'), async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, d.name as department_name
      FROM employees e
      JOIN departments d ON d.id = e.department_id
      ORDER BY e.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Employees list error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/employees/:id — admin, hr
router.get('/:id', requireRole('admin', 'hr'), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT e.*, d.name as department_name
      FROM employees e
      JOIN departments d ON d.id = e.department_id
      WHERE e.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Employee detail error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
