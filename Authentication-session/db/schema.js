import { pgTable, varchar, text, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
});



// import {pgTable, varchar,text,uuid } from "drizzle-orm/pg-core";
// export const usersTable = pgTable("users", {
//   id: uuid().primaryKey().defaultRandom(),
//   name: varchar({ length: 255 }).notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
//   password: text().notNull(),
//   salt: text().notNull(),
// });