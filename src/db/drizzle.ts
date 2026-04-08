import { drizzle } from "drizzle-orm/mysql2";
import * as authSchema from './schema/auth-schema';
import * as mySchema from './schema/schema';

const schema = {
  ...authSchema,
  ...mySchema
}

const db = drizzle(process.env.DATABASE_URL!, { casing: 'snake_case', logger: true, schema, mode: 'default' });

export default db;