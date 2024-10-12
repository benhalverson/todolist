import { , Hono } from "hono";
import { drizzle, } from "drizzle-orm/d1";
import { eq, sql, } from "drizzle-orm";


import { comments, posts } from "./db/schema";

const app = new Hono<{ Bindings: Env }>();

app.get("/list", async (c) => {
	const db = drizzle(c.env.DB);
	const response = await db.select().from(posts).all();
	return c.json(response);
});

app.get('/list-comments', async (c) => {
  const db = drizzle(c.env.DB);
  const response = await db.select({posts: posts.id}).from(posts).all();

  // const response = db.select({
  //   postId: posts.id,
  //   title: posts.title,
  //   commentCount: sql`COUNT(${comments.id}).as("commentCount")`,
  // }).from(posts)
  // .leftJoin(comments, eq(posts.id, comments.postId))
  // .groupBy(posts.id)
  // .all();
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

app.post('/create-comment', async (c) => {
  const db = drizzle(c.env.DB);
  const { post_id, content } = await c.req.json();
  const response = await db
    .insert(comments)
    .values({ postId: post_id, content })
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
