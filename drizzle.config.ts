import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './db-migrations',
  schema: './src/db/schema',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  casing: 'snake_case',
  verbose: true,
  strict: true
});