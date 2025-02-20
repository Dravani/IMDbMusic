const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all songs
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM songs');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get songs by album
router.get('/album/:album_id', async (req, res) => {
    try {
        const { album_id } = req.params;
        const result = await pool.query('SELECT * FROM songs WHERE album_id = $1', [album_id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add a new song
router.post('/', async (req, res) => {
    try {
        const { title, album_id, artist_id, duration, release_date } = req.body;
        const result = await pool.query(
            'INSERT INTO songs (title, album_id, artist_id, duration, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, album_id, artist_id, duration, release_date]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
