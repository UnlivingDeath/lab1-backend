const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Web Backend & Database Lab 1 API!',
    status: 'Success',
    timestamp: new Date()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api/greeting', (req, res) => {
  res.status(200).json({
    message: 'Hello, welcome to my backend API!',
    student: {
      fullName: 'Your Full Name',
      studentID: 'Your Student ID',
      class: 'Your Class/Department'
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[ERROR] Port ${PORT} is already in use. Please choose a different port or close the application currently using it.`);
  } else {
    console.error(`[ERROR] Failed to start server:`, err.message);
  }
  process.exit(1);
});
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'your_mysql_password',
  database: 'ecommerce_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});