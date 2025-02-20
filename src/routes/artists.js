const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all artists
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM artists');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get artist by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new artist
router.post('/', async (req, res) => {
    try {
        const { name, genre, bio, image_url } = req.body;
        const result = await pool.query(
            'INSERT INTO artists (name, genre, bio, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, genre, bio, image_url]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
