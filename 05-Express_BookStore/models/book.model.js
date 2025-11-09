const { pgTable, varchar, text, uuid, index } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm"); // <--- 1. Import the 'sql' helper
const authorsTable = require('./author.model.js');

const booksTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id).notNull()
}, (table) => ({
    // 2. This is the corrected line using the sql helper
    searchIndexonTitle: index('title_index').using(
        'gin',
        sql`${table.title} gin_trgm_ops` // <--- Use this syntax
    ),
}));

module.exports = booksTable;