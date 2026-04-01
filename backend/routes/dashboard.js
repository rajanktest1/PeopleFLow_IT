const express = require('express');
const pool = require('../db/pool');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard — any authenticated user
router.get('/', async (req, res) => {
  try {
    const [empCount, payrollSum, openRoles, deptBreakdown, recentRuns] = await Promise.all([
      pool.query('SELECT COUNT(*) as total FROM employees WHERE status = $1', ['active']),
      pool.query('SELECT COALESCE(SUM(base_salary), 0) as total FROM payroll'),
      pool.query("SELECT COUNT(*) as total FROM job_postings WHERE status = $1", ['open']),
      pool.query(`
        SELECT d.name as department, COUNT(e.id) as count
        FROM departments d
        LEFT JOIN employees e ON e.department_id = d.id AND e.status = 'active'
        GROUP BY d.id, d.name
        ORDER BY count DESC
      `),
      pool.query(`
        SELECT ph.id, e.first_name, e.last_name, ph.net_pay, ph.processed_date
        FROM payroll_history ph
        JOIN employees e ON e.id = ph.employee_id
        ORDER BY ph.processed_date DESC
        LIMIT 10
      `)
    ]);

    res.json({
      totalEmployees: parseInt(empCount.rows[0].total),
      monthlyPayroll: parseFloat(payrollSum.rows[0].total),
      openRoles: parseInt(openRoles.rows[0].total),
      departmentBreakdown: deptBreakdown.rows,
      recentPayrollRuns: recentRuns.rows
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
