const { pgTable, varchar, text, uuid, index } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");
const authorsTable = require('./author.model.js');

const booksTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id).notNull()
},(table) => [
    index('title_search_index').using('gin', sql`to_tsvector('english', ${table.title})`),
  ]
);

module.exports = booksTable;