import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { posts } from '../db/schema';

export const list = async (c: Context) => {
	const db = drizzle(c.env.DB);
	const response = await db.select().from(posts).all();
	return c.json(response);
}