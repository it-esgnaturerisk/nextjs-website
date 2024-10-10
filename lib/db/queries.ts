import "@lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";
import { NewUser } from "./types";

// Initialize the connection
export const db = drizzle(sql, { schema }); // Drizzle ORM: schema needed; QueryBuilder: don't need schema.

// Function to fetch all users
export const getUsers = async () => {
  return null;
  // const selectedResults = await db.select().from(users);
  // console.log("Results:", selectedResults);
  // return selectedResults;
};

// Define the type for new users based on schema

// Function to insert a new user
export const insertUser = async (newUser: NewUser) => {
  return null;
  // const insertedUser = db.insert(users).values(newUser).returning();
  // console.log(`Seeded users with user: ${insertedUser}`);
  // return insertedUser;
};

export const getSites = async () => {
  const selectedResults = await db.select().from(schema.sites);
  console.log("Results:", selectedResults);
  return selectedResults;
};
