import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { user } from "./auth-schema";


export const message = mysqlTable('message', {
  id: int().primaryKey().autoincrement(),
  sender: varchar({ length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
  reciever: varchar({ length: 36 }).references(() => user.id, { onDelete: 'cascade' }),
  content: text().notNull(),
  createdAt: timestamp().notNull().defaultNow()
})