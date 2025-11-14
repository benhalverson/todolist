## Getting Started
- `npm install`
- `npm run dev`

## Deploying
- `npm run deploy`

## Database Migrations
Use [drizzle-kit](https://orm.drizzle.team/docs/overview) to create SQL migrations and [`wrangler`](https://developers.cloudflare.com/workers/wrangler/) to apply them to your Cloudflare D1 database. The database binding configured in `wrangler.toml` is `DB`.

### Create a Migration
1. Update the schema in `src/db/schema.ts`.
2. Generate a new migration file: `npx drizzle-kit generate --name add-new-table`.
   - The generated SQL is written to `drizzle/migrations/`.

### Apply Locally (Miniflare / wrangler dev)
- `npx wrangler d1 migrations apply DB --local`
- Alternatively, run a single migration file: `npx wrangler d1 execute DB --file drizzle/migrations/0000_productive_firestar.sql --local`

### Apply Remotely (Cloudflare D1)
- `npx wrangler d1 migrations apply DB --remote`
- Apply a specific migration file: `npx wrangler d1 execute DB --file drizzle/migrations/0000_productive_firestar.sql --remote`

## API Endpoints
- https://todolist.benhalverson.workers.dev/list
- https://todolist.benhalverson.workers.dev/create
```json
{
  "title": "learn cloudflare workers",
  "content": "asdf"
}
```
- https://todolist.benhalverson.workers.dev/update
- https://todolist.benhalverson.workers.dev/delete

