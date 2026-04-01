require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const pool = require('./db/pool');
const { verifyToken } = require('./middleware/auth');

// Route imports
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const employeeRoutes = require('./routes/employees');
const payrollRoutes = require('./routes/payroll');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (require valid JWT)
app.use('/api/dashboard', verifyToken, dashboardRoutes);
app.use('/api/employees', verifyToken, employeeRoutes);
app.use('/api/payroll', verifyToken, payrollRoutes);
app.use('/api/jobs', verifyToken, jobRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database initialization
async function initDatabase() {
  try {
    // Check if tables already exist
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables WHERE table_name = 'departments'
      )
    `);

    if (tableCheck.rows[0].exists) {
      console.log('Database tables already exist. Skipping init.');
      return;
    }

    console.log('Initializing database schema...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('Schema created successfully.');

    console.log('Seeding database...');
    // First, hash passwords for seed users
    const adminHash = await bcrypt.hash('admin123', 10);
    const hrHash = await bcrypt.hash('hr123', 10);
    const financeHash = await bcrypt.hash('finance123', 10);

    // Read seed SQL and replace placeholder hashes with real ones
    let seedSQL = fs.readFileSync(path.join(__dirname, 'db', 'seed.sql'), 'utf8');
    const placeholderHash = '$2a$10$8KzQJ3Dl5Vf6W2yXQxq6QOYjG5z8K4VnEqK7v5N1RwA3x9hZ2mTa6';
    // Replace the three occurrences in order: admin, hr, finance
    seedSQL = seedSQL.replace(placeholderHash, adminHash);
    seedSQL = seedSQL.replace(placeholderHash, hrHash);
    seedSQL = seedSQL.replace(placeholderHash, financeHash);

    await pool.query(seedSQL);
    console.log('Database seeded successfully.');
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
}

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`PeopleFlow API running on http://localhost:${PORT}`);
  });
});
