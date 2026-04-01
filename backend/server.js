// server.js — Jedid's Portfolio Backend
// Node.js + Express + PostgreSQL

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================
// MIDDLEWARE
// ===========================
app.use(express.json());
app.use(cors({
  origin: [
    'https://jedidjr14-sys.github.io',  // ✅ your GitHub Pages URL
    'http://localhost:5500',
    'http://127.0.0.1:5500',
  ],
  methods: ['GET', 'POST'],
}));

// ===========================
// DATABASE CONNECTION
// ===========================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create table if not exists
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Database table ready.');
  } catch (err) {
    console.error('❌ DB init error:', err.message);
  }
}

initDB();

// ===========================
// ROUTES
// ===========================

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: "Jedid's Portfolio API is running 🚀",
  });
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id',
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      message: 'Message saved!',
      id: result.rows[0].id,
    });

  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Fetch error' });
  }
});

// ===========================
// START SERVER
// ===========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});