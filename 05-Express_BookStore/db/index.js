// db/index.js

const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');

// 1. Create a connection pool from the 'pg' library
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true, // You may need to uncomment this for production
});

// 2. Pass the pool (not the URL string) to drizzle
const db = drizzle(pool);

// 3. Export the drizzle instance
module.exports = db;