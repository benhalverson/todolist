import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { posts } from '../db/schema';

export const create = async (c: Context) => {
	const db = drizzle(c.env.DB);
	const { title, content } = await c.req.json();
	const response = await db
		.insert(posts)
		.values({ title, content })
		.returning();
	return c.json(response);
}