import { Hono } from "hono";
import { drizzle, } from "drizzle-orm/d1";
import { eq, sql, } from "drizzle-orm";


import { comments, posts } from "./db/schema";
import { create } from './controllers/create';
import { list } from './controllers/list';
import { deleteStuff } from './controllers/delete';
import { update } from './controllers/update';

const app = new Hono<{ Bindings: Env }>();

app.get("/list", list);

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

app.post("/create", create);

app.post('/create-comment', async (c) => {
  const db = drizzle(c.env.DB);
  const { post_id, content } = await c.req.json();
  const response = await db
    .insert(comments)
    .values({ postId: post_id, content })
    .returning();
  return c.json(response);
});

app.put("/update", update);

app.delete("/delete", deleteStuff);

export default app;

export type Env = {
	DB: D1Database;
};
