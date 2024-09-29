import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const posts = sqliteTable('posts', {
  id: integer('id', {mode: 'number'}).primaryKey(),
  title: text('title', { length: 255}).notNull(),
  content: text('content').notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
})