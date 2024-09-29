import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";

import { posts } from "./db/schema";

const app = new Hono<{ Bindings: Env }>();

app.get("/list", async(c) => {
	const db = drizzle(c.env.DB);
  const response = await db.select().from(posts).all();
  return c.json(response)
});

export default app;

export type Env = {
	DB: D1Database;
};
