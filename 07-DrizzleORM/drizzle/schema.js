const {pgTable, varchar ,integer ,text, serial} = require('drizzle-orm/pg-core')

const userTable = pgTable("users",{
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(), // Added 'name' key
    email: text('email').notNull().unique(),
});

const postTable = pgTable("posts",{
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content'),

    authorId: integer('authorId').notNull().references(() => userTable.id, {
        onDelete: 'cascade',
    }),
});

module.exports = {
    userTable,
    postTable
};
