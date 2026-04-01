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
    'https://YOUR-GITHUB-USERNAME.github.io',  // ← Replace with your GitHub Pages URL
    'http://localhost:5500',                    // VS Code Live Server
    'http://127.0.0.1:5500',
  ],
  methods: ['GET', 'POST'],
}));

// ===========================
// DATABASE CONNECTION
// ===========================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create table on startup if it doesn't exist
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
    endpoints: {
      health: 'GET /',
      submit_contact: 'POST /api/contact',
      get_messages: 'GET /api/messages',
    },
  });
});

// POST /api/contact — Save a contact message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  if (name.length > 100) return res.status(400).json({ error: 'Name too long.' });
  if (email.length > 150) return res.status(400).json({ error: 'Email too long.' });

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
      [name, email, message]
    );

    console.log(`📨 New message from ${name} (${email}) — ID #${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      message: 'Message received! Thank you for reaching out.',
      id: result.rows[0].id,
    });

  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// GET /api/messages — View all messages (for admin use)
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC'
    );
    res.json({ count: result.rows.length, messages: result.rows });
  } catch (err) {
    console.error('DB error:', err.message);
    res.status(500).json({ error: 'Could not fetch messages.' });
  }
});

// ===========================
// START SERVER
// ===========================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
