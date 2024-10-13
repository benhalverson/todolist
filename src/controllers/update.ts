import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { posts } from '../db/schema';
import { eq } from 'drizzle-orm';

export const update =  async (c: Context) => {
  const db = drizzle(c.env.DB);
  const { id, title, content } = await c.req.json();
  const response = await db
    .update(posts)
    .set({ title, content })
    .where(eq(posts.id, id))
    .returning();
  return c.json(response);
}