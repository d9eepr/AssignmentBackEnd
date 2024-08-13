const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'mysql-4ec1453-evanedeepraj-0e3b.k.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_5S5fw5Yol9tZ7_PtSxJ',
    database: 'myDatabase',
	port: 11120
	
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// CRUD Operations

// 1. Get Banner (Read)
app.get('/api/banner', (req, res) => {
    const sql = 'SELECT * FROM banner WHERE id = 1'; // Assuming a single banner is used
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result[0]);
    });
});

// 2. Create Banner (Create)
app.post('/api/banner', (req, res) => {
    const { is_visible, description, timer_seconds, link } = req.body;
    const sql = 'INSERT INTO banner (is_visible, description, timer_seconds, link) VALUES (?, ?, ?, ?)';
    db.query(sql, [is_visible, description, timer_seconds, link], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId });
    });
});

// 3. Update Banner (Update)
app.put('/api/banner/:id', (req, res) => {
    const { id } = req.params;
    const { is_visible, description, timer_seconds, link } = req.body;
    const sql = 'UPDATE banner SET is_visible = ?, description = ?, timer_seconds = ?, link = ? WHERE id = ?';
    db.query(sql, [is_visible, description, timer_seconds, link, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Banner updated successfully' });
    });
});

// 4. Delete Banner (Delete)
app.delete('/api/banner/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM banner WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Banner deleted successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
