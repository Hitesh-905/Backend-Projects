const {drizzle} = 'drizzle-orm/node-postgres'

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;