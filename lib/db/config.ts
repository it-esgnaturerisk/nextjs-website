// eslint-disable-next-line import/no-extraneous-dependencies
import { loadEnvConfig } from '@next/env';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema'; // Needed for Drizzle ORM

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Initialize the connection. Schema is needed for Drizzle ORM but not for QueryBuilder.
// eslint-disable-next-line import/prefer-default-export
export const db = drizzle(sql, { schema });
