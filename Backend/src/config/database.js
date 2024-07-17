const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'urlShortener',
    password: 'admin123',
    port: 5432,
    allowExitOnIdle: true,
});

module.exports = pool;