import { loadEnvConfig } from "@next/env";
import * as schema from "./schema"; // Needed for Drizzle ORM
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Initialize the connection. Schema is needed for Drizzle ORM but not for QueryBuilder.
export const db = drizzle(sql, { schema });
