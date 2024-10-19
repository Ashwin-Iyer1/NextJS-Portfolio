const {Pool} = require('pg');

require('dotenv').config();

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.dbname,
    password: process.env.password,
    port: "5432",
    ssl: {
        rejectUnauthorized: false, // Use true in production with proper certificates
    },

});

module.exports = pool;