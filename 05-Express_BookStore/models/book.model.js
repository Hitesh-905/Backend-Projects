const { pgTable, varchar, text, uuid, index } = require("drizzle-orm/pg-core");
/
const authorsTable = require('./author.model.js');

const booksTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id).notNull()
}, (table) => ({
    
    searchIndexonTitle: index('title_index').using(
        'gin',
        table.title.withOps('gin_trgm_ops') // <--- Add this
    ),
}));

module.exports = booksTable;