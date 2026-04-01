const express = require('express');
const pool = require('../db/pool');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/payroll — admin, finance
router.get('/', requireRole('admin', 'finance'), async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.employee_id,
        e.first_name,
        e.last_name,
        e.emoji_avatar,
        e.job_title,
        d.name as department_name,
        p.base_salary,
        p.tax_rate,
        ROUND(p.base_salary * p.tax_rate / 100, 2) as tax_deduction,
        p.other_deductions,
        ROUND(p.base_salary - (p.base_salary * p.tax_rate / 100) - p.other_deductions, 2) as net_pay,
        p.pay_period,
        p.last_paid_date,
        p.status
      FROM payroll p
      JOIN employees e ON e.id = p.employee_id
      JOIN departments d ON d.id = e.department_id
      ORDER BY e.last_name, e.first_name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Payroll list error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT /api/payroll/:id — update salary — admin, finance
router.put('/:id', requireRole('admin', 'finance'), async (req, res) => {
  try {
    const { id } = req.params;
    const { base_salary, tax_rate, other_deductions } = req.body;

    const fields = [];
    const values = [];
    let idx = 1;

    if (base_salary !== undefined) {
      fields.push(`base_salary = $${idx++}`);
      values.push(base_salary);
    }
    if (tax_rate !== undefined) {
      fields.push(`tax_rate = $${idx++}`);
      values.push(tax_rate);
    }
    if (other_deductions !== undefined) {
      fields.push(`other_deductions = $${idx++}`);
      values.push(other_deductions);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update.' });
    }

    // Reset status to pending when salary is updated
    fields.push(`status = 'pending'`);
    values.push(id);

    const result = await pool.query(
      `UPDATE payroll SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Payroll update error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/payroll/run — process all pending payroll — admin, finance
router.post('/run', requireRole('admin', 'finance'), async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Get all pending payroll records
    const pending = await client.query(`
      SELECT p.*, e.first_name, e.last_name
      FROM payroll p
      JOIN employees e ON e.id = p.employee_id
      WHERE p.status = 'pending'
    `);

    if (pending.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.json({ message: 'No pending payroll records to process.', processed: 0 });
    }

    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Insert into payroll_history and update status
    for (const record of pending.rows) {
      const taxDeduction = parseFloat((record.base_salary * record.tax_rate / 100).toFixed(2));
      const netPay = parseFloat((record.base_salary - taxDeduction - record.other_deductions).toFixed(2));

      await client.query(`
        INSERT INTO payroll_history (employee_id, base_salary, tax_rate, tax_deduction, other_deductions, net_pay, pay_period_start, pay_period_end, processed_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [record.employee_id, record.base_salary, record.tax_rate, taxDeduction, record.other_deductions, netPay, periodStart, periodEnd, req.user.id]);

      await client.query(`
        UPDATE payroll SET status = 'processed', last_paid_date = NOW() WHERE id = $1
      `, [record.id]);
    }

    await client.query('COMMIT');
    res.json({ message: 'Payroll processed successfully.', processed: pending.rows.length });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Payroll run error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    client.release();
  }
});

// GET /api/payroll/history/:employeeId — admin, finance
router.get('/history/:employeeId', requireRole('admin', 'finance'), async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await pool.query(`
      SELECT ph.*, u.username as processed_by_username
      FROM payroll_history ph
      LEFT JOIN users u ON u.id = ph.processed_by
      WHERE ph.employee_id = $1
      ORDER BY ph.processed_date DESC
    `, [employeeId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Payroll history error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
