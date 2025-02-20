const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Load from environment variables
});

module.exports = pool;
