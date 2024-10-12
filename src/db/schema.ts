import { sqliteTable, AnySQLiteColumn, numeric, text, foreignKey, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"


export const comments = sqliteTable("comments", {
	id: integer("id").primaryKey().notNull(),
	postId: integer("post_id").notNull().references(() => posts.id),
	content: text("content").notNull(),
	timestamp: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const posts = sqliteTable("posts", {
	id: integer("id").primaryKey().notNull(),
	title: numeric("title").notNull(),
	content: text("content").notNull(),
	timestamp: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});