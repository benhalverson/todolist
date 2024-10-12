import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: './.wrangler/state/v3/d1/miniflare-D1DatabaseObject/c4674d616bd0ed476af42abae732d5e66757cc32bfb7bb443f2786f4c24d6b7a.sqlite'
  }
});