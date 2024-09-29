import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";

import { posts } from "./db/schema";

const app = new Hono<{ Bindings: Env }>();

app.get("/list", async (c) => {
	const db = drizzle(c.env.DB);
	const response = await db.select().from(posts).all();
	return c.json(response);
});

app.post("/create", async (c) => {
	const db = drizzle(c.env.DB);
	const { title, content } = await c.req.json();
	const response = await db
		.insert(posts)
		.values({ title, content })
		.returning();
	return c.json(response);
});

app.put("/update", async (c) => {
  const db = drizzle(c.env.DB);
  const { id, title, content } = await c.req.json();
  const response = await db
    .update(posts)
    .set({ title, content })
    .where(eq(posts.id, id))
    .returning();
  return c.json(response);
});

app.delete("/delete", async (c) => {
  const db = drizzle(c.env.DB);
  const { id } = await c.req.json();
  const response = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();
  return c.json(response);
});

export default app;

export type Env = {
	DB: D1Database;
};
