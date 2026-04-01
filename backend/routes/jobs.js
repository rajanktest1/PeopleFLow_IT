const express = require('express');
const pool = require('../db/pool');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/jobs — admin, hr
router.get('/', requireRole('admin', 'hr'), async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT j.*, d.name as department_name
      FROM job_postings j
      JOIN departments d ON d.id = j.department_id
      ORDER BY j.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Jobs list error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/jobs — admin, hr
router.post('/', requireRole('admin', 'hr'), async (req, res) => {
  try {
    const { title, department_id, description, location, salary_range_min, salary_range_max } = req.body;

    if (!title || !department_id) {
      return res.status(400).json({ error: 'Title and department are required.' });
    }

    const result = await pool.query(`
      INSERT INTO job_postings (title, department_id, description, location, salary_range_min, salary_range_max)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [title, department_id, description || '', location || 'Remote', salary_range_min || null, salary_range_max || null]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Job create error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
