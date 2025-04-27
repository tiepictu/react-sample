import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';

const { Pool } = pkg;

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
    user: process.env.DB_USER || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    database: process.env.DB_NAME || 'postgres',
});

// Middleware
app.use(express.json());

// Routes
app.get('/api/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();

  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, createdAt, updatedAt]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedAt = new Date();

  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = $3 WHERE id = $4 RETURNING *',
      [title, content, updatedAt, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});