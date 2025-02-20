const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all albums
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM albums');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get albums by artist
router.get('/artist/:artist_id', async (req, res) => {
    try {
        const { artist_id } = req.params;
        const result = await pool.query('SELECT * FROM albums WHERE artist_id = $1', [artist_id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new album
router.post('/', async (req, res) => {
    try {
        const { title, artist_id, release_date, genre, cover_url } = req.body;
        const result = await pool.query(
            'INSERT INTO albums (title, artist_id, release_date, genre, cover_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, artist_id, release_date, genre, cover_url]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
